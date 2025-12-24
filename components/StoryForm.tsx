import React from 'react';
import { Genre, StoryLength, StoryLanguage, StoryParams } from '../types';
import { Sparkles, BookOpen, Users, Clock, Languages, PenTool } from 'lucide-react';

interface StoryFormProps {
  onSubmit: (params: StoryParams) => void;
  isLoading: boolean;
}

const StoryForm: React.FC<StoryFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = React.useState<StoryParams>({
    title: '',
    genre: Genre.FANTASY,
    characters: 'A brave young explorer and a wise old owl',
    length: StoryLength.SHORT,
    language: StoryLanguage.ENGLISH,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 md:p-8 rounded-2xl shadow-xl">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-magic-300">
        <PenTool className="w-6 h-6" />
        <span>Craft Your Tale</span>
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
            <BookOpen className="w-4 h-4 text-magic-400" />
            Story Title (Optional)
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. The Mystery of the Lost Key"
            className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-magic-500 focus:border-transparent transition-all outline-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Genre */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
              <Sparkles className="w-4 h-4 text-magic-400" />
              Genre
            </label>
            <div className="relative">
              <select
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                className="w-full appearance-none bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-magic-500 outline-none cursor-pointer"
              >
                {Object.values(Genre).map(g => (
                  <option key={g} value={g} className="bg-slate-800 text-white">{g}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-gray-400">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
              </div>
            </div>
          </div>

          {/* Language */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
              <Languages className="w-4 h-4 text-magic-400" />
              Language
            </label>
            <div className="relative">
              <select
                name="language"
                value={formData.language}
                onChange={handleChange}
                className="w-full appearance-none bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-magic-500 outline-none cursor-pointer"
              >
                {Object.values(StoryLanguage).map(l => (
                  <option key={l} value={l} className="bg-slate-800 text-white">{l}</option>
                ))}
              </select>
               <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-gray-400">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
              </div>
            </div>
          </div>
        </div>

        {/* Characters */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
            <Users className="w-4 h-4 text-magic-400" />
            Main Characters
          </label>
          <textarea
            name="characters"
            value={formData.characters}
            onChange={handleChange}
            rows={2}
            className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-magic-500 outline-none resize-none"
            placeholder="Describe the protagonists, antagonists, or sidekicks..."
          />
        </div>

        {/* Length */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
            <Clock className="w-4 h-4 text-magic-400" />
            Story Length
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {Object.values(StoryLength).map((len) => (
              <label
                key={len}
                className={`
                  relative flex items-center justify-center px-4 py-3 rounded-lg border cursor-pointer transition-all
                  ${formData.length === len 
                    ? 'bg-magic-600/20 border-magic-500 text-white shadow-[0_0_15px_rgba(124,58,237,0.3)]' 
                    : 'bg-slate-800/30 border-slate-700 text-gray-400 hover:bg-slate-800/50 hover:border-slate-600'}
                `}
              >
                <input
                  type="radio"
                  name="length"
                  value={len}
                  checked={formData.length === len}
                  onChange={handleChange}
                  className="sr-only"
                />
                <span className="text-sm font-medium text-center">{len.split(' ')[0]}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`
            w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-lg text-white shadow-lg transition-all transform hover:scale-[1.01] active:scale-[0.99]
            ${isLoading 
              ? 'bg-slate-700 cursor-not-allowed opacity-70' 
              : 'bg-gradient-to-r from-magic-600 to-indigo-600 hover:from-magic-500 hover:to-indigo-500 shadow-magic-600/25'}
          `}
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Weaving Story...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              <span>Generate Story</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default StoryForm;
