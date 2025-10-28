
import React, { useState, useCallback } from 'react';
import qrcode from 'qrcode';
import { UrlInputForm } from './components/UrlInputForm';
import { QRCodeDisplay } from './components/QRCodeDisplay';
import { fetchPageTitle } from './services/geminiService';
import type { QRCodeResult } from './types';
import { GithubIcon, SparklesIcon } from './components/icons';

const App: React.FC = () => {
  const [url, setUrl] = useState<string>('');
  const [qrCodeResult, setQrCodeResult] = useState<QRCodeResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const isValidUrl = (urlString: string): boolean => {
    try {
      new URL(urlString);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleGenerate = useCallback(async () => {
    if (!url) {
      setError('Please enter a URL.');
      return;
    }

    if (!isValidUrl(url)) {
      setError('Please enter a valid URL (e.g., https://example.com).');
      return;
    }

    setIsLoading(true);
    setError(null);
    setQrCodeResult(null);

    try {
      const [dataUrl, title] = await Promise.all([
        qrcode.toDataURL(url, {
          errorCorrectionLevel: 'H',
          margin: 2,
          width: 512,
          color: {
            dark: '#000000',
            light: '#FFFFFF',
          },
        }),
        fetchPageTitle(url),
      ]);
      
      setQrCodeResult({ dataUrl, title, url });
    } catch (err) {
      console.error(err);
      setError('Failed to generate QR code or fetch title. Please check the URL and try again.');
    } finally {
      setIsLoading(false);
    }
  }, [url]);

  return (
    <div className="min-h-screen bg-base-100 text-text-primary flex flex-col items-center justify-center p-4 font-sans relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,_rgba(79,70,229,0.5)_0%,_rgba(124,58,237,0)_50%)] animate-[spin_20s_linear_infinite]"></div>
      </div>

      <main className="w-full max-w-lg mx-auto z-10">
        <div className="bg-base-200/80 backdrop-blur-sm border border-base-300 rounded-2xl shadow-2xl p-6 md:p-8 text-center">
          <div className="flex justify-center items-center gap-2 mb-2">
            <SparklesIcon className="w-8 h-8 text-brand-secondary" />
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-brand-primary to-brand-secondary text-transparent bg-clip-text">
              AI QR Code Generator
            </h1>
          </div>
          <p className="text-text-secondary mb-6">
            Instantly generate a QR code and let AI fetch the webpage title for you.
          </p>
          
          <UrlInputForm
            url={url}
            setUrl={setUrl}
            onSubmit={handleGenerate}
            isLoading={isLoading}
          />

          {isLoading && (
            <div className="mt-8 flex flex-col items-center justify-center space-y-4">
              <div className="w-12 h-12 border-4 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
              <p className="text-text-secondary animate-pulse">Generating... AI is reading the page title...</p>
            </div>
          )}

          {error && (
            <div className="mt-6 bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-sm" role="alert">
              <p>{error}</p>
            </div>
          )}
          
          {qrCodeResult && !isLoading && (
            <QRCodeDisplay result={qrCodeResult} />
          )}
        </div>
      </main>
      
      <footer className="absolute bottom-4 text-center text-sm text-text-secondary/50 z-10">
        <a href="https://github.com/your-repo" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-text-secondary transition-colors">
          <GithubIcon className="w-4 h-4" />
          <span>View on GitHub</span>
        </a>
      </footer>
    </div>
  );
};

export default App;
