import { useI18n } from '@/lib/i18n/context';

export const LanguageToggle = () => {
  const { locale, switchToEnglish, switchToJapanese } = useI18n();

  return (
    <div className="relative">
      <div className="flex items-center bg-white/10 backdrop-blur-8 rounded-xl p-1 border border-white/20 shadow-md">
        <button
          onClick={switchToEnglish}
          className={`
            px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 min-w-[44px] lg:min-w-[auto]
            ${locale === 'en' 
              ? 'bg-white/20 text-white shadow-md border border-white/30 backdrop-blur-8' 
              : 'text-white/70 hover:text-white hover:bg-white/10'
            }
          `}
        >
          EN
        </button>
        <button
          onClick={switchToJapanese}
          className={`
            px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 min-w-[44px] lg:min-w-[auto]
            ${locale === 'ja' 
              ? 'bg-white/20 text-white shadow-md border border-white/30 backdrop-blur-8' 
              : 'text-white/70 hover:text-white hover:bg-white/10'
            }
          `}
        >
          JP
        </button>
      </div>
      
      {/* Subtle glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-500/20 rounded-xl blur-xl opacity-0 hover:opacity-100 transition-opacity duration-300 -z-10"></div>
    </div>
  );
}; 