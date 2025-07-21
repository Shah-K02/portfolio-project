// Advanced Analytics and Personalization System

export interface UserSession {
  id: string;
  startTime: Date;
  endTime?: Date;
  pageViews: PageView[];
  interactions: Interaction[];
  deviceInfo: DeviceInfo;
  preferences: UserPreferences;
}

export interface PageView {
  page: string;
  timestamp: Date;
  timeSpent: number;
  scrollDepth: number;
  exitPoint?: string;
}

export interface Interaction {
  type: 'click' | 'hover' | 'scroll' | 'keypress' | 'touch' | 'gesture';
  element: string;
  timestamp: Date;
  position?: { x: number; y: number };
  value?: any;
}

export interface DeviceInfo {
  userAgent: string;
  screenResolution: string;
  deviceType: 'mobile' | 'tablet' | 'desktop';
  browser: string;
  os: string;
  touchSupport: boolean;
  connectionType?: string;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  reducedMotion: boolean;
  language: string;
  favoriteProjects: string[];
  interestAreas: string[];
  visitFrequency: 'first-time' | 'returning' | 'frequent';
  [key: string]: any;
}

export interface PersonalizationData {
  recommendedProjects: string[];
  suggestedSections: string[];
  customizedContent: Record<string, any>;
  adaptiveUI: {
    showAdvancedFeatures: boolean;
    preferredNavigation: 'traditional' | 'gesture' | 'voice';
    contentDensity: 'compact' | 'comfortable' | 'spacious';
  };
}

class AdvancedAnalytics {
  private session: UserSession;
  private isTracking: boolean = false;
  private heatmapData: Map<string, number[]> = new Map();
  private performanceMetrics: Map<string, number> = new Map();
  private aiInsights: Map<string, any> = new Map();

  constructor() {
    this.session = this.initializeSession();
    this.setupEventListeners();
    this.loadStoredData();
  }

