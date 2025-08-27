import * as React from 'react';
import { cn } from '../lib/utils';
import { Button } from './button';

export interface FileUploadProps {
  onFileSelect: (_files: FileList | null) => void;
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in MB
  disabled?: boolean;
  className?: string;
  label?: string;
  description?: string;
  error?: string;
}

const FileUpload = React.forwardRef<HTMLDivElement, FileUploadProps>(
  ({ 
    onFileSelect, 
    accept = '*', 
    multiple = false, 
    maxSize = 10,
    disabled = false,
    className, 
    label = 'Enviar arquivos',
    description = 'Clique ou arraste arquivos aqui',
    error
  }, ref) => {
    const [isDragging, setIsDragging] = React.useState(false);
    const [selectedFiles, setSelectedFiles] = React.useState<File[]>([]);
    const inputRef = React.useRef<HTMLInputElement>(null);

    const handleDragEnter = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!disabled) {
        setIsDragging(true);
      }
    };

    const handleDragLeave = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
    };

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      if (disabled) return;

      const droppedFiles = e.dataTransfer.files;
      handleFiles(droppedFiles);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = e.target.files;
      handleFiles(selectedFiles);
    };

    const handleFiles = (fileList: FileList | null) => {
      if (!fileList) return;

      const validFiles: File[] = [];
      const fileArray = Array.from(fileList);

      for (const file of fileArray) {
        // Check file size
        if (file.size > maxSize * 1024 * 1024) {
          console.warn(`File ${file.name} is too large. Max size: ${maxSize}MB`);
          continue;
        }

        // Check file type
        if (accept !== '*' && !accept.includes(file.type) && !accept.includes(`.${file.name.split('.').pop()}`)) {
          console.warn(`File ${file.name} is not an accepted type.`);
          continue;
        }

        validFiles.push(file);
      }

      if (!multiple && validFiles.length > 1) {
        validFiles.splice(1); // Keep only first file
      }

      setSelectedFiles(validFiles);
      
      // Create FileList-like object
      const dt = new DataTransfer();
      validFiles.forEach(file => dt.items.add(file));
      
      onFileSelect(dt.files);
    };

    const removeFile = (index: number) => {
      const newFiles = selectedFiles.filter((_, i) => i !== index);
      setSelectedFiles(newFiles);
      
      const dt = new DataTransfer();
      newFiles.forEach(file => dt.items.add(file));
      
      onFileSelect(dt.files);
    };

    const formatFileSize = (bytes: number) => {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
      <div ref={ref} className={cn('space-y-4', className)}>
        {label && (
          <label className="text-sm font-medium text-gray-900">
            {label}
          </label>
        )}
        
        <div
          className={cn(
            'relative border-2 border-dashed rounded-lg p-6 transition-all duration-200',
            'cursor-pointer hover:border-blue-400 hover:bg-blue-50/50',
            isDragging && 'border-blue-500 bg-blue-50',
            disabled && 'opacity-50 cursor-not-allowed hover:border-gray-300 hover:bg-transparent',
            error && 'border-red-300',
            !error && !isDragging && 'border-gray-300'
          )}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => !disabled && inputRef.current?.click()}
        >
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            multiple={multiple}
            onChange={handleInputChange}
            disabled={disabled}
            className="hidden"
          />
          
          <div className="text-center">
            <div className={cn(
              'mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-4',
              isDragging ? 'bg-blue-100' : 'bg-gray-100'
            )}>
              <svg 
                className={cn(
                  'w-6 h-6',
                  isDragging ? 'text-blue-600' : 'text-gray-400'
                )} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" 
                />
              </svg>
            </div>
            
            <div className="space-y-1">
              <p className={cn(
                'text-sm font-medium',
                isDragging ? 'text-blue-600' : 'text-gray-900'
              )}>
                {description}
              </p>
              <p className="text-xs text-gray-500">
                ou clique para selecionar
              </p>
              {accept !== '*' && (
                <p className="text-xs text-gray-400">
                  Tipos aceitos: {accept}
                </p>
              )}
              <p className="text-xs text-gray-400">
                Tamanho máximo: {maxSize}MB
              </p>
            </div>
          </div>
        </div>

        {error && (
          <p className="text-sm text-red-600 flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </p>
        )}

        {selectedFiles.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-900">
              Arquivos selecionados:
            </p>
            {selectedFiles.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
);

FileUpload.displayName = 'FileUpload';

export { FileUpload };
