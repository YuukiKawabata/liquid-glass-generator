import React, { useState } from 'react';
import { GeneratedCode, OutputType, LiquidGlassConfig } from '@/lib/types';
import { Button } from '@/components/ui/Button';

interface CodeOutputProps {
  generatedCode: GeneratedCode | null;
  outputType: OutputType;
  onCopy: () => void;
  config?: LiquidGlassConfig;
}

export const CodeOutput: React.FC<CodeOutputProps> = ({
  generatedCode,
  outputType,
  onCopy,
  config,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!generatedCode?.code) return;
    
    try {
      await navigator.clipboard.writeText(generatedCode.code);
      setCopied(true);
      onCopy();
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const downloadAsFile = () => {
    if (!generatedCode?.code) return;

    const getFileExtension = () => {
      switch (outputType) {
        case 'html': return 'html';
        case 'css': return 'css';
        case 'react':
        case 'typescript': return 'tsx';
        case 'vue': return 'vue';
        default: return 'txt';
      }
    };

    const fileName = `liquid-glass-${config?.type || 'component'}.${getFileExtension()}`;
    const blob = new Blob([generatedCode.code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getLanguageForHighlighting = () => {
    switch (outputType) {
      case 'css':
        return 'css';
      case 'html':
        return 'html';
      case 'react':
      case 'typescript':
        return 'typescript';
      case 'vue':
        return 'vue';
      default:
        return 'css';
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center p-3 lg:p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Code Output
        </h2>
        
        {generatedCode && (
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-500 uppercase tracking-wide">
              {outputType}
            </span>
            
            {/* Download Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={downloadAsFile}
              className="min-h-[36px] px-2 lg:px-3 touch-manipulation"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="text-xs lg:text-sm">Download</span>
            </Button>

            {/* Copy Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className={`${copied ? 'text-green-600' : ''} min-h-[36px] px-2 lg:px-3 touch-manipulation`}
            >
              {copied ? (
                <>
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs lg:text-sm">Copied!</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span className="text-xs lg:text-sm">Copy</span>
                </>
              )}
            </Button>
          </div>
        )}
      </div>
      
      <div className="flex-1 overflow-hidden">
        {generatedCode ? (
          <div className="h-full overflow-auto">
            <pre className="text-xs lg:text-sm p-3 lg:p-4 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-mono leading-relaxed">
              <code className={`language-${getLanguageForHighlighting()}`}>
                {generatedCode.code}
              </code>
            </pre>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
            <div className="text-center p-4">
              <svg className="w-10 lg:w-12 h-10 lg:h-12 mx-auto mb-3 lg:mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              <p className="text-sm">Generate code to see output</p>
            </div>
          </div>
        )}
      </div>
      
      {generatedCode && (
        <div className="p-3 lg:p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Generated at {new Date(generatedCode.generatedAt).toLocaleTimeString()}
          </div>
        </div>
      )}
    </div>
  );
};