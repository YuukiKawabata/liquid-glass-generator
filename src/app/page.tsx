'use client';

import { useState, useCallback } from 'react';
import { LiquidGlassConfig, OutputType, GeneratedCode } from '@/lib/types';
import { PreviewArea } from '@/components/Editor/PreviewArea';
import { ControlPanel } from '@/components/Editor/ControlPanel';
import { CodeOutput } from '@/components/Editor/CodeOutput';
import { PanelResizer } from '@/components/ui/PanelResizer';
import { TrueLiquidGlassButton } from '@/components/ui/TrueLiquidGlassButton';
import { LiquidGlassContainer } from '@/components/ui/LiquidGlassContainer';
import { LiquidGlassFilters } from '@/components/ui/LiquidGlassFilters';
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

  const handleLeftPanelResize = useCallback((deltaX: number) => {
    setLeftPanelWidth(prev => {
      const newWidth = Math.max(280, Math.min(500, prev + deltaX));
      console.log('Left panel resize:', prev, '->', newWidth, 'delta:', deltaX);
      return newWidth;
    });
  }, []);

  const handleRightPanelResize = useCallback((deltaX: number) => {
    setRightPanelWidth(prev => {
      const newWidth = Math.max(320, Math.min(600, prev - deltaX));
      console.log('Right panel resize:', prev, '->', newWidth, 'delta:', deltaX);
      return newWidth;
    });
  }, []);

  return (
    <div className="liquid-bg min-h-screen">
      <LiquidGlassFilters />
      {/* True Liquid Glass Header */}
      <header className="relative z-10">
        <LiquidGlassContainer
          variant="enhanced"
          className="mx-4 mt-4 lg:mx-6 lg:mt-6 p-4 lg:p-6 liquid-animate-in"
          roundness={20}
          enableDistortion={false}
          enableParticles={false}
          enableInteractive={true}
        >
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-xl lg:text-3xl font-bold liquid-text-gradient">
                Liquid Glass Generator
              </h1>
              <p className="text-sm lg:text-base text-white/80">
                Create stunning Apple iOS 26 liquid glass effects with real-time preview
              </p>
            </div>
            <div className="liquid-glass-button p-2 rounded-lg">
              <LanguageToggle />
            </div>
          </div>
          
          {/* Mobile Tab Navigation */}
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
        </LiquidGlassContainer>
      </header>

      {/* Spacer for header margin */}
      <div className="h-6 lg:h-8"></div>

      {/* Main Content */}
      <main className="h-[calc(100vh-188px)] lg:h-[calc(100vh-168px)] px-4 lg:px-6 pb-4 lg:pb-6">
        {/* Desktop Layout with True Liquid Glass */}
        <div className="hidden lg:flex h-full gap-0">
          {/* Left Panel - Controls */}
          <div 
            style={{ 
              width: `${leftPanelWidth}px`,
              flexShrink: 0
            }}
          >
            <LiquidGlassContainer
              variant="enhanced"
              roundness={16}
              enableDistortion={false}
              enableInteractive={false}
              className="liquid-animate-in h-full"
              style={{ 
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
            </LiquidGlassContainer>
          </div>

          {/* Left Resizer */}
          <PanelResizer onResize={handleLeftPanelResize} />

          {/* Preview Area with True Liquid Glass */}
          <LiquidGlassContainer
            variant="preview"
            roundness={16}
            enableDistortion={false}
            enableParticles={false}
            enableInteractive={false}
            className="flex-1 min-w-0 liquid-animate-in"
            style={{ 
              animationDelay: '0.2s',
              animationFillMode: 'both'
            }}
          >
            <PreviewArea config={config} />
          </LiquidGlassContainer>
          
          {/* Right Resizer */}
          <PanelResizer onResize={handleRightPanelResize} />
          
          {/* Right Panel - Code Output */}
          <div 
            style={{ 
              width: `${rightPanelWidth}px`,
              flexShrink: 0
            }}
          >
            <LiquidGlassContainer
              variant="enhanced"
              roundness={16}
              enableDistortion={false}
              enableInteractive={false}
              className="flex flex-col liquid-animate-in h-full"
              style={{ 
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
            </LiquidGlassContainer>
          </div>
        </div>

        {/* Mobile Layout with Clean Glass */}
        <div className="lg:hidden h-full">
          {activeTab === 'controls' && (
            <LiquidGlassContainer
              variant="enhanced"
              roundness={16}
              enableDistortion={false}
              enableInteractive={false}
              className="h-full liquid-animate-in"
            >
              <ControlPanel
                config={config}
                outputType={outputType}
                isGenerating={isGenerating}
                onConfigChange={handleConfigChange}
                onOutputTypeChange={setOutputType}
                onGenerate={handleGenerate}
              />
            </LiquidGlassContainer>
          )}
          
          {activeTab === 'preview' && (
            <LiquidGlassContainer
              variant="preview"
              roundness={16}
              enableDistortion={false}
              enableParticles={false}
              enableInteractive={false}
              className="h-full liquid-animate-in"
            >
              <PreviewArea config={config} />
            </LiquidGlassContainer>
          )}
          
          {activeTab === 'code' && (
            <LiquidGlassContainer
              variant="enhanced"
              roundness={16}
              enableDistortion={false}
              enableInteractive={false}
              className="h-full liquid-animate-in"
            >
              <CodeOutput
                generatedCode={generatedCode}
                outputType={outputType}
                onCopy={handleCopy}
                config={config}
              />
            </LiquidGlassContainer>
          )}
        </div>
      </main>
    </div>
  );
}
