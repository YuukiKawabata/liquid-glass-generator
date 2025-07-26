'use client';

import React, { useState } from 'react';
import { LiquidGlassConfig, OutputType, GeneratedCode } from '@/lib/types';
import { generateCode } from '@/lib/utils/generateCSS';
import { defaultPresets } from '@/lib/utils/presets';
import { ControlPanel } from '@/components/Editor/ControlPanel';
import { PreviewArea } from '@/components/Editor/PreviewArea';
import { CodeOutput } from '@/components/Editor/CodeOutput';
import { PanelResizer } from '@/components/ui/PanelResizer';

export default function Home() {
  const [config, setConfig] = useState<LiquidGlassConfig>(defaultPresets[0].config);
  const [outputType, setOutputType] = useState<OutputType>('css');
  const [generatedCode, setGeneratedCode] = useState<GeneratedCode | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Panel widths state
  const [leftPanelWidth, setLeftPanelWidth] = useState(320); // ControlPanel width
  const [rightPanelWidth, setRightPanelWidth] = useState(384); // CodeOutput width

  const handleConfigChange = (newConfig: Partial<LiquidGlassConfig>) => {
    console.log('Config change:', newConfig);
    setConfig(prev => {
      const updated = { ...prev, ...newConfig };
      console.log('Updated config:', updated);
      return updated;
    });
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    // Simulate generation delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const code = generateCode(config, outputType);
    const result: GeneratedCode = {
      code,
      language: outputType === 'react' || outputType === 'vue' ? 'typescript' : outputType,
      framework: outputType,
      generatedAt: new Date().toISOString(),
    };
    
    setGeneratedCode(result);
    setIsGenerating(false);
  };

  const handleCopy = () => {
    // This will be called when copy is successful
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
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Liquid Glass Generator
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Create Apple-inspired glassmorphism effects
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </button>
          </div>
        </div>
      </header>
      
      <div className="flex-1 flex overflow-hidden">
        <div 
          className="bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 overflow-y-auto"
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
        
        <div className="flex-1 min-w-0">
          <PreviewArea config={config} />
        </div>
        
        <PanelResizer onResize={handleRightPanelResize} />
        
        <div 
          className="bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700 flex flex-col"
          style={{ width: `${rightPanelWidth}px` }}
        >
          <CodeOutput
            generatedCode={generatedCode}
            outputType={outputType}
            onCopy={handleCopy}
          />
        </div>
      </div>
    </div>
  );
}
