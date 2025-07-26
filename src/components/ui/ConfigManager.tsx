import React, { useState, useRef } from 'react';
import { LiquidGlassConfig, Theme, SavedConfig } from '@/lib/types';
import { 
  saveConfig, 
  getSavedConfigs, 
  deleteSavedConfig,
  exportConfig,
  importConfig,
  exportAllConfigs,
  clearAllData,
  getStorageUsage
} from '@/lib/utils/storage';
import { Button } from './Button';

interface ConfigManagerProps {
  currentConfig: LiquidGlassConfig;
  currentTheme: Theme;
  onConfigLoad: (config: LiquidGlassConfig, theme: Theme) => void;
  className?: string;
}

export const ConfigManager: React.FC<ConfigManagerProps> = ({
  currentConfig,
  currentTheme,
  onConfigLoad,
  className = '',
}) => {
  const [savedConfigs, setSavedConfigs] = useState<SavedConfig[]>(getSavedConfigs());
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [saveDialogName, setSaveDialogName] = useState('');
  const [storageInfo, setStorageInfo] = useState(getStorageUsage());
  const fileInputRef = useRef<HTMLInputElement>(null);

  const refreshConfigs = () => {
    setSavedConfigs(getSavedConfigs());
    setStorageInfo(getStorageUsage());
  };

  const handleSave = () => {
    if (!saveDialogName.trim()) return;
    
    saveConfig(saveDialogName.trim(), currentConfig, currentTheme);
    setSaveDialogName('');
    setShowSaveDialog(false);
    refreshConfigs();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this configuration?')) {
      deleteSavedConfig(id);
      refreshConfigs();
    }
  };

  const handleLoad = (config: SavedConfig) => {
    onConfigLoad(config.config, config.theme);
  };

  const handleExport = () => {
    exportConfig(currentConfig, currentTheme, 'current-config');
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const { config, theme, name } = await importConfig(file);
      
      // Save imported config
      saveConfig(name, config, theme);
      onConfigLoad(config, theme);
      refreshConfigs();
      
      alert('Configuration imported successfully!');
    } catch (error) {
      alert('Failed to import configuration. Please check the file format.');
    }
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleExportAll = () => {
    exportAllConfigs();
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to delete all saved configurations? This action cannot be undone.')) {
      clearAllData();
      refreshConfigs();
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Configurations
        </h3>
        <Button
          variant="primary"
          size="sm"
          onClick={() => setShowSaveDialog(true)}
          className="text-xs"
        >
          Save Current
        </Button>
      </div>

      {/* Save Dialog */}
      {showSaveDialog && (
        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Configuration name..."
              value={saveDialogName}
              onChange={(e) => setSaveDialogName(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              autoFocus
            />
            <div className="flex space-x-2">
              <Button
                variant="primary"
                size="sm"
                onClick={handleSave}
                disabled={!saveDialogName.trim()}
                className="text-xs"
              >
                Save
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setShowSaveDialog(false);
                  setSaveDialogName('');
                }}
                className="text-xs"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Saved Configurations List */}
      <div className="space-y-2 max-h-48 overflow-y-auto">
        {savedConfigs.length === 0 ? (
          <div className="text-xs text-gray-500 dark:text-gray-400 text-center py-4">
            No saved configurations
          </div>
        ) : (
          savedConfigs.map((config) => (
            <div
              key={config.id}
              className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-600"
            >
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-gray-900 dark:text-white truncate">
                  {config.name}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {config.config.type} • {new Date(config.createdAt).toLocaleDateString()}
                </div>
              </div>
              <div className="flex items-center space-x-1 ml-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleLoad(config)}
                  className="text-xs h-6 px-2"
                >
                  Load
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(config.id)}
                  className="text-xs h-6 px-2 text-red-600 hover:text-red-700"
                >
                  Delete
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Import/Export Controls */}
      <div className="space-y-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600">
        <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300">
          Import/Export
        </h4>
        
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleExport}
            className="text-xs"
          >
            Export Current
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            className="text-xs"
          >
            Import Config
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleExportAll}
            className="text-xs"
          >
            Export All
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearAll}
            className="text-xs text-red-600 hover:text-red-700"
          >
            Clear All
          </Button>
        </div>
      </div>

      {/* Storage Usage Info */}
      <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded text-xs text-gray-600 dark:text-gray-400">
        <div className="flex justify-between items-center">
          <span>Storage Usage</span>
          <span>{storageInfo.totalConfigs} configs</span>
        </div>
        <div className="mt-1 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
          <div 
            className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${Math.min(storageInfo.usagePercentage, 100)}%` }}
          />
        </div>
        <div className="text-xs opacity-75 mt-1">
          {(storageInfo.storageSize / 1024).toFixed(1)}KB used
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleImport}
        className="hidden"
      />
    </div>
  );
};