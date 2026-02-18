import { useEffect } from 'react';

interface PdfModalProps {
  pdfUrl: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function PdfModal({ pdfUrl, title, isOpen, onClose }: PdfModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative w-full h-full md:w-[90vw] md:h-[90vh] md:rounded-lg overflow-hidden bg-white flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-3 bg-cncf-navy text-white shrink-0">
          <h2 className="text-sm font-medium truncate">{title}</h2>
          <div className="flex items-center gap-2">
            <a
              href={pdfUrl}
              download
              className="text-xs bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded transition-colors"
            >
              Download
            </a>
            <button
              onClick={onClose}
              className="p-1 hover:bg-white/20 rounded transition-colors"
              aria-label="Close PDF viewer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        <iframe
          src={pdfUrl}
          className="flex-1 w-full"
          title={`${title} PDF`}
        />
      </div>
    </div>
  );
}
