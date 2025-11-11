'use client';

import { useState } from 'react';
import { Heart, Download, Share2, Trash2, Filter, Search, Grid, List } from 'lucide-react';
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
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFavorites, setShowFavorites] = useState(false);

  const filteredItems = galleryItems.filter(item => {
    const matchesSearch = item.clothingItem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = filterCategory === 'all' || item.clothingItem.category === filterCategory;
    const matchesFavorites = !showFavorites || item.liked;
    
    return matchesSearch && matchesCategory && matchesFavorites;
  });

  const categories = ['all', 'shirt', 'pants', 'dress', 'jacket', 'shoes', 'accessories'];
  
  const getCategoryLabel = (category: string): string => {
    const labels: Record<string, string> = {
      all: 'Todos',
      shirt: 'Camisas',
      pants: 'Calças',
      dress: 'Vestidos',
      jacket: 'Jaquetas',
      shoes: 'Sapatos',
      accessories: 'Acessórios'
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

  const handleDownload = (item: GalleryItem, transparent: boolean = false) => {
    const url = transparent ? item.transparentResultUrl! : item.resultImageUrl;
    const filename = `ar-style-${item.clothingItem.name.toLowerCase().replace(/\s+/g, '-')}-${item.id}`;
    downloadImage(url, filename, transparent);
    
    toast.success(
      transparent 
        ? 'Download PNG transparente iniciado!' 
        : 'Download JPG iniciado!'
    );
  };

  const handleShare = async (item: GalleryItem) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Meu look: ${item.clothingItem.name}`,
          text: 'Veja meu look criado no AR Style!',
          url: item.resultImageUrl
        });
      } catch (error) {
        navigator.clipboard.writeText(item.resultImageUrl);
        toast.success('Link copiado!');
      }
    } else {
      navigator.clipboard.writeText(item.resultImageUrl);
      toast.success('Link copiado!');
    }
  };

  const handleDelete = (item: GalleryItem) => {
    onDeleteItem(item.id);
    toast.success('Look removido da galeria');
  };

  if (galleryItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-slate-100 p-4 pb-24">
        <div className="max-w-4xl mx-auto pt-8">
          <div className="text-center py-16">
            <div className="p-6 bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl w-fit mx-auto mb-6">
              <Heart className="w-12 h-12 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Sua galeria está vazia
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Comece a experimentar roupas e seus looks favoritos aparecerão aqui!
            </p>
            <Button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white">
              Criar Primeiro Look
            </Button>
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
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Minha Galeria</h1>
          <p className="text-gray-600">
            Todos os seus looks salvos em um só lugar
          </p>
        </div>

        {/* Filters and Search */}
        <Card className="p-6 mb-8 bg-white/80 backdrop-blur-sm border-purple-200">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar por nome ou tag..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-purple-200 focus:border-purple-400"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={filterCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterCategory(category)}
                  className={filterCategory === category 
                    ? "bg-purple-600 hover:bg-purple-700" 
                    : "border-purple-200 hover:bg-purple-50"
                  }
                >
                  {getCategoryLabel(category)}
                </Button>
              ))}
            </div>

            {/* View Options */}
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFavorites(!showFavorites)}
                className={`border-purple-200 ${showFavorites ? 'bg-purple-50 text-purple-700' : 'hover:bg-purple-50'}`}
              >
                <Heart className={`w-4 h-4 mr-2 ${showFavorites ? 'fill-current' : ''}`} />
                Favoritos
              </Button>
              
              <div className="flex border border-purple-200 rounded-lg overflow-hidden">
                <Button
                  variant={viewMode === 'grid' ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className={viewMode === 'grid' ? "bg-purple-600 hover:bg-purple-700" : "hover:bg-purple-50"}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className={viewMode === 'list' ? "bg-purple-600 hover:bg-purple-700" : "hover:bg-purple-50"}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredItems.length} look{filteredItems.length !== 1 ? 's' : ''} encontrado{filteredItems.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Gallery Grid */}
        {viewMode === 'grid' ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <Card key={item.id} className="group overflow-hidden bg-white/80 backdrop-blur-sm border-purple-200 hover:shadow-lg transition-all duration-300">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={item.resultImageUrl}
                    alt={item.clothingItem.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Overlay Actions */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-y-2">
                    {item.liked && (
                      <div className="p-2 bg-white/80 backdrop-blur-sm rounded-full">
                        <Heart className="w-4 h-4 text-red-500 fill-current" />
                      </div>
                    )}
                  </div>
                  
                  {/* Quick Actions */}
                  <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        onClick={() => handleDownload(item)}
                        className="flex-1 bg-white/80 backdrop-blur-sm text-gray-800 hover:bg-white/90"
                      >
                        <Download className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleShare(item)}
                        className="flex-1 bg-white/80 backdrop-blur-sm text-gray-800 hover:bg-white/90"
                      >
                        <Share2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 text-sm mb-1">
                        {item.clothingItem.name}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {new Date(item.createdAt).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(item)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <Badge className={getTypeColor(item.clothingItem.category)}>
                      {getCategoryLabel(item.clothingItem.category)}
                    </Badge>
                    
                    <div className="flex space-x-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownload(item, true)}
                        className="border-emerald-200 text-emerald-600 hover:bg-emerald-50 p-1"
                        title="Download PNG transparente"
                      >
                        <Download className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>

                  {item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {item.tags.slice(0, 2).map((tag, index) => (
                        <span
                          key={index}
                          className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                      {item.tags.length > 2 && (
                        <span className="text-xs text-gray-500">
                          +{item.tags.length - 2}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        ) : (
          /* List View */
          <div className="space-y-4">
            {filteredItems.map((item) => (
              <Card key={item.id} className="p-4 bg-white/80 backdrop-blur-sm border-purple-200 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center space-x-4">
                  <img
                    src={item.resultImageUrl}
                    alt={item.clothingItem.name}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  
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
                      
                      <div className="flex items-center space-x-2">
                        {item.liked && (
                          <Heart className="w-4 h-4 text-red-500 fill-current" />
                        )}
                        <Badge className={getTypeColor(item.clothingItem.category)}>
                          {getCategoryLabel(item.clothingItem.category)}
                        </Badge>
                      </div>
                    </div>
                    
                    {item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {item.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownload(item)}
                      className="border-blue-200 text-blue-600 hover:bg-blue-50"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownload(item, true)}
                      className="border-emerald-200 text-emerald-600 hover:bg-emerald-50"
                    >
                      PNG
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleShare(item)}
                      className="border-purple-200 text-purple-600 hover:bg-purple-50"
                    >
                      <Share2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(item)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {filteredItems.length === 0 && galleryItems.length > 0 && (
          <div className="text-center py-16">
            <div className="p-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl w-fit mx-auto mb-6">
              <Search className="w-12 h-12 text-gray-500" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Nenhum look encontrado
            </h2>
            <p className="text-gray-600 mb-8">
              Tente ajustar os filtros ou buscar por outros termos
            </p>
            <Button
              onClick={() => {
                setSearchTerm('');
                setFilterCategory('all');
                setShowFavorites(false);
              }}
              variant="outline"
              className="border-purple-200 hover:bg-purple-50"
            >
              Limpar Filtros
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}