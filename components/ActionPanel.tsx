'use client';

import { Loader2, Archive, FolderOpen, EyeOff, Eye } from 'lucide-react';
import type { Mode } from './ModeSelector';

interface ActionPanelProps {
  mode: Mode;
  hasFile: boolean;
  isProcessing: boolean;
  secretMessage: string;
  onSecretMessageChange: (val: string) => void;
  stegoSubMode: 'hide' | 'extract';
  onStegoSubModeChange: (val: 'hide' | 'extract') => void;
  onProcess: () => void;
}

export default function ActionPanel({
  mode,
  hasFile,
  isProcessing,
  secretMessage,
  onSecretMessageChange,
  stegoSubMode,
  onStegoSubModeChange,
  onProcess,
}: ActionPanelProps) {
  const disabled = !hasFile || isProcessing;

  if (mode === 'compression') {
    return (
      <button
        onClick={onProcess}
        disabled={disabled}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white text-sm font-semibold shadow-lg shadow-blue-500/20 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150"
      >
        {isProcessing ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Archive className="w-4 h-4" />
        )}
        {isProcessing ? 'Compressing...' : 'Compress File'}
      </button>
    );
  }

  if (mode === 'decompression') {
    return (
      <button
        onClick={onProcess}
        disabled={disabled}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white text-sm font-semibold shadow-lg shadow-blue-500/20 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150"
      >
        {isProcessing ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <FolderOpen className="w-4 h-4" />
        )}
        {isProcessing ? 'Restoring...' : 'Restore File'}
      </button>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-1 p-1 rounded-xl bg-[#0B1220] border border-[#1F2A44]">
        <button
          onClick={() => onStegoSubModeChange('hide')}
          className={`flex-1 flex items-center justify-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-150 ${
            stegoSubMode === 'hide'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
              : 'text-[#6B7FA8] hover:text-white hover:bg-[#1F2A44]'
          }`}
        >
          <EyeOff className="w-3.5 h-3.5" />
          Hide Message
        </button>
        <button
          onClick={() => onStegoSubModeChange('extract')}
          className={`flex-1 flex items-center justify-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-150 ${
            stegoSubMode === 'extract'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
              : 'text-[#6B7FA8] hover:text-white hover:bg-[#1F2A44]'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          Extract Message
        </button>
      </div>
      {stegoSubMode === 'hide' && (
        <textarea
          value={secretMessage}
          onChange={(e) => onSecretMessageChange(e.target.value)}
          placeholder="Enter your secret message..."
          rows={3}
          className="w-full rounded-xl border border-[#1F2A44] bg-[#0D1526] text-white text-sm placeholder-[#3A4A6A] px-4 py-3 resize-none outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/20 transition-all duration-150"
        />
      )}
      <button
        onClick={onProcess}
        disabled={disabled || (stegoSubMode === 'hide' && !secretMessage.trim())}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white text-sm font-semibold shadow-lg shadow-blue-500/20 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150"
      >
        {isProcessing ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : stegoSubMode === 'hide' ? (
          <EyeOff className="w-4 h-4" />
        ) : (
          <Eye className="w-4 h-4" />
        )}
        {isProcessing
          ? 'Processing...'
          : stegoSubMode === 'hide'
          ? 'Hide Message'
          : 'Extract Message'}
      </button>
    </div>
  );
}
