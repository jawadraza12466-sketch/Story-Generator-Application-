import React, { useState } from 'react';
import StoryForm from './components/StoryForm';
import StoryDisplay from './components/StoryDisplay';
import { generateStoryFromAI } from './services/geminiService';
import { StoryParams, GeneratedStory, StoryLanguage } from './types';
import { Sparkles, AlertCircle } from 'lucide-react';

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedStory, setGeneratedStory] = useState<GeneratedStory | null>(null);
  const [currentLang, setCurrentLang] = useState<StoryLanguage>(StoryLanguage.ENGLISH);

  const handleGenerateStory = async (params: StoryParams) => {
    setLoading(true);
    setError(null);
    setGeneratedStory(null);
    setCurrentLang(params.language);

    try {
      const storyText = await generateStoryFromAI(params);
      
      // Attempt to extract title from text if present (simple heuristic based on prompt structure)
      // The prompt asks for [TITLE] then [CONTENT].
      // We will just store the whole text as content for simplicity in display, 
      // but maybe try to infer a title for the filename.
      let title = params.title || "My Story";
      const lines = storyText.split('\n').filter(line => line.trim() !== '');
      if (lines.length > 0 && !params.title) {
         // If user didn't provide title, try to grab the first non-empty line if it looks like a title
         title = lines[0].replace(/\[|\]/g, '').trim(); 
      }

      setGeneratedStory({
        title: title,
        content: storyText,
        timestamp: Date.now()
      });
    } catch (err: any) {
      setError(err.message || "Something went wrong while generating the story.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setGeneratedStory(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900 via-slate-900 to-black text-slate-100 font-sans selection:bg-magic-500 selection:text-white">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-magic-600/20 rounded-full blur-3xl -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl translate-y-1/2"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col min-h-screen">
        
        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-white/5 rounded-full mb-4 border border-white/10 backdrop-blur-sm shadow-xl">
            <Sparkles className="w-6 h-6 text-magic-400 animate-pulse" />
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-magic-200 to-indigo-300 drop-shadow-sm font-serif">
            DreamWeaver AI
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
            Ignite your imagination. Generate unique, captivating stories instantly with the power of artificial intelligence.
          </p>
        </header>

        {/* Main Content Area */}
        <main className="flex-grow w-full max-w-5xl mx-auto transition-all duration-500">
          {error && (
            <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-200 flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}

          <div className="grid grid-cols-1 gap-8">
            {/* If story is generated, show it. Otherwise show form. 
                We keep the form mounted but hidden if we want to preserve state easily, 
                or unmount it. Let's switch views for a cleaner focus mode. 
            */}
            
            {!generatedStory ? (
              <StoryForm onSubmit={handleGenerateStory} isLoading={loading} />
            ) : (
              <StoryDisplay 
                story={generatedStory} 
                onReset={handleReset} 
                language={currentLang}
              />
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-16 text-center text-slate-500 text-sm pb-6">
          <p>© {new Date().getFullYear()} DreamWeaver AI. Powered by Google Gemini.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