  private initializeSession(): UserSession {
    return {
      id: this.generateSessionId(),
      startTime: new Date(),
      pageViews: [],
      interactions: [],
      deviceInfo: this.getDeviceInfo(),
      preferences: this.getUserPreferences()
    };
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private getDeviceInfo(): DeviceInfo {
    const ua = navigator.userAgent;
    const screen = window.screen;
    
    return {
      userAgent: ua,
      screenResolution: `${screen.width}x${screen.height}`,
      deviceType: this.detectDeviceType(),
      browser: this.detectBrowser(ua),
      os: this.detectOS(ua),
      touchSupport: 'ontouchstart' in window,
      connectionType: (navigator as any).connection?.effectiveType
    };
  }

  private detectDeviceType(): 'mobile' | 'tablet' | 'desktop' {
    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
  }

  private detectBrowser(ua: string): string {
    if (ua.includes('Chrome')) return 'Chrome';
    if (ua.includes('Firefox')) return 'Firefox';
    if (ua.includes('Safari')) return 'Safari';
    if (ua.includes('Edge')) return 'Edge';
    return 'Unknown';
  }

  private detectOS(ua: string): string {
    if (ua.includes('Windows')) return 'Windows';
    if (ua.includes('Mac')) return 'macOS';
    if (ua.includes('Linux')) return 'Linux';
    if (ua.includes('Android')) return 'Android';
    if (ua.includes('iOS')) return 'iOS';
    return 'Unknown';
  }

  private getUserPreferences(): UserPreferences {
    const stored = localStorage.getItem('userPreferences');
    const defaults: UserPreferences = {
      theme: 'auto',
      reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      language: navigator.language,
      favoriteProjects: [],
      interestAreas: [],
      visitFrequency: this.determineVisitFrequency()
    };
    
    return stored ? { ...defaults, ...JSON.parse(stored) } : defaults;
  }

  private determineVisitFrequency(): 'first-time' | 'returning' | 'frequent' {
    const visitCount = parseInt(localStorage.getItem('visitCount') || '0');
    
    if (visitCount === 0) return 'first-time';
    if (visitCount < 5) return 'returning';
    return 'frequent';
  }

  private setupEventListeners(): void {
    // Track page visibility
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.pauseTracking();
      } else {
        this.resumeTracking();
      }
    });

    // Track scroll behavior
    let scrollTimeout: NodeJS.Timeout;
    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        this.trackScrollBehavior();
      }, 100);
    });

    // Track mouse movement for heatmap
    document.addEventListener('mousemove', (e) => {
      this.trackHeatmapData(e.clientX, e.clientY);
    });

    // Track clicks
    document.addEventListener('click', (e) => {
      this.trackInteraction({
        type: 'click',
        element: this.getElementSelector(e.target as Element),
        timestamp: new Date(),
        position: { x: e.clientX, y: e.clientY }
      });
    });

    // Track keyboard usage
    document.addEventListener('keydown', (e) => {
      this.trackInteraction({
        type: 'keypress',
        element: this.getElementSelector(e.target as Element),
        timestamp: new Date(),
        value: e.key
      });
    });

    // Track touch events
    document.addEventListener('touchstart', (e) => {
      const touch = e.touches[0];
      this.trackInteraction({
        type: 'touch',
        element: this.getElementSelector(e.target as Element),
        timestamp: new Date(),
        position: { x: touch.clientX, y: touch.clientY }
      });
    });
  }

  private getElementSelector(element: Element): string {
    if (element.id) return `#$;{element.id}`;
    if (element.className && typeof element.className === 'string') {
      return `.${element.className.split(' ')[0]}`;
    }
    if (element.className && element.className.toString) {
      const classNameStr = element.className.toString();
      if (classNameStr) return `.${classNameStr.split(' ')[0]}`;
    }
    return element.tagName.toLowerCase();
  }

  private trackHeatmapData(x: number, y: number): void {
    const key = `${Math.floor(x / 10)},${Math.floor(y / 10)}`;
    const current = this.heatmapData.get(key) || [];
    current.push(Date.now());
    this.heatmapData.set(key, current);
  }

  private trackScrollBehavior(): void {
    const scrollDepth = Math.round(
      (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    );
    
    this.trackInteraction({
      type: 'scroll',
      element: 'window',
      timestamp: new Date(),
      value: scrollDepth
    });
  }

  public startTracking(): void {
    this.isTracking = true;
    this.updateVisitCount();
  }

  public pauseTracking(): void {
    this.isTracking = false;
  }

  public resumeTracking(): void {
    this.isTracking = true;
  }

  public stopTracking(): void {
    this.isTracking = false;
    this.session.endTime = new Date();
    this.saveSession();
  }

  public trackPageView(page: string): void {
    if (!this.isTracking) return;
    
    const pageView: PageView = {
      page,
      timestamp: new Date(),
      timeSpent: 0,
      scrollDepth: 0
    };
    
    this.session.pageViews.push(pageView);
  }

  public trackInteraction(interaction: Interaction): void {
    if (!this.isTracking) return;
    
    this.session.interactions.push(interaction);
  }

  public updateUserPreference(key: keyof UserPreferences, value: any): void {
    this.session.preferences[key] = value;
    localStorage.setItem('userPreferences', JSON.stringify(this.session.preferences));
  }

  public getPersonalizationData(): PersonalizationData {
    return {
      recommendedProjects: this.getRecommendedProjects(),
      suggestedSections: this.getSuggestedSections(),
      customizedContent: this.getCustomizedContent(),
      adaptiveUI: this.getAdaptiveUI()
    };
  }

  private getRecommendedProjects(): string[] {
    // AI-based recommendation logic
    const interestAreas = this.session.preferences.interestAreas;
    const viewedProjects = this.session.pageViews
      .filter(pv => pv.page.startsWith('project-'))
      .map(pv => pv.page);
    
    // Simple recommendation based on interests and device type
    const recommendations = [];
    
    if (interestAreas.includes('web-development')) {
      recommendations.push('portfolio-website', 'e-commerce-platform');
    }
    
    if (interestAreas.includes('mobile-development')) {
      recommendations.push('mobile-app', 'react-native-app');
    }
    
    if (this.session.deviceInfo.deviceType === 'mobile') {
      recommendations.push('mobile-first-design', 'pwa-project');
    }
    
    return recommendations.filter(r => !viewedProjects.includes(r)).slice(0, 3);
  }

  private getSuggestedSections(): string[] {
    const visitedSections = this.session.pageViews.map(pv => pv.page);
    const allSections = ['about', 'skills', 'projects', 'contact'];
    
    return allSections.filter(section => !visitedSections.includes(section));
  }

  private getCustomizedContent(): Record<string, any> {
    return {
      showAdvancedAnimations: !this.session.preferences.reducedMotion,
      preferredTheme: this.session.preferences.theme,
      deviceOptimizations: {
        touchFriendly: this.session.deviceInfo.touchSupport,
        highDensity: this.session.deviceInfo.deviceType === 'mobile'
      }
    };
  }

  private getAdaptiveUI(): PersonalizationData['adaptiveUI'] {
    const interactionCount = this.session.interactions.length;
    const timeSpent = Date.now() - this.session.startTime.getTime();
    
    return {
      showAdvancedFeatures: interactionCount > 20 || timeSpent > 300000, // 5 minutes
      preferredNavigation: this.session.deviceInfo.touchSupport ? 'gesture' : 'traditional',
      contentDensity: this.session.deviceInfo.deviceType === 'mobile' ? 'compact' : 'comfortable'
    };
  }

  public getHeatmapData(): Array<{ x: number; y: number; intensity: number }> {
    const heatmap: Array<{ x: number; y: number; intensity: number }> = [];
    
    this.heatmapData.forEach((timestamps, key) => {
      const [x, y] = key.split(',').map(Number);
      const intensity = timestamps.length;
      heatmap.push({ x: x * 10, y: y * 10, intensity });
    });
    
    return heatmap.sort((a, b) => b.intensity - a.intensity).slice(0, 100);
  }

  public getInsights(): Record<string, any> {
    const totalTime = this.session.endTime 
      ? this.session.endTime.getTime() - this.session.startTime.getTime()
      : Date.now() - this.session.startTime.getTime();
    
    const avgTimePerPage = this.session.pageViews.length > 0 
      ? totalTime / this.session.pageViews.length 
      : 0;
    
    const mostInteractedElements = this.getMostInteractedElements();
    const scrollPatterns = this.getScrollPatterns();
    
    return {
      sessionDuration: totalTime,
      averageTimePerPage: avgTimePerPage,
      totalInteractions: this.session.interactions.length,
      mostInteractedElements,
      scrollPatterns,
      deviceInfo: this.session.deviceInfo,
      engagementScore: this.calculateEngagementScore()
    };
  }

  private getMostInteractedElements(): Array<{ element: string; count: number }> {
    const elementCounts = new Map<string, number>();
    
    this.session.interactions.forEach(interaction => {
      const current = elementCounts.get(interaction.element) || 0;
      elementCounts.set(interaction.element, current + 1);
    });
    
    return Array.from(elementCounts.entries())
      .map(([element, count]) => ({ element, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }

  private getScrollPatterns(): Record<string, number> {
    const scrollInteractions = this.session.interactions.filter(i => i.type === 'scroll');
    const scrollDepths = scrollInteractions.map(i => i.value as number);
    
    return {
      maxScrollDepth: Math.max(...scrollDepths, 0),
      avgScrollDepth: scrollDepths.reduce((a, b) => a + b, 0) / scrollDepths.length || 0,
      scrollEvents: scrollInteractions.length
    };
  }

  private calculateEngagementScore(): number {
    const timeWeight = Math.min((Date.now() - this.session.startTime.getTime()) / 300000, 1); // Max 5 minutes
    const interactionWeight = Math.min(this.session.interactions.length / 50, 1); // Max 50 interactions
    const pageViewWeight = Math.min(this.session.pageViews.length / 5, 1); // Max 5 pages
    
    return Math.round((timeWeight + interactionWeight + pageViewWeight) / 3 * 100);
  }

  private updateVisitCount(): void {
    const visitCount = parseInt(localStorage.getItem('visitCount') || '0') + 1;
    localStorage.setItem('visitCount', visitCount.toString());
    localStorage.setItem('lastVisit', new Date().toISOString());
  }

  private saveSession(): void {
    const sessions = JSON.parse(localStorage.getItem('analyticsSessions') || '[]');
    sessions.push(this.session);
    
    // Keep only last 10 sessions
    if (sessions.length > 10) {
      sessions.splice(0, sessions.length - 10);
    }
    
    localStorage.setItem('analyticsSessions', JSON.stringify(sessions));
  }

  private loadStoredData(): void {
    // Load previous sessions for better personalization
    const sessions = JSON.parse(localStorage.getItem('analyticsSessions') || '[]');
    
    if (sessions.length > 0) {
      // Analyze previous sessions to improve recommendations
      this.analyzePreviousSessions(sessions);
    }
  }

  private analyzePreviousSessions(sessions: UserSession[]): void {
    // Extract patterns from previous sessions
    const allInteractions = sessions.flatMap(s => s.interactions);
    const allPageViews = sessions.flatMap(s => s.pageViews);
    
    // Update user preferences based on behavior
    const mostViewedPages = this.getMostFrequentPages(allPageViews);
    const preferredInteractionTypes = this.getPreferredInteractionTypes(allInteractions);
    
    // Store insights for personalization
    this.aiInsights.set('mostViewedPages', mostViewedPages);
    this.aiInsights.set('preferredInteractionTypes', preferredInteractionTypes);
  }

  private getMostFrequentPages(pageViews: PageView[]): string[] {
    const pageCounts = new Map<string, number>();
    
    pageViews.forEach(pv => {
      const current = pageCounts.get(pv.page) || 0;
      pageCounts.set(pv.page, current + 1);
    });
    
    return Array.from(pageCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([page]) => page);
  }

  private getPreferredInteractionTypes(interactions: Interaction[]): string[] {
    const typeCounts = new Map<string, number>();
    
    interactions.forEach(interaction => {
      const current = typeCounts.get(interaction.type) || 0;
      typeCounts.set(interaction.type, current + 1);
    });
    
    return Array.from(typeCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([type]) => type);
  }
}

// Export singleton instance
export const analytics = new AdvancedAnalytics();
export default analytics;