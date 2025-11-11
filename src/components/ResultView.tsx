'use client';

import { useState } from 'react';
import { 
  Download, 
  Share2, 
  Heart, 
  RotateCcw, 
  Save, 
  Shirt, 
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TryOnResult } from '@/lib/types';
import { downloadImage } from '@/lib/ar-utils';
import { toast } from 'sonner';

interface ResultViewProps {
  result: TryOnResult;
  onTryAnother: () => void;
  onSaveToGallery: (result: TryOnResult) => void;
}

export default function ResultView({ result, onTryAnother, onSaveToGallery }: ResultViewProps) {
  const [showComparison, setShowComparison] = useState(false);
  const [isLiked, setIsLiked] = useState(result.liked);
  const [isSaved, setIsSaved] = useState(false);

  const handleDownload = (transparent: boolean = false) => {
    const url = transparent ? result.transparentResultUrl! : result.resultImageUrl;
    const filename = `ar-style-look-${result.id}`;
    downloadImage(url, filename, transparent);
    
    toast.success(
      transparent 
        ? 'Download iniciado! Imagem com fundo transparente.' 
        : 'Download iniciado! Imagem salva com sucesso.'
    );
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Meu look no AR Style',
          text: 'Veja como ficou incrível! Criado com AR Style - IA e Realidade Aumentada',
          url: result.resultImageUrl
        });
      } catch (error) {
        // Fallback para cópia do link
        navigator.clipboard.writeText(result.resultImageUrl);
        toast.success('Link copiado para a área de transferência!');
      }
    } else {
      navigator.clipboard.writeText(result.resultImageUrl);
      toast.success('Link copiado para a área de transferência!');
    }
  };

  const handleSave = () => {
    onSaveToGallery(result);
    setIsSaved(true);
    toast.success('Look salvo na sua galeria!');
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    toast.success(isLiked ? 'Removido dos favoritos' : 'Adicionado aos favoritos!');
  };

  const getTypeLabel = (category: string): string => {
    const labels: Record<string, string> = {
      shirt: 'Camisa',
      pants: 'Calça',
      dress: 'Vestido',
      jacket: 'Jaqueta',
      shoes: 'Sapato',
      accessories: 'Acessório'
    };
    return labels[category] || category;
  };

  const getTypeColor = (category: string): string => {
    const colors: Record<string, string> = {
      shirt: 'bg-blue-100 text-blue-700',
      pants: 'bg-green-100 text-green-700',
      dress: 'bg-pink-100 text-pink-700',
      jacket: 'bg-purple-100 text-purple-700',
      shoes: 'bg-orange-100 text-orange-700',
      accessories: 'bg-yellow-100 text-yellow-700'
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-slate-100 p-4">
      <div className="max-w-6xl mx-auto pt-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Seu Look Está Pronto!</h1>
          </div>
          <p className="text-gray-600">
            Veja como ficou incrível! Baixe, compartilhe ou experimente outras roupas.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Result */}
          <div className="lg:col-span-2">
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-purple-200">
              {!showComparison ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                      <Sparkles className="w-5 h-5 mr-2 text-purple-600" />
                      Resultado Final
                    </h2>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowComparison(true)}
                      className="border-purple-200 hover:bg-purple-50"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Comparar
                    </Button>
                  </div>

                  <div className="relative">
                    <img
                      src={result.resultImageUrl}
                      alt="Resultado do try-on"
                      className="w-full max-w-lg mx-auto rounded-2xl shadow-2xl"
                    />
                    
                    {/* Clothing Info Overlay */}
                    <div className="absolute top-4 left-4">
                      <Badge className={getTypeColor(result.clothingItem.category)}>
                        {getTypeLabel(result.clothingItem.category)}
                      </Badge>
                    </div>

                    {/* Like Button */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleLike}
                      className={`absolute top-4 right-4 bg-white/80 backdrop-blur-sm ${
                        isLiked ? 'text-red-500 border-red-200' : 'border-gray-200'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-800">
                      Antes vs Depois
                    </h2>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowComparison(false)}
                      className="border-purple-200 hover:bg-purple-50"
                    >
                      Resultado
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h3 className="font-medium text-gray-700 text-center">Antes</h3>
                      <img
                        src={result.originalPhotoUrl}
                        alt="Foto original"
                        className="w-full rounded-xl shadow-lg"
                      />
                    </div>
                    <div className="space-y-3">
                      <h3 className="font-medium text-gray-700 text-center">Depois</h3>
                      <img
                        src={result.resultImageUrl}
                        alt="Com a roupa"
                        className="w-full rounded-xl shadow-lg"
                      />
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </div>

          {/* Actions Panel */}
          <div className="space-y-6">
            {/* Download Options */}
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-purple-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Download className="w-5 h-5 mr-2 text-purple-600" />
                Download
              </h3>
              
              <div className="space-y-3">
                <Button
                  onClick={() => handleDownload(false)}
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Baixar Imagem (JPG)
                </Button>
                
                <Button
                  onClick={() => handleDownload(true)}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Fundo Transparente (PNG)
                </Button>
              </div>

              <p className="text-xs text-gray-500 mt-3">
                PNG transparente é ideal para catálogos e edições
              </p>
            </Card>

            {/* Actions */}
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-purple-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Ações</h3>
              
              <div className="space-y-3">
                <Button
                  onClick={handleSave}
                  disabled={isSaved}
                  variant="outline"
                  className="w-full border-purple-200 hover:bg-purple-50"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isSaved ? 'Salvo na Galeria' : 'Salvar na Galeria'}
                </Button>
                
                <Button
                  onClick={handleShare}
                  variant="outline"
                  className="w-full border-purple-200 hover:bg-purple-50"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Compartilhar
                </Button>
                
                <Button
                  onClick={onTryAnother}
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white"
                >
                  <Shirt className="w-4 h-4 mr-2" />
                  Testar Outra Roupa
                </Button>
              </div>
            </Card>

            {/* Clothing Details */}
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-purple-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Detalhes da Roupa</h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={result.clothingItem.imageUrl}
                    alt={result.clothingItem.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800">
                      {result.clothingItem.name}
                    </h4>
                    {result.clothingItem.brand && (
                      <p className="text-sm text-gray-600">
                        {result.clothingItem.brand}
                      </p>
                    )}
                    {result.clothingItem.price && (
                      <p className="text-sm font-semibold text-purple-600">
                        R$ {result.clothingItem.price.toFixed(2)}
                      </p>
                    )}
                  </div>
                </div>
                
                <Badge className={getTypeColor(result.clothingItem.category)}>
                  {getTypeLabel(result.clothingItem.category)}
                </Badge>
              </div>
            </Card>

            {/* Tips */}
            <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-3">💡 Próximos Passos</h4>
              <ul className="text-sm text-blue-700 space-y-2">
                <li>• Experimente diferentes roupas</li>
                <li>• Salve seus looks favoritos</li>
                <li>• Compartilhe com amigos</li>
                <li>• Use PNG transparente para edições</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}