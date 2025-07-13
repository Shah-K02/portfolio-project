import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Star, Target, Zap, Eye, Clock, MousePointer } from 'react-feather';
import './AchievementSystem.css';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  progress: number;
  maxProgress: number;
  unlocked: boolean;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  points: number;
  unlockedAt?: Date;
}

interface AchievementSystemProps {
  onAchievementUnlock?: (achievement: Achievement) => void;
}

const AchievementSystem: React.FC<AchievementSystemProps> = ({ onAchievementUnlock }) => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [recentUnlocks, setRecentUnlocks] = useState<Achievement[]>([]);
  const [userStats, setUserStats] = useState({
    timeSpent: 0,
    sectionsVisited: new Set<string>(),
    projectsViewed: new Set<string>(),
    interactionsCount: 0,
    scrollDistance: 0,
    clickCount: 0
  });
  const [isVisible, setIsVisible] = useState(false);
  const [totalPoints, setTotalPoints] = useState(0);

  const initializeAchievements = useCallback((): Achievement[] => [
    {
      id: 'first-visit',
      title: 'Welcome Explorer',
      description: 'Visit the portfolio for the first time',
      icon: <Eye size={24} />,
      progress: 1,
      maxProgress: 1,
      unlocked: true,
      rarity: 'common',
      points: 10,
      unlockedAt: new Date()
    },
    {
      id: 'time-traveler',
      title: 'Time Traveler',
      description: 'Spend 5 minutes exploring the portfolio',
      icon: <Clock size={24} />,
      progress: 0,
      maxProgress: 300, // 5 minutes in seconds
      unlocked: false,
      rarity: 'common',
      points: 25
    },
    {
      id: 'section-explorer',
      title: 'Section Explorer',
      description: 'Visit all main sections',
      icon: <Target size={24} />,
      progress: 0,
      maxProgress: 5, // About, Skills, Projects, Resume, Contact
      unlocked: false,
      rarity: 'rare',
      points: 50
    },
    {
      id: 'project-enthusiast',
      title: 'Project Enthusiast',
      description: 'View 3 different projects',
      icon: <Star size={24} />,
      progress: 0,
      maxProgress: 3,
      unlocked: false,
      rarity: 'rare',
      points: 40
    },
    {
      id: 'interaction-master',
      title: 'Interaction Master',
      description: 'Perform 50 interactions',
      icon: <MousePointer size={24} />,
      progress: 0,
      maxProgress: 50,
      unlocked: false,
      rarity: 'epic',
      points: 75
    },
    {
      id: 'scroll-champion',
      title: 'Scroll Champion',
      description: 'Scroll a total distance of 10,000 pixels',
      icon: <Zap size={24} />,
      progress: 0,
      maxProgress: 10000,
      unlocked: false,
      rarity: 'epic',
      points: 60
    },
    {
      id: 'portfolio-master',
      title: 'Portfolio Master',
      description: 'Unlock all other achievements',
      icon: <Award size={24} />,
      progress: 0,
      maxProgress: 5, // Number of other achievements
      unlocked: false,
      rarity: 'legendary',
      points: 200
    }
  ], []);

  const checkAchievements = useCallback(() => {
    setAchievements(prev => {
      const updated = prev.map(achievement => {
        let newProgress = achievement.progress;
        
        switch (achievement.id) {
          case 'time-traveler':
            newProgress = Math.min(userStats.timeSpent, achievement.maxProgress);
            break;
          case 'section-explorer':
            newProgress = Math.min(userStats.sectionsVisited.size, achievement.maxProgress);
            break;
          case 'project-enthusiast':
            newProgress = Math.min(userStats.projectsViewed.size, achievement.maxProgress);
            break;
          case 'interaction-master':
            newProgress = Math.min(userStats.interactionsCount, achievement.maxProgress);
            break;
          case 'scroll-champion':
            newProgress = Math.min(userStats.scrollDistance, achievement.maxProgress);
            break;
          case 'portfolio-master':
            newProgress = prev.filter(a => a.id !== 'portfolio-master' && a.unlocked).length;
            break;
        }
        
        const wasUnlocked = achievement.unlocked;
        const isNowUnlocked = newProgress >= achievement.maxProgress;
        
        if (!wasUnlocked && isNowUnlocked) {
          const unlockedAchievement = {
            ...achievement,
            progress: newProgress,
            unlocked: true,
            unlockedAt: new Date()
          };
          
          setRecentUnlocks(recent => [...recent, unlockedAchievement]);
          onAchievementUnlock?.(unlockedAchievement);
          
          // Remove from recent unlocks after 5 seconds
          setTimeout(() => {
            setRecentUnlocks(recent => recent.filter(a => a.id !== achievement.id));
          }, 5000);
          
          return unlockedAchievement;
        }
        
        return {
          ...achievement,
          progress: newProgress
        };
      });
      
      return updated;
    });
  }, [userStats, onAchievementUnlock]);

  // Public methods for tracking user actions
  const trackSectionVisit = useCallback((sectionId: string) => {
    setUserStats(prev => ({
      ...prev,
      sectionsVisited: new Set(Array.from(prev.sectionsVisited).concat([sectionId]))
    }));
  }, []);

  const trackProjectView = useCallback((projectId: string) => {
    setUserStats(prev => ({
      ...prev,
      projectsViewed: new Set(Array.from(prev.projectsViewed).concat([projectId]))
    }));
  }, []);

  const trackInteraction = useCallback(() => {
    setUserStats(prev => ({
      ...prev,
      interactionsCount: prev.interactionsCount + 1
    }));
  }, []);

  const trackScroll = useCallback((distance: number) => {
    setUserStats(prev => ({
      ...prev,
      scrollDistance: prev.scrollDistance + Math.abs(distance)
    }));
  }, []);

  // Initialize achievements and start time tracking
  useEffect(() => {
    setAchievements(initializeAchievements());
    
    const startTime = Date.now();
    const timeInterval = setInterval(() => {
      setUserStats(prev => ({
        ...prev,
        timeSpent: Math.floor((Date.now() - startTime) / 1000)
      }));
    }, 1000);
    
    return () => clearInterval(timeInterval);
  }, [initializeAchievements]);

  // Check achievements when stats change
  useEffect(() => {
    checkAchievements();
  }, [userStats, checkAchievements]);

  // Calculate total points
  useEffect(() => {
    const points = achievements
      .filter(a => a.unlocked)
      .reduce((sum, a) => sum + a.points, 0);
    setTotalPoints(points);
  }, [achievements]);

  const getRarityColor = (rarity: Achievement['rarity']) => {
    switch (rarity) {
      case 'common': return '#10b981';
      case 'rare': return '#3b82f6';
      case 'epic': return '#8b5cf6';
      case 'legendary': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  const getProgressPercentage = (achievement: Achievement) => {
    return Math.min((achievement.progress / achievement.maxProgress) * 100, 100);
  };

  // Expose tracking methods globally
  useEffect(() => {
    (window as any).achievementSystem = {
      trackSectionVisit,
      trackProjectView,
      trackInteraction,
      trackScroll
    };
  }, [trackSectionVisit, trackProjectView, trackInteraction, trackScroll]);

  return (
    <>
      {/* Achievement Panel Toggle */}
      <motion.button
        className="achievement-toggle"
        onClick={() => setIsVisible(!isVisible)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Award size={20} />
        <span className="achievement-count">{achievements.filter(a => a.unlocked).length}</span>
      </motion.button>

      {/* Achievement Panel */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="achievement-panel"
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="achievement-header">
              <h3>Achievements</h3>
              <div className="total-points">
                <Star size={16} />
                <span>{totalPoints} points</span>
              </div>
            </div>
            
            <div className="achievement-list">
              {achievements.map(achievement => (
                <motion.div
                  key={achievement.id}
                  className={`achievement-item ${achievement.unlocked ? 'unlocked' : 'locked'} ${achievement.rarity}`}
                  whileHover={{ scale: 1.02 }}
                  style={{ borderColor: getRarityColor(achievement.rarity) }}
                >
                  <div className="achievement-icon" style={{ color: getRarityColor(achievement.rarity) }}>
                    {achievement.icon}
                  </div>
                  
                  <div className="achievement-content">
                    <h4>{achievement.title}</h4>
                    <p>{achievement.description}</p>
                    
                    <div className="achievement-progress">
                      <div className="progress-bar">
                        <motion.div
                          className="progress-fill"
                          style={{ backgroundColor: getRarityColor(achievement.rarity) }}
                          initial={{ width: 0 }}
                          animate={{ width: `${getProgressPercentage(achievement)}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                      <span className="progress-text">
                        {achievement.progress}/{achievement.maxProgress}
                      </span>
                    </div>
                    
                    <div className="achievement-meta">
                      <span className="points">+{achievement.points} points</span>
                      {achievement.unlocked && achievement.unlockedAt && (
                        <span className="unlock-time">
                          Unlocked {achievement.unlockedAt.toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Recent Unlock Notifications */}
      <div className="achievement-notifications">
        <AnimatePresence>
          {recentUnlocks.map(achievement => (
            <motion.div
              key={`notification-${achievement.id}`}
              className={`achievement-notification ${achievement.rarity}`}
              initial={{ opacity: 0, y: -50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.8 }}
              transition={{ type: 'spring', damping: 15, stiffness: 300 }}
            >
              <div className="notification-icon" style={{ color: getRarityColor(achievement.rarity) }}>
                {achievement.icon}
              </div>
              <div className="notification-content">
                <h4>Achievement Unlocked!</h4>
                <p>{achievement.title}</p>
                <span className="notification-points">+{achievement.points} points</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
};

export default AchievementSystem;
export { AchievementSystem };