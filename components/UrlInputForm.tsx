
import React, { useRef } from 'react';
import { LinkIcon, WandIcon, UploadIcon, XIcon } from './icons';

interface UrlInputFormProps {
  url: string;
  setUrl: (url: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  logo: string | null;
  onLogoChange: (file: File | null) => void;
}

export const UrlInputForm: React.FC<UrlInputFormProps> = ({ url, setUrl, onSubmit, isLoading, logo, onLogoChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    onLogoChange(file || null);
    // Reset file input to allow re-uploading the same file
    if (e.target) {
        e.target.value = '';
    }
  };

  const handleRemoveLogo = () => {
    onLogoChange(null);
  };

  return (
    <>
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

      <div className="mt-4">
        {logo ? (
          <div className="p-2 bg-base-100/50 rounded-lg flex items-center justify-between animate-[fadeIn_0.3s_ease-out]">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Logo preview" className="w-10 h-10 rounded object-cover border-2 border-base-300" />
              <span className="text-sm text-text-secondary font-medium">Logo ready</span>
            </div>
            <button
              onClick={handleRemoveLogo}
              className="p-1.5 rounded-full hover:bg-base-300 text-text-secondary hover:text-text-primary transition-colors"
              aria-label="Remove logo"
            >
              <XIcon className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <>
            <input
              type="file"
              accept="image/png, image/jpeg, image/svg+xml"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={handleUploadClick}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-base-300 hover:border-brand-primary/80 text-text-secondary hover:text-text-primary font-medium py-2 px-4 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <UploadIcon className="w-5 h-5" />
              Add a Logo (Optional)
            </button>
          </>
        )}
      </div>
    </>
  );
};
