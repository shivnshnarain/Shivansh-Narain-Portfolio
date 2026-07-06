import { useState, useEffect, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

// Set up the worker using local Vite URL to avoid CORS/CDN issues
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

export default function PdfViewer({ file }) {
  const [numPages, setNumPages] = useState(null);
  const [scale, setScale] = useState(1.0);
  const [pdfBlobUrl, setPdfBlobUrl] = useState(null);
  const [activePage, setActivePage] = useState(1);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    // Mobile browsers (especially iOS Safari) can fail when using fetch() and URL.createObjectURL()
    // for large PDFs due to memory limits or security restrictions.
    // Instead of downloading it to a blob first, we just pass the file URL directly to react-pdf.
    setPdfBlobUrl(file);
  }, [file]);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const zoomIn = () => setScale(prev => Math.min(prev + 0.2, 3.0));
  const zoomOut = () => setScale(prev => Math.max(prev - 0.2, 0.5));

  const scrollToPage = (pageIndex) => {
    setActivePage(pageIndex + 1);
    const pageEl = document.getElementById(`pdf-page-${pageIndex + 1}`);
    if (pageEl && scrollContainerRef.current) {
      pageEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="custom-pdf-viewer">
      <div className="pdf-toolbar">
        <div className="pdf-controls">
          <span className="pdf-page-info">
            {numPages ? `${numPages} Pages Document` : 'Loading Secure Viewer...'}
          </span>
        </div>
        <div className="pdf-controls">
          <button onClick={zoomOut} className="pdf-btn">-</button>
          <span className="pdf-zoom-info">{Math.round(scale * 100)}%</span>
          <button onClick={zoomIn} className="pdf-btn">+</button>
        </div>
      </div>
      
      <div 
        className="pdf-main-area protected-pdf"
        onContextMenu={(e) => e.preventDefault()} 
        onDragStart={(e) => e.preventDefault()}
        onCopy={(e) => e.preventDefault()}
      >
        {pdfBlobUrl ? (
          <Document
            file={pdfBlobUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            className="pdf-document-wrapper"
            loading={<div className="pdf-loading">Loading Protected Document...</div>}
          >
            {/* Sidebar for thumbnails */}
            <div className="pdf-sidebar">
              {Array.from(new Array(numPages), (el, index) => (
                <div 
                  key={`thumb_${index + 1}`} 
                  className={`pdf-thumbnail-wrap ${activePage === index + 1 ? 'active' : ''}`}
                  onClick={() => scrollToPage(index)}
                >
                  <Page 
                    pageNumber={index + 1} 
                    width={100}
                    renderTextLayer={false} 
                    renderAnnotationLayer={false} 
                    className="pdf-thumbnail-page"
                  />
                  <span className="pdf-thumb-num">{index + 1}</span>
                </div>
              ))}
            </div>

            {/* Main scrollable area */}
            <div className="pdf-document-container" ref={scrollContainerRef}>
              <div className="pdf-pages-scroll-container">
                {Array.from(new Array(numPages), (el, index) => (
                  <div className="pdf-page-wrapper" id={`pdf-page-${index + 1}`} key={`page_${index + 1}`}>
                    <Page 
                      pageNumber={index + 1} 
                      scale={scale} 
                      renderTextLayer={false} 
                      renderAnnotationLayer={false} 
                      className="pdf-page"
                    />
                    {/* The Mandatory Watermark */}
                    <div className="pdf-watermark-overlay"></div>
                  </div>
                ))}
              </div>
            </div>
          </Document>
        ) : (
          <div className="pdf-loading">Initializing Secure Viewer...</div>
        )}
      </div>
    </div>
  );
}
