import { useEffect, useRef, useState } from 'react';
import { pdfjs } from 'react-pdf';
import { getLogger } from '@/helper/logger';

// Set the PDF.js worker source
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PdfToImage = ({ pdfUrl, width, height }) => {
  const logger = getLogger();
  const canvasRef = useRef(null);
  const renderTaskRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const numericWidth = Number(width);
    const numericHeight = Number(height);

    if (
      isNaN(numericWidth) ||
      isNaN(numericHeight) ||
      numericWidth <= 0 ||
      numericHeight <= 0
    ) {
      logger.error('Invalid width or height:', { width, height });
      setError('Invalid dimensions provided');
      setLoading(false);
      return;
    }

    if (!pdfUrl && !pdfUrl.endsWith('.pdf')) {
      logger.warn('Invalid or missing PDF URL:', pdfUrl);
      setError('Please provide a valid PDF URL');
      setLoading(false);
      return;
    }

    const renderPdf = async () => {
      setLoading(true);
      setError(null);

      try {
        logger.info('Fetching PDF from:', pdfUrl);

        const response = await fetch(pdfUrl);
        if (!response.ok) throw new Error('Network response was not ok');

        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);

        const loadingTask = pdfjs.getDocument(blobUrl);
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(1);

        const initialViewport = page.getViewport({ scale: 1 });
        const scale = Math.min(
          numericWidth / initialViewport.width,
          numericHeight / initialViewport.height
        );

        if (scale <= 0) {
          logger.error('Invalid scale calculated:', scale);
          setError('Cannot scale PDF page');
          setLoading(false);
          return;
        }

        const scaledViewport = page.getViewport({ scale });
        const canvas = canvasRef.current;

        if (!canvas) {
          logger.error('Canvas ref is null');
          setError('Canvas unavailable');
          setLoading(false);
          return;
        }

        const context = canvas.getContext('2d');
        if (!context) {
          logger.error('Canvas context is null');
          setError('Canvas context unavailable');
          setLoading(false);
          return;
        }

        canvas.width = Math.max(1, Math.floor(scaledViewport.width));
        canvas.height = Math.max(1, Math.floor(scaledViewport.height));
        logger.info('Canvas dimensions set:', {
          width: canvas.width,
          height: canvas.height,
        });

        context.clearRect(0, 0, canvas.width, canvas.height);

        const renderContext = {
          canvasContext: context,
          viewport: scaledViewport,
        };

        if (renderTaskRef.current) {
          renderTaskRef.current.cancel();
          renderTaskRef.current = null;
        }

        renderTaskRef.current = page.render(renderContext);
        await renderTaskRef.current.promise;
        logger.info('PDF page rendered successfully');
        setLoading(false);
      } catch (error) {
        if (error.name !== 'RenderingCancelledException') {
          logger.error('Error rendering PDF:', error);
          setError('Failed to render PDF: ' + error.message);
        }
        setLoading(false);
      }
    };

    renderPdf();

    return () => {
      if (renderTaskRef.current) {
        renderTaskRef.current.cancel();
        renderTaskRef.current = null;
      }
    };
  }, [pdfUrl, width, height]);

  return (
    <div className={`relative w-[${width}px] h-[${height}px]`}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-700">
          <p>Loading PDF...</p>
        </div>
      )}
      {error && !loading && (
        <div className="absolute inset-0 flex items-center justify-center text-xs text-primary">
          <p>{error}</p>
        </div>
      )}
      <canvas
        ref={canvasRef}
        className={`w-full h-full object-contain rounded-md ${error || loading ? 'hidden' : 'block'}`}
      />
    </div>
  );
};

export default PdfToImage;
