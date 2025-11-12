'use client';

import { useState } from 'react';
import { 
  Download, 
  Trash2, 
  Heart, 
  Share2, 
  Search,
  Filter,
  Grid3X3,
  List,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { GalleryItem } from '@/lib/types';
import { downloadImage } from '@/lib/ar-utils';
import { toast } from 'sonner';

interface GalleryTabProps {
  galleryItems: GalleryItem[];
  onDeleteItem: (id: string) => void;
}

export default function GalleryTab({ galleryItems, onDeleteItem }: GalleryTabProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'favorites'>('all');

  const filteredItems = galleryItems.filter(item => {
    const matchesSearch = item.clothingItem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = selectedFilter === 'all' || (selectedFilter === 'favorites' && item.liked);
    return matchesSearch && matchesFilter;
  });

  const handleDownload = (item: GalleryItem, transparent: boolean = false) => {
    const url = transparent ? item.transparentResultUrl! : item.resultImageUrl;
    const filename = `ar-style-${item.id}`;
    downloadImage(url, filename, transparent);
    
    toast.success(
      transparent 
        ? 'Download iniciado! Imagem com fundo transparente.' 
        : 'Download iniciado! Imagem salva com sucesso.'
    );
  };

  const handleShare = async (item: GalleryItem) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Meu look no AR Style - ${item.clothingItem.name}`,
          text: 'Veja como ficou incrível! Criado com AR Style - IA e Realidade Aumentada',
          url: item.resultImageUrl
        });
      } catch (error) {
        navigator.clipboard.writeText(item.resultImageUrl);
        toast.success('Link copiado para a área de transferência!');
      }
    } else {
      navigator.clipboard.writeText(item.resultImageUrl);
      toast.success('Link copiado para a área de transferência!');
    }
  };

  const handleDelete = (id: string) => {
    onDeleteItem(id);
    toast.success('Look removido da galeria');
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

  if (galleryItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-slate-100 p-4 pb-24">
        <div className="max-w-4xl mx-auto pt-8">
          <div className="text-center py-16">
            <div className="p-6 bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl w-fit mx-auto mb-6">
              <Sparkles className="w-12 h-12 text-purple-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Sua Galeria Está Vazia
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Comece criando seu primeiro look! Todos os seus experimentos virtuais aparecerão aqui.
            </p>
            <div className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4 max-w-2xl mx-auto text-sm text-gray-600">
                <div className="p-4 bg-white/60 rounded-xl">
                  <span className="text-2xl mb-2 block">📸</span>
                  <p>Experimente roupas</p>
                </div>
                <div className="p-4 bg-white/60 rounded-xl">
                  <span className="text-2xl mb-2 block">💾</span>
                  <p>Salve seus favoritos</p>
                </div>
                <div className="p-4 bg-white/60 rounded-xl">
                  <span className="text-2xl mb-2 block">📤</span>
                  <p>Compartilhe looks</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-slate-100 p-4 pb-24">
      <div className="max-w-6xl mx-auto pt-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Minha Galeria</h1>
          </div>
          <p className="text-gray-600">
            {galleryItems.length} look{galleryItems.length !== 1 ? 's' : ''} salvo{galleryItems.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Controls */}
        <Card className="p-6 mb-8 bg-white/80 backdrop-blur-sm border-purple-200">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar por roupa ou tag..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-purple-200 focus:border-purple-400"
              />
            </div>

            <div className="flex items-center space-x-3">
              {/* Filter */}
              <div className="flex space-x-2">
                <Button
                  variant={selectedFilter === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedFilter('all')}
                  className={selectedFilter === 'all' ? 'bg-purple-600 hover:bg-purple-700' : 'border-purple-200 hover:bg-purple-50'}
                >
                  Todos
                </Button>
                <Button
                  variant={selectedFilter === 'favorites' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedFilter('favorites')}
                  className={selectedFilter === 'favorites' ? 'bg-purple-600 hover:bg-purple-700' : 'border-purple-200 hover:bg-purple-50'}
                >
                  <Heart className="w-4 h-4 mr-1" />
                  Favoritos
                </Button>
              </div>

              {/* View Mode */}
              <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Results */}
        {filteredItems.length === 0 ? (
          <Card className="p-12 text-center bg-white/80 backdrop-blur-sm border-purple-200">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Nenhum resultado encontrado
            </h3>
            <p className="text-gray-600">
              Tente ajustar sua busca ou filtros
            </p>
          </Card>
        ) : (
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
            : 'space-y-4'
          }>
            {filteredItems.map((item) => (
              <Card 
                key={item.id} 
                className={`bg-white/80 backdrop-blur-sm border-purple-200 hover:shadow-lg transition-all duration-300 ${
                  viewMode === 'list' ? 'p-4' : 'p-6'
                }`}
              >
                {viewMode === 'grid' ? (
                  <div className="space-y-4">
                    {/* Image */}
                    <div className="relative">
                      <img
                        src={item.resultImageUrl}
                        alt={`Look com ${item.clothingItem.name}`}
                        className="w-full aspect-[3/4] object-cover rounded-xl"
                      />
                      
                      {/* Overlay Actions */}
                      <div className="absolute top-3 right-3 flex space-x-2">
                        {item.liked && (
                          <div className="p-2 bg-red-500 rounded-full">
                            <Heart className="w-4 h-4 text-white fill-current" />
                          </div>
                        )}
                        <Badge className={getTypeColor(item.clothingItem.category)}>
                          {getTypeLabel(item.clothingItem.category)}
                        </Badge>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {item.clothingItem.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {new Date(item.createdAt).toLocaleDateString('pt-BR')}
                        </p>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {item.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          onClick={() => handleDownload(item)}
                          className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
                        >
                          <Download className="w-4 h-4 mr-1" />
                          JPG
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleDownload(item, true)}
                          className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white"
                        >
                          <Download className="w-4 h-4 mr-1" />
                          PNG
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleShare(item)}
                          className="border-purple-200 hover:bg-purple-50"
                        >
                          <Share2 className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(item.id)}
                          className="border-red-200 hover:bg-red-50 text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex space-x-4">
                    {/* Thumbnail */}
                    <div className="relative flex-shrink-0">
                      <img
                        src={item.resultImageUrl}
                        alt={`Look com ${item.clothingItem.name}`}
                        className="w-24 h-32 object-cover rounded-lg"
                      />
                      {item.liked && (
                        <div className="absolute -top-1 -right-1 p-1 bg-red-500 rounded-full">
                          <Heart className="w-3 h-3 text-white fill-current" />
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-800">
                            {item.clothingItem.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {new Date(item.createdAt).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                        <Badge className={getTypeColor(item.clothingItem.category)}>
                          {getTypeLabel(item.clothingItem.category)}
                        </Badge>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {item.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="flex space-x-2 pt-2">
                        <Button
                          size="sm"
                          onClick={() => handleDownload(item)}
                          className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
                        >
                          <Download className="w-4 h-4 mr-1" />
                          JPG
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleDownload(item, true)}
                          className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white"
                        >
                          <Download className="w-4 h-4 mr-1" />
                          PNG
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleShare(item)}
                          className="border-purple-200 hover:bg-purple-50"
                        >
                          <Share2 className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(item.id)}
                          className="border-red-200 hover:bg-red-50 text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}