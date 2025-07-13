import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Monitor, Activity, Zap, Clock, Eye, EyeOff } from 'react-feather';
import { PerformanceMonitor as PerfMonitor } from '../utils/performanceOptimizations';
import './PerformanceMonitor.css';

interface PerformanceMetrics {
  navigationTiming: {
    domContentLoaded: number;
    loadComplete: number;
    firstPaint: number;
    firstContentfulPaint: number;
  };
  webVitals: {
    lcp: number;
    cls: number;
    fid: number;
  };
  memoryUsage?: {
    usedJSHeapSize: number;
    totalJSHeapSize: number;
    jsHeapSizeLimit: number;
  };
  connectionInfo?: {
    effectiveType: string;
    downlink: number;
    rtt: number;
  };
}

const PerformanceMonitorComponent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [isCollecting, setIsCollecting] = useState(false);
  const perfMonitor = new PerfMonitor();

  useEffect(() => {
    // Only show in development mode
    if (process.env.NODE_ENV === 'development') {
      collectMetrics();
      
      // Update metrics every 5 seconds
      const interval = setInterval(collectMetrics, 5000);
      return () => clearInterval(interval);
    }
  }, []);

  const collectMetrics = async () => {
    setIsCollecting(true);
    
    try {
      // Get navigation timing
      const navigationTiming = performance.timing;
      
      // Get paint timing
      const paintEntries = performance.getEntriesByType('paint');
      const paintTiming = {
        firstPaint: paintEntries.find(entry => entry.name === 'first-paint')?.startTime || 0,
        firstContentfulPaint: paintEntries.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0
      };
      
      // Get web vitals
      const webVitals = {
        lcp: await getLCP(),
        cls: await getCLS(),
        fid: await getFID()
      };
      
      // Get memory usage (if available)
      const memoryUsage = getMemoryUsage();
      
      // Get connection info (if available)
      const connectionInfo = getConnectionInfo();
      
      setMetrics({
        navigationTiming: {
          domContentLoaded: navigationTiming.domContentLoadedEventEnd - navigationTiming.navigationStart,
          loadComplete: navigationTiming.loadEventEnd - navigationTiming.navigationStart,
          firstPaint: paintTiming.firstPaint || 0,
          firstContentfulPaint: paintTiming.firstContentfulPaint || 0
        },
        webVitals,
        memoryUsage,
        connectionInfo
      });
    } catch (error) {
      console.error('Error collecting performance metrics:', error);
    } finally {
      setIsCollecting(false);
    }
  };

  const getLCP = (): Promise<number> => {
    return new Promise((resolve) => {
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          resolve(lastEntry.startTime);
          observer.disconnect();
        });
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
        
        // Fallback timeout
        setTimeout(() => {
          observer.disconnect();
          resolve(0);
        }, 3000);
      } else {
        resolve(0);
      }
    });
  };

  const getCLS = (): Promise<number> => {
    return new Promise((resolve) => {
      if ('PerformanceObserver' in window) {
        let clsValue = 0;
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value;
            }
          }
        });
        observer.observe({ entryTypes: ['layout-shift'] });
        
        // Calculate CLS after 3 seconds
        setTimeout(() => {
          observer.disconnect();
          resolve(clsValue);
        }, 3000);
      } else {
        resolve(0);
      }
    });
  };

  const getFID = (): Promise<number> => {
    return new Promise((resolve) => {
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const firstEntry = entries[0];
          resolve((firstEntry as any).processingStart - firstEntry.startTime);
          observer.disconnect();
        });
        observer.observe({ entryTypes: ['first-input'] });
        
        // Fallback timeout
        setTimeout(() => {
          observer.disconnect();
          resolve(0);
        }, 10000);
      } else {
        resolve(0);
      }
    });
  };

  const getMemoryUsage = () => {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      return {
        usedJSHeapSize: memory.usedJSHeapSize,
        totalJSHeapSize: memory.totalJSHeapSize,
        jsHeapSizeLimit: memory.jsHeapSizeLimit
      };
    }
    return undefined;
  };

  const getConnectionInfo = () => {
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      return {
        effectiveType: connection.effectiveType,
        downlink: connection.downlink,
        rtt: connection.rtt
      };
    }
    return undefined;
  };

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatTime = (time: number): string => {
    if (time < 1000) return `${time.toFixed(0)}ms`;
    return `${(time / 1000).toFixed(2)}s`;
  };

  const getScoreColor = (metric: string, value: number): string => {
    switch (metric) {
      case 'lcp':
        return value <= 2500 ? 'good' : value <= 4000 ? 'needs-improvement' : 'poor';
      case 'cls':
        return value <= 0.1 ? 'good' : value <= 0.25 ? 'needs-improvement' : 'poor';
      case 'fid':
        return value <= 100 ? 'good' : value <= 300 ? 'needs-improvement' : 'poor';
      case 'fcp':
        return value <= 1800 ? 'good' : value <= 3000 ? 'needs-improvement' : 'poor';
      default:
        return 'neutral';
    }
  };

  // Only render in development mode
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        className="perf-monitor-toggle"
        onClick={() => setIsVisible(!isVisible)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title="Performance Monitor"
      >
        {isVisible ? <EyeOff size={20} /> : <Monitor size={20} />}
      </motion.button>

      {/* Performance Monitor Panel */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="perf-monitor-panel"
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="perf-monitor-header">
              <div className="perf-monitor-title">
                <Activity size={18} />
                <span>Performance Monitor</span>
              </div>
              <div className="perf-monitor-status">
                {isCollecting && (
                  <motion.div
                    className="collecting-indicator"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    <Zap size={14} />
                  </motion.div>
                )}
              </div>
            </div>

            {metrics && (
              <div className="perf-monitor-content">
                {/* Navigation Timing */}
                <div className="metric-section">
                  <h4><Clock size={16} /> Navigation Timing</h4>
                  <div className="metric-grid">
                    <div className="metric-item">
                      <span className="metric-label">DOM Content Loaded</span>
                      <span className="metric-value">
                        {formatTime(metrics.navigationTiming.domContentLoaded)}
                      </span>
                    </div>
                    <div className="metric-item">
                      <span className="metric-label">Load Complete</span>
                      <span className="metric-value">
                        {formatTime(metrics.navigationTiming.loadComplete)}
                      </span>
                    </div>
                    <div className="metric-item">
                      <span className="metric-label">First Paint</span>
                      <span className={`metric-value ${getScoreColor('fcp', metrics.navigationTiming.firstPaint)}`}>
                        {formatTime(metrics.navigationTiming.firstPaint)}
                      </span>
                    </div>
                    <div className="metric-item">
                      <span className="metric-label">First Contentful Paint</span>
                      <span className={`metric-value ${getScoreColor('fcp', metrics.navigationTiming.firstContentfulPaint)}`}>
                        {formatTime(metrics.navigationTiming.firstContentfulPaint)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Web Vitals */}
                <div className="metric-section">
                  <h4><Zap size={16} /> Core Web Vitals</h4>
                  <div className="metric-grid">
                    <div className="metric-item">
                      <span className="metric-label">LCP</span>
                      <span className={`metric-value ${getScoreColor('lcp', metrics.webVitals.lcp)}`}>
                        {formatTime(metrics.webVitals.lcp)}
                      </span>
                    </div>
                    <div className="metric-item">
                      <span className="metric-label">CLS</span>
                      <span className={`metric-value ${getScoreColor('cls', metrics.webVitals.cls)}`}>
                        {metrics.webVitals.cls.toFixed(3)}
                      </span>
                    </div>
                    <div className="metric-item">
                      <span className="metric-label">FID</span>
                      <span className={`metric-value ${getScoreColor('fid', metrics.webVitals.fid)}`}>
                        {formatTime(metrics.webVitals.fid)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Memory Usage */}
                {metrics.memoryUsage && (
                  <div className="metric-section">
                    <h4><Monitor size={16} /> Memory Usage</h4>
                    <div className="metric-grid">
                      <div className="metric-item">
                        <span className="metric-label">Used Heap</span>
                        <span className="metric-value">
                          {formatBytes(metrics.memoryUsage.usedJSHeapSize)}
                        </span>
                      </div>
                      <div className="metric-item">
                        <span className="metric-label">Total Heap</span>
                        <span className="metric-value">
                          {formatBytes(metrics.memoryUsage.totalJSHeapSize)}
                        </span>
                      </div>
                      <div className="metric-item">
                        <span className="metric-label">Heap Limit</span>
                        <span className="metric-value">
                          {formatBytes(metrics.memoryUsage.jsHeapSizeLimit)}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Connection Info */}
                {metrics.connectionInfo && (
                  <div className="metric-section">
                    <h4><Activity size={16} /> Connection</h4>
                    <div className="metric-grid">
                      <div className="metric-item">
                        <span className="metric-label">Type</span>
                        <span className="metric-value">
                          {metrics.connectionInfo.effectiveType}
                        </span>
                      </div>
                      <div className="metric-item">
                        <span className="metric-label">Downlink</span>
                        <span className="metric-value">
                          {metrics.connectionInfo.downlink} Mbps
                        </span>
                      </div>
                      <div className="metric-item">
                        <span className="metric-label">RTT</span>
                        <span className="metric-value">
                          {metrics.connectionInfo.rtt}ms
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="perf-monitor-footer">
              <button
                className="refresh-button"
                onClick={collectMetrics}
                disabled={isCollecting}
              >
                {isCollecting ? 'Collecting...' : 'Refresh Metrics'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PerformanceMonitorComponent;