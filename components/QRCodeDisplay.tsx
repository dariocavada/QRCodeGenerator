
import React from 'react';
import type { QRCodeResult } from '../types';
import { DownloadIcon } from './icons';

interface QRCodeDisplayProps {
  result: QRCodeResult;
}

export const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ result }) => {
  
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = result.dataUrl;
    const safeTitle = result.title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    link.download = `${safeTitle || 'qrcode'}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="mt-8 p-6 bg-base-100/50 border border-base-300 rounded-xl animate-[fadeIn_0.5s_ease-out]">
      <div className="flex flex-col items-center gap-6">
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <img
            src={result.dataUrl}
            alt="Generated QR Code"
            className="w-48 h-48 md:w-56 md:h-56 object-contain"
          />
        </div>
        <div className="text-center">
          <h2 className="text-xl font-semibold text-text-primary break-words">
            {result.title}
          </h2>
          <p className="text-sm text-text-secondary break-all mt-1">
            {result.url}
          </p>
        </div>
        <button
          onClick={handleDownload}
          className="w-full flex items-center justify-center gap-2 bg-base-300/80 hover:bg-base-300 text-text-primary font-semibold py-3 px-6 rounded-lg transition-colors duration-300"
        >
          <DownloadIcon className="w-5 h-5" />
          Download PNG
        </button>
      </div>
    </div>
  );
};

// Add CSS keyframes for animations
const style = document.createElement('style');
style.innerHTML = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);
