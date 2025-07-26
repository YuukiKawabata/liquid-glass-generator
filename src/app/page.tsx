'use client';

import { useState, useCallback } from 'react';
import { LiquidGlassConfig, OutputType, GeneratedCode } from '@/lib/types';
import { PreviewArea } from '@/components/Editor/PreviewArea';
import { ControlPanel } from '@/components/Editor/ControlPanel';
import { CodeOutput } from '@/components/Editor/CodeOutput';
import { PanelResizer } from '@/components/ui/PanelResizer';
import { generateCode } from '@/lib/utils/generateCSS';
import { defaultPresets } from '@/lib/utils/presets';
import { LanguageToggle } from '@/components/ui/LanguageToggle';
import { useI18n } from '@/lib/i18n/context';

export default function Home() {
  const { t } = useI18n();
  const [config, setConfig] = useState<LiquidGlassConfig>(defaultPresets[0].config);
  const [outputType, setOutputType] = useState<OutputType>('css');
  const [generatedCode, setGeneratedCode] = useState<GeneratedCode | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [leftPanelWidth, setLeftPanelWidth] = useState(320);
  const [rightPanelWidth, setRightPanelWidth] = useState(500);
  const [activeTab, setActiveTab] = useState<'controls' | 'preview' | 'code'>('preview');

  const handleConfigChange = useCallback((newConfig: Partial<LiquidGlassConfig>) => {
    setConfig(prev => ({ ...prev, ...newConfig }));
  }, []);

  const handleGenerate = useCallback(async () => {
    setIsGenerating(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      const code = generateCode(config, outputType);
      const result: GeneratedCode = {
        code,
        language: outputType === 'react' || outputType === 'vue' ? 'typescript' : outputType,
        framework: outputType,
        generatedAt: new Date().toISOString(),
      };
      setGeneratedCode(result);
      // Auto-switch to code tab on mobile after generation
      if (window.innerWidth < 1024) {
        setActiveTab('code');
      }
    } finally {
      setIsGenerating(false);
    }
  }, [config, outputType]);

  const handleCopy = () => {
    console.log('Code copied to clipboard');
  };

  const handleLeftPanelResize = (deltaX: number) => {
    const newWidth = Math.max(240, Math.min(500, leftPanelWidth + deltaX));
    setLeftPanelWidth(newWidth);
  };

  const handleRightPanelResize = (deltaX: number) => {
    const newWidth = Math.max(280, Math.min(600, rightPanelWidth - deltaX));
    setRightPanelWidth(newWidth);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
                Liquid Glass Generator
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Create stunning glassmorphism effects with real-time preview
              </p>
            </div>
            <LanguageToggle />
          </div>
          
          {/* Mobile Tab Navigation */}
          <div className="lg:hidden mt-4">
            <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <button
                className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === 'controls'
                    ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-300'
                }`}
                onClick={() => setActiveTab('controls')}
              >
                {t.controlPanel}
              </button>
              <button
                className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === 'preview'
                    ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-300'
                }`}
                onClick={() => setActiveTab('preview')}
              >
                {t.previewTitle}
              </button>
              <button
                className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === 'code'
                    ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-300'
                }`}
                onClick={() => setActiveTab('code')}
              >
                {t.codeOutput}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="h-[calc(100vh-140px)] lg:h-[calc(100vh-88px)] flex">
        {/* Desktop: Left Panel - Controls */}
        <div className="hidden lg:block">
          <div 
            className="bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto h-full"
            style={{ width: `${leftPanelWidth}px` }}
          >
            <ControlPanel
              config={config}
              outputType={outputType}
              isGenerating={isGenerating}
              onConfigChange={handleConfigChange}
              onOutputTypeChange={setOutputType}
              onGenerate={handleGenerate}
            />
          </div>

          <PanelResizer onResize={handleLeftPanelResize} />
        </div>

        {/* Mobile: Tab Content */}
        <div className="lg:hidden flex-1 overflow-hidden">
          {activeTab === 'controls' && (
            <div className="h-full bg-white dark:bg-gray-800 overflow-y-auto">
              <ControlPanel
                config={config}
                outputType={outputType}
                isGenerating={isGenerating}
                onConfigChange={handleConfigChange}
                onOutputTypeChange={setOutputType}
                onGenerate={handleGenerate}
              />
            </div>
          )}
          
          {activeTab === 'preview' && (
            <div className="h-full">
              <PreviewArea config={config} />
            </div>
          )}
          
          {activeTab === 'code' && (
            <div className="h-full bg-white dark:bg-gray-800">
              <CodeOutput
                generatedCode={generatedCode}
                outputType={outputType}
                onCopy={handleCopy}
                config={config}
              />
            </div>
          )}
        </div>

        {/* Desktop: Right side with Preview and Code */}
        <div className="hidden lg:flex flex-1 h-full">
          <div className="flex-1 min-w-0">
            <PreviewArea config={config} />
          </div>
          
          <PanelResizer onResize={handleRightPanelResize} />
          
          <div 
            className="border-l border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex flex-col"
            style={{ width: `${rightPanelWidth}px` }}
          >
            <CodeOutput
              generatedCode={generatedCode}
              outputType={outputType}
              onCopy={handleCopy}
              config={config}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
