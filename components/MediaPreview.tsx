'use client';

import type { UploadedFile } from './UploadDropzone';

interface MediaPreviewProps {
  uploadedFile: UploadedFile;
}

export default function MediaPreview({ uploadedFile }: MediaPreviewProps) {
  const { type, url, name } = uploadedFile;

  if (type.startsWith('image/')) {
    return (
      <div className="rounded-xl border border-[#1F2A44] bg-[#111A2E] overflow-hidden">
        <div className="px-4 py-3 border-b border-[#1F2A44] flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
          </div>
          <span className="text-xs text-[#4A5578] ml-1 truncate">{name}</span>
        </div>
        <div className="p-3">
          <img
            src={url}
            alt={name}
            className="w-full h-auto max-h-64 object-contain rounded-lg"
          />
        </div>
      </div>
    );
  }

  if (type.startsWith('video/')) {
    return (
      <div className="rounded-xl border border-[#1F2A44] bg-[#111A2E] overflow-hidden">
        <div className="px-4 py-3 border-b border-[#1F2A44] flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
          </div>
          <span className="text-xs text-[#4A5578] ml-1 truncate">{name}</span>
        </div>
        <div className="p-3">
          <video
            src={url}
            controls
            className="w-full rounded-lg max-h-64 bg-black"
          />
        </div>
      </div>
    );
  }

  if (type.startsWith('audio/')) {
    return (
      <div className="rounded-xl border border-[#1F2A44] bg-[#111A2E] p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
          </div>
          <span className="text-xs text-[#4A5578] ml-1 truncate">{name}</span>
        </div>
        <audio
          src={url}
          controls
          className="w-full"
          style={{ colorScheme: 'dark' }}
        />
      </div>
    );
  }

  return null;
}
