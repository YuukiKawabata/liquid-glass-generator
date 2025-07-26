import { LiquidGlassConfig, SavedConfig, Theme } from '@/lib/types';

const STORAGE_KEYS = {
  SAVED_CONFIGS: 'liquid-glass-saved-configs',
  CURRENT_CONFIG: 'liquid-glass-current-config',
  SELECTED_THEME: 'liquid-glass-selected-theme',
  USER_PREFERENCES: 'liquid-glass-preferences',
} as const;

export interface UserPreferences {
  autoSave: boolean;
  showAnimations: boolean;
  defaultOutputType: string;
  recentlyUsed: string[];
}

const defaultPreferences: UserPreferences = {
  autoSave: true,
  showAnimations: true,
  defaultOutputType: 'css',
  recentlyUsed: [],
};

// Saved Configurations Management
export const saveConfig = (name: string, config: LiquidGlassConfig, theme: Theme): SavedConfig => {
  const savedConfigs = getSavedConfigs();
  const newConfig: SavedConfig = {
    id: `config-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    name,
    config,
    theme,
    createdAt: new Date().toISOString(),
    lastModified: new Date().toISOString(),
  };

  const updatedConfigs = [...savedConfigs, newConfig];
  localStorage.setItem(STORAGE_KEYS.SAVED_CONFIGS, JSON.stringify(updatedConfigs));
  
  // Update recently used
  updateRecentlyUsed(newConfig.id);
  
  return newConfig;
};

export const getSavedConfigs = (): SavedConfig[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.SAVED_CONFIGS);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading saved configs:', error);
    return [];
  }
};

export const updateSavedConfig = (id: string, updates: Partial<Omit<SavedConfig, 'id' | 'createdAt'>>): SavedConfig | null => {
  const savedConfigs = getSavedConfigs();
  const configIndex = savedConfigs.findIndex(config => config.id === id);
  
  if (configIndex === -1) return null;
  
  const updatedConfig = {
    ...savedConfigs[configIndex],
    ...updates,
    lastModified: new Date().toISOString(),
  };
  
  savedConfigs[configIndex] = updatedConfig;
  localStorage.setItem(STORAGE_KEYS.SAVED_CONFIGS, JSON.stringify(savedConfigs));
  
  return updatedConfig;
};

export const deleteSavedConfig = (id: string): boolean => {
  const savedConfigs = getSavedConfigs();
  const filteredConfigs = savedConfigs.filter(config => config.id !== id);
  
  if (filteredConfigs.length === savedConfigs.length) return false;
  
  localStorage.setItem(STORAGE_KEYS.SAVED_CONFIGS, JSON.stringify(filteredConfigs));
  
  // Remove from recently used
  const preferences = getUserPreferences();
  preferences.recentlyUsed = preferences.recentlyUsed.filter(configId => configId !== id);
  saveUserPreferences(preferences);
  
  return true;
};

export const getSavedConfigById = (id: string): SavedConfig | null => {
  const savedConfigs = getSavedConfigs();
  return savedConfigs.find(config => config.id === id) || null;
};

// Current Configuration Management
export const saveCurrentConfig = (config: LiquidGlassConfig): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.CURRENT_CONFIG, JSON.stringify(config));
  } catch (error) {
    console.error('Error saving current config:', error);
  }
};

export const getCurrentConfig = (): LiquidGlassConfig | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.CURRENT_CONFIG);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Error loading current config:', error);
    return null;
  }
};

// User Preferences Management
export const getUserPreferences = (): UserPreferences => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.USER_PREFERENCES);
    return stored ? { ...defaultPreferences, ...JSON.parse(stored) } : defaultPreferences;
  } catch (error) {
    console.error('Error loading user preferences:', error);
    return defaultPreferences;
  }
};

export const saveUserPreferences = (preferences: UserPreferences): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.USER_PREFERENCES, JSON.stringify(preferences));
  } catch (error) {
    console.error('Error saving user preferences:', error);
  }
};

export const updateRecentlyUsed = (configId: string): void => {
  const preferences = getUserPreferences();
  const recentlyUsed = preferences.recentlyUsed.filter(id => id !== configId);
  recentlyUsed.unshift(configId);
  
  // Keep only the 10 most recent
  preferences.recentlyUsed = recentlyUsed.slice(0, 10);
  saveUserPreferences(preferences);
};

// Export/Import Functions
export const exportConfig = (config: LiquidGlassConfig, theme: Theme, name: string = 'liquid-glass-config') => {
  const exportData = {
    name,
    config,
    theme,
    exportedAt: new Date().toISOString(),
    version: '1.0',
  };
  
  const dataStr = JSON.stringify(exportData, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  
  const link = document.createElement('a');
  link.href = URL.createObjectURL(dataBlob);
  link.download = `${name.replace(/[^a-z0-9]/gi, '-')}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const importConfig = (file: File): Promise<{ config: LiquidGlassConfig; theme: Theme; name: string }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const data = JSON.parse(content);
        
        // Validate the structure
        if (!data.config || !data.theme) {
          throw new Error('Invalid file format');
        }
        
        resolve({
          config: data.config,
          theme: data.theme,
          name: data.name || 'Imported Configuration',
        });
      } catch (error) {
        reject(new Error('Failed to parse configuration file'));
      }
    };
    
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
};

// Bulk Operations
export const exportAllConfigs = () => {
  const savedConfigs = getSavedConfigs();
  const preferences = getUserPreferences();
  
  const exportData = {
    configs: savedConfigs,
    preferences,
    exportedAt: new Date().toISOString(),
    version: '1.0',
  };
  
  const dataStr = JSON.stringify(exportData, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  
  const link = document.createElement('a');
  link.href = URL.createObjectURL(dataBlob);
  link.download = `liquid-glass-backup-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const clearAllData = (): void => {
  Object.values(STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
};

// Storage usage utilities
export const getStorageUsage = () => {
  const configs = getSavedConfigs();
  const configsSize = JSON.stringify(configs).length;
  const preferencesSize = JSON.stringify(getUserPreferences()).length;
  
  return {
    totalConfigs: configs.length,
    storageSize: configsSize + preferencesSize,
    maxStorageSize: 5 * 1024 * 1024, // 5MB limit for localStorage
    usagePercentage: ((configsSize + preferencesSize) / (5 * 1024 * 1024)) * 100,
  };
};