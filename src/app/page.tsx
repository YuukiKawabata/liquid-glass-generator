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
    <div className="liquid-bg min-h-screen">
      {/* Liquid Glass Header */}
      <header className="relative z-10">
        <div className="liquid-glass mx-4 mt-4 lg:mx-6 lg:mt-6 p-4 lg:p-6 liquid-animate-in">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-xl lg:text-3xl font-bold liquid-text-gradient">
                Liquid Glass Generator
              </h1>
              <p className="text-sm lg:text-base text-white/80">
                Create stunning glassmorphism effects with real-time preview
              </p>
            </div>
            <div className="liquid-glass-button p-2">
              <LanguageToggle />
            </div>
          </div>
          
          {/* Mobile Tab Navigation with Liquid Glass */}
          <div className="lg:hidden mt-6">
            <div className="liquid-glass p-1 rounded-xl">
              <div className="flex space-x-1">
                <button
                  className={`flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    activeTab === 'controls'
                      ? 'liquid-glass-button text-white shadow-lg'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                  onClick={() => setActiveTab('controls')}
                >
                  {t.controlPanel}
                </button>
                <button
                  className={`flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    activeTab === 'preview'
                      ? 'liquid-glass-button text-white shadow-lg'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                  onClick={() => setActiveTab('preview')}
                >
                  {t.previewTitle}
                </button>
                <button
                  className={`flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    activeTab === 'code'
                      ? 'liquid-glass-button text-white shadow-lg'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                  onClick={() => setActiveTab('code')}
                >
                  {t.codeOutput}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="h-[calc(100vh-140px)] lg:h-[calc(100vh-120px)] flex px-4 lg:px-6 pb-4 lg:pb-6">
        {/* Desktop: Left Panel - Controls */}
        <div className="hidden lg:block">
          <div 
            className="liquid-glass h-full overflow-y-auto liquid-animate-in"
            style={{ 
              width: `${leftPanelWidth}px`,
              animationDelay: '0.1s',
              animationFillMode: 'both'
            }}
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

          <div className="w-2 flex items-center justify-center liquid-panel-resizer cursor-col-resize">
            <PanelResizer onResize={handleLeftPanelResize} />
          </div>
        </div>

        {/* Mobile: Tab Content */}
        <div className="lg:hidden flex-1 overflow-hidden">
          {activeTab === 'controls' && (
            <div className="h-full liquid-glass overflow-y-auto liquid-animate-in">
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
            <div className="h-full liquid-animate-in">
              <PreviewArea config={config} />
            </div>
          )}
          
          {activeTab === 'code' && (
            <div className="h-full liquid-glass liquid-animate-in">
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
        <div className="hidden lg:flex flex-1 h-full ml-2">
          <div 
            className="flex-1 min-w-0 mr-2 liquid-animate-in"
            style={{ 
              animationDelay: '0.2s',
              animationFillMode: 'both'
            }}
          >
            <PreviewArea config={config} />
          </div>
          
          <div className="w-2 flex items-center justify-center liquid-panel-resizer cursor-col-resize">
            <PanelResizer onResize={handleRightPanelResize} />
          </div>
          
          <div 
            className="liquid-glass flex flex-col ml-2 liquid-animate-in"
            style={{ 
              width: `${rightPanelWidth}px`,
              animationDelay: '0.3s',
              animationFillMode: 'both'
            }}
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
