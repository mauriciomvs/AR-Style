'use client';

import { useState, useRef } from 'react';
import { Upload, Shirt, ArrowRight, Sparkles, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ClothingItem } from '@/lib/types';
import { detectClothingType, getPopularClothing } from '@/lib/ar-utils';

interface ClothingUploadProps {
  onClothingSelected: (clothing: ClothingItem) => void;
  onBack: () => void;
}

export default function ClothingUpload({ onClothingSelected, onBack }: ClothingUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [detectedType, setDetectedType] = useState<ClothingItem['category'] | null>(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const [showPopular, setShowPopular] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const popularClothing = getPopularClothing();

  const handleFileSelect = async (file: File) => {
    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setShowPopular(false);
    
    // Detectar tipo de roupa
    setIsDetecting(true);
    try {
      const type = await detectClothingType(file);
      setDetectedType(type);
    } catch (error) {
      console.error('Erro ao detectar tipo de roupa:', error);
    } finally {
      setIsDetecting(false);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleContinue = () => {
    if (selectedFile && detectedType) {
      const clothingItem: ClothingItem = {
        id: Date.now().toString(),
        name: `${getTypeLabel(detectedType)} Personalizada`,
        category: detectedType,
        imageUrl: previewUrl!
      };
      onClothingSelected(clothingItem);
    }
  };

  const handlePopularSelect = (item: ClothingItem) => {
    onClothingSelected(item);
  };

  const getTypeLabel = (type: ClothingItem['category']): string => {
    const labels = {
      shirt: 'Camisa',
      pants: 'Calça',
      dress: 'Vestido',
      jacket: 'Jaqueta',
      shoes: 'Sapato',
      accessories: 'Acessório'
    };
    return labels[type];
  };

  const getTypeColor = (type: ClothingItem['category']): string => {
    const colors = {
      shirt: 'bg-blue-100 text-blue-700',
      pants: 'bg-green-100 text-green-700',
      dress: 'bg-pink-100 text-pink-700',
      jacket: 'bg-purple-100 text-purple-700',
      shoes: 'bg-orange-100 text-orange-700',
      accessories: 'bg-yellow-100 text-yellow-700'
    };
    return colors[type];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-slate-100 p-4">
      <div className="max-w-4xl mx-auto pt-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Escolha a roupa</h1>
          <p className="text-gray-600">
            Envie uma foto da roupa ou escolha uma das opções populares
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <Card className="p-6 bg-white/80 backdrop-blur-sm border-purple-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Upload className="w-5 h-5 mr-2 text-purple-600" />
              Enviar Roupa
            </h2>

            {!previewUrl ? (
              <div
                className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-purple-300 hover:bg-purple-25 transition-all duration-300 cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl w-fit mx-auto">
                    <Shirt className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">
                      Adicionar Roupa
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Clique para selecionar uma imagem da roupa
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative">
                  <img
                    src={previewUrl}
                    alt="Roupa selecionada"
                    className="w-full max-w-sm mx-auto rounded-2xl shadow-lg"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setPreviewUrl(null);
                      setSelectedFile(null);
                      setDetectedType(null);
                      setShowPopular(true);
                    }}
                    className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm"
                  >
                    Trocar
                  </Button>
                </div>

                {/* Detection Result */}
                {isDetecting ? (
                  <div className="flex items-center justify-center space-x-2 p-4 bg-purple-50 rounded-xl">
                    <Sparkles className="w-5 h-5 text-purple-600 animate-spin" />
                    <span className="text-purple-700 font-medium">Analisando roupa...</span>
                  </div>
                ) : detectedType ? (
                  <div className="flex items-center justify-center space-x-2 p-4 bg-green-50 rounded-xl border border-green-200">
                    <Tag className="w-5 h-5 text-green-600" />
                    <span className="text-green-700 font-medium">Detectado:</span>
                    <Badge className={getTypeColor(detectedType)}>
                      {getTypeLabel(detectedType)}
                    </Badge>
                  </div>
                )}
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileInputChange}
              className="hidden"
            />
          </Card>

          {/* Popular Clothing */}
          {showPopular && (
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-purple-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <Sparkles className="w-5 h-5 mr-2 text-purple-600" />
                Roupas Populares
              </h2>

              <div className="grid grid-cols-2 gap-4">
                {popularClothing.map((item) => (
                  <div
                    key={item.id}
                    className="group cursor-pointer"
                    onClick={() => handlePopularSelect(item)}
                  >
                    <div className="relative overflow-hidden rounded-xl bg-gray-100 aspect-[3/4] mb-3">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                      <div className="absolute top-2 right-2">
                        <Badge className={getTypeColor(item.category)}>
                          {getTypeLabel(item.category)}
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-medium text-gray-800 text-sm group-hover:text-purple-600 transition-colors">
                        {item.name}
                      </h3>
                      {item.brand && (
                        <p className="text-xs text-gray-500">{item.brand}</p>
                      )}
                      {item.price && (
                        <p className="text-sm font-semibold text-purple-600">
                          R$ {item.price.toFixed(2)}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>

        {/* Tips */}
        <Card className="mt-8 p-6 bg-blue-50 border-blue-200">
          <h4 className="font-semibold text-blue-800 mb-3">💡 Dicas para melhor resultado:</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-700">
            <ul className="space-y-1">
              <li>• Use fotos com boa qualidade e iluminação</li>
              <li>• Prefira roupas em fundo neutro</li>
              <li>• Evite roupas muito amassadas</li>
            </ul>
            <ul className="space-y-1">
              <li>• Fotos de frente funcionam melhor</li>
              <li>• Nossa IA reconhece automaticamente o tipo</li>
              <li>• Você pode ajustar manualmente depois</li>
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
            disabled={!selectedFile || !detectedType}
            className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white disabled:opacity-50"
          >
            Processar com IA
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}