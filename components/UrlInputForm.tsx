
import React from 'react';
import { LinkIcon, WandIcon } from './icons';

interface UrlInputFormProps {
  url: string;
  setUrl: (url: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const UrlInputForm: React.FC<UrlInputFormProps> = ({ url, setUrl, onSubmit, isLoading }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-grow">
        <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://google.com"
          className="w-full pl-10 pr-4 py-3 bg-base-100 border border-base-300 rounded-lg text-text-primary focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all duration-300"
          disabled={isLoading}
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="flex items-center justify-center gap-2 bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        <WandIcon className="w-5 h-5" />
        {isLoading ? 'Generating...' : 'Generate'}
      </button>
    </form>
  );
};
