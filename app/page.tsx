'use client';

import { useState, useCallback } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ModeSelector, { type Mode } from '@/components/ModeSelector';
import UploadDropzone, { type UploadedFile } from '@/components/UploadDropzone';
import ActionPanel from '@/components/ActionPanel';
import ResultCards, { type ProcessingResult } from '@/components/ResultCards';
import MediaPreview from '@/components/MediaPreview';

export default function Home() {
  const [mode, setMode] = useState<Mode>('compression');
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<ProcessingResult | null>(null);
  const [secretMessage, setSecretMessage] = useState('');
  const [stegoSubMode, setStegoSubMode] = useState<'hide' | 'extract'>('hide');

  const handleFileUpload = useCallback((file: UploadedFile) => {
    setUploadedFile(file);
    setResult(null);
  }, []);

  const handleClear = useCallback(() => {
    if (uploadedFile?.url) URL.revokeObjectURL(uploadedFile.url);
    setUploadedFile(null);
    setResult(null);
    setSecretMessage('');
  }, [uploadedFile]);

  const handleModeChange = (newMode: Mode) => {
    setMode(newMode);
    setResult(null);
    setSecretMessage('');
    setStegoSubMode('hide');
  };

  const handleProcess = async () => {
    if (!uploadedFile || uploadedFile.status !== 'complete') return;
    setIsProcessing(true);
    setResult(null);

    const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));
    await delay(600 + Math.random() * 800);

    const originalSize = uploadedFile.size;
    const start = Date.now();

    if (mode === 'compression') {
      const processedSize = Math.floor(originalSize * (0.3 + Math.random() * 0.3));
      const ratio = Math.round(((originalSize - processedSize) / originalSize) * 100);
      const processingTime = Date.now() - start + Math.floor(Math.random() * 500 + 200);
      setResult({
        originalSize,
        processedSize,
        ratio,
        processingTime,
        mode,
        processedUrl: uploadedFile.url,
        processedName: `compressed_${uploadedFile.name}`,
      });
    } else if (mode === 'decompression') {
      const processedSize = Math.floor(originalSize * (1.4 + Math.random() * 0.6));
      const ratio = Math.round(((processedSize - originalSize) / originalSize) * 100);
      const processingTime = Date.now() - start + Math.floor(Math.random() * 400 + 100);
      setResult({
        originalSize,
        processedSize,
        ratio,
        processingTime,
        mode,
        processedUrl: uploadedFile.url,
        processedName: `restored_${uploadedFile.name}`,
      });
    } else {
      const processingTime = Date.now() - start + Math.floor(Math.random() * 300 + 100);
      if (stegoSubMode === 'hide') {
        setResult({
          originalSize,
          processedSize: originalSize,
          ratio: 0,
          processingTime,
          mode,
          stegoStatus: 'success',
          processedUrl: uploadedFile.url,
          processedName: `stego_${uploadedFile.name}`,
        });
      } else {
        setResult({
          originalSize,
          processedSize: originalSize,
          ratio: 0,
          processingTime,
          mode,
          stegoStatus: 'success',
          extractedMessage: 'This is a demo extraction. In a real implementation, LSB decoding would retrieve the hidden message from the media file.',
        });
      }
    }

    setIsProcessing(false);
  };

  const showMediaPreview = uploadedFile?.status === 'complete' && (
    uploadedFile.type.startsWith('image/') ||
    uploadedFile.type.startsWith('video/') ||
    uploadedFile.type.startsWith('audio/')
  );

  return (
    <div className="min-h-screen bg-[#0B1220] text-white">
      
      <Header />

      <main className="max-w-2xl mx-auto px-4 py-10 flex flex-col gap-5">
        {/* Mode Selector */}
        <ModeSelector mode={mode} onChange={handleModeChange} />

        {/* Upload Section */}
        <div className="rounded-2xl border border-[#1F2A44] bg-[#111A2E] p-5 flex flex-col gap-4">
          <UploadDropzone
            uploadedFile={uploadedFile}
            onFileUpload={handleFileUpload}
            onClear={handleClear}
          />

          {/* Action Panel — only shows when file is uploaded */}
          {uploadedFile && uploadedFile.status === 'complete' && (
            <div className="animate-fadeIn">
              <ActionPanel
                mode={mode}
                hasFile={uploadedFile.status === 'complete'}
                isProcessing={isProcessing}
                secretMessage={secretMessage}
                onSecretMessageChange={setSecretMessage}
                stegoSubMode={stegoSubMode}
                onStegoSubModeChange={setStegoSubMode}
                onProcess={handleProcess}
              />
            </div>
          )}
        </div>

        {/* Processing skeleton */}
        {isProcessing && (
          <div className="rounded-xl border border-[#1F2A44] bg-[#111A2E] p-5 animate-pulse">
            <div className="h-4 w-36 rounded bg-[#1F2A44] mb-4" />
            <div className="grid grid-cols-4 gap-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="rounded-xl border border-[#1F2A44] bg-[#0D1526] px-4 py-3">
                  <div className="h-3 w-12 rounded bg-[#1F2A44] mb-3" />
                  <div className="h-5 w-16 rounded bg-[#1F2A44]" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Result Cards */}
        {result && !isProcessing && <ResultCards result={result} />}

        {/* Media Preview */}
        {showMediaPreview && !isProcessing && (
          <MediaPreview uploadedFile={uploadedFile!} />
        )}

        {/* Empty state hint */}
        {!uploadedFile && (
          <p className="text-center text-xs text-[#2D3A5A] mt-2">
            Upload a file above to get started
          </p>
        )}
      </main>
      <Footer />
      </div>
    
  );
}
