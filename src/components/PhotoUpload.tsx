'use client';

import { useState, useRef } from 'react';
import { Camera, Upload, ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { validateUserPhoto } from '@/lib/ar-utils';

interface PhotoUploadProps {
  onPhotoSelected: (file: File) => void;
  onBack: () => void;
}

export default function PhotoUpload({ onPhotoSelected, onBack }: PhotoUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [validation, setValidation] = useState<{ valid: boolean; message: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    const validationResult = validateUserPhoto(file);
    setValidation(validationResult);
    
    if (validationResult.valid) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleContinue = () => {
    if (selectedFile && validation?.valid) {
      onPhotoSelected(selectedFile);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-slate-100 p-4">
      <div className="max-w-2xl mx-auto pt-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Envie sua foto</h1>
          <p className="text-gray-600">
            Use boa iluminação e tire a foto de frente para obter o melhor resultado
          </p>
        </div>

        {/* Upload Area */}
        <Card className="p-8 bg-white/80 backdrop-blur-sm border-purple-200">
          {!previewUrl ? (
            <div
              className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
                dragActive 
                  ? 'border-purple-400 bg-purple-50' 
                  : 'border-gray-300 hover:border-purple-300 hover:bg-purple-25'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="space-y-6">
                <div className="flex justify-center space-x-4">
                  <div className="p-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl">
                    <Upload className="w-8 h-8 text-white" />
                  </div>
                  <div className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl">
                    <Camera className="w-8 h-8 text-white" />
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Adicione sua foto
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Arraste e solte uma imagem ou clique para selecionar
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Escolher da Galeria
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => cameraInputRef.current?.click()}
                    className="border-purple-200 hover:bg-purple-50"
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Tirar Foto
                  </Button>
                </div>

                <p className="text-xs text-gray-500">
                  Formatos suportados: JPG, PNG, WEBP • Máximo 10MB
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Preview */}
              <div className="relative">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full max-w-md mx-auto rounded-2xl shadow-lg"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setPreviewUrl(null);
                    setSelectedFile(null);
                    setValidation(null);
                  }}
                  className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm"
                >
                  Trocar Foto
                </Button>
              </div>

              {/* Validation Message */}
              {validation && (
                <div className={`flex items-center space-x-2 p-4 rounded-xl ${
                  validation.valid 
                    ? 'bg-green-50 text-green-700 border border-green-200' 
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}>
                  {validation.valid ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <AlertCircle className="w-5 h-5" />
                  )}
                  <span className="font-medium">{validation.message}</span>
                </div>
              )}
            </div>
          )}

          {/* Tips */}
          <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-3">💡 Dicas para melhor resultado:</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Use boa iluminação natural ou artificial</li>
              <li>• Fique de frente para a câmera</li>
              <li>• Mantenha os braços ligeiramente afastados do corpo</li>
              <li>• Use roupas justas para melhor detecção</li>
              <li>• Evite fundos muito bagunçados</li>
            </ul>
          </div>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <Button
            variant="outline"
            onClick={onBack}
            className="border-purple-200 hover:bg-purple-50"
          >
            Voltar
          </Button>
          
          <Button
            onClick={handleContinue}
            disabled={!selectedFile || !validation?.valid}
            className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white disabled:opacity-50"
          >
            Continuar
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Hidden file inputs */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileInputChange}
          className="hidden"
        />
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="user"
          onChange={handleFileInputChange}
          className="hidden"
        />
      </div>
    </div>
  );
}