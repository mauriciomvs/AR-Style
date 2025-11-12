'use client';

import { useState } from 'react';
import { 
  TrendingUp, 
  Heart, 
  Eye, 
  Sparkles, 
  Filter,
  Search,
  Star,
  Users,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { TrendingLook } from '@/lib/types';

export default function ExploreTab() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'trending' | 'new' | 'popular'>('all');

  // Dados simulados de looks em tendência
  const trendingLooks: TrendingLook[] = [
    {
      id: '1',
      title: 'Look Casual Chic',
      description: 'Combinação perfeita para o dia a dia com elegância',
      imageUrl: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=600&fit=crop',
      likes: 1247,
      clothingItems: [],
      tags: ['casual', 'chic', 'dia-a-dia']
    },
    {
      id: '2',
      title: 'Elegância Noturna',
      description: 'Sofisticação para eventos especiais',
      imageUrl: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=600&fit=crop',
      likes: 892,
      clothingItems: [],
      tags: ['elegante', 'noite', 'festa']
    },
    {
      id: '3',
      title: 'Street Style Urbano',
      description: 'Atitude e personalidade nas ruas',
      imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=600&fit=crop',
      likes: 2156,
      clothingItems: [],
      tags: ['street', 'urbano', 'moderno']
    },
    {
      id: '4',
      title: 'Minimalista Moderno',
      description: 'Menos é mais: simplicidade com estilo',
      imageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=600&fit=crop',
      likes: 1543,
      clothingItems: [],
      tags: ['minimalista', 'clean', 'moderno']
    },
    {
      id: '5',
      title: 'Boho Chic Verão',
      description: 'Liberdade e naturalidade em cada peça',
      imageUrl: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=600&fit=crop',
      likes: 967,
      clothingItems: [],
      tags: ['boho', 'verão', 'natural']
    },
    {
      id: '6',
      title: 'Business Casual',
      description: 'Profissionalismo com conforto',
      imageUrl: 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=400&h=600&fit=crop',
      likes: 1834,
      clothingItems: [],
      tags: ['business', 'trabalho', 'formal']
    }
  ];

  const categories = [
    { id: 'all', label: 'Todos', icon: Sparkles },
    { id: 'trending', label: 'Em Alta', icon: TrendingUp },
    { id: 'new', label: 'Novos', icon: Clock },
    { id: 'popular', label: 'Populares', icon: Star }
  ];

  const filteredLooks = trendingLooks.filter(look => {
    const matchesSearch = look.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         look.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesSearch;
  });

  const handleLike = (lookId: string) => {
    // Simula curtir um look
    console.log('Curtiu look:', lookId);
  };

  const handleTryLook = (look: TrendingLook) => {
    // Simula experimentar um look
    console.log('Experimentar look:', look.title);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-slate-100 p-4 pb-24">
      <div className="max-w-6xl mx-auto pt-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="p-2 bg-gradient-to-br from-orange-500 to-pink-500 rounded-xl">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Explorar Looks</h1>
          </div>
          <p className="text-gray-600">
            Descubra tendências, inspirações e looks populares da comunidade
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="p-6 mb-8 bg-white/80 backdrop-blur-sm border-purple-200">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar looks, estilos, tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-purple-200 focus:border-purple-400"
              />
            </div>

            {/* Category Filters */}
            <div className="flex space-x-2 overflow-x-auto">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id as any)}
                    className={`flex items-center space-x-1 whitespace-nowrap ${
                      selectedCategory === category.id 
                        ? 'bg-purple-600 hover:bg-purple-700' 
                        : 'border-purple-200 hover:bg-purple-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{category.label}</span>
                  </Button>
                );
              })}
            </div>
          </div>
        </Card>

        {/* Trending Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 text-center bg-white/80 backdrop-blur-sm border-purple-200">
            <div className="text-2xl font-bold text-purple-600 mb-1">2.4K</div>
            <div className="text-sm text-gray-600">Looks Criados</div>
          </Card>
          <Card className="p-4 text-center bg-white/80 backdrop-blur-sm border-purple-200">
            <div className="text-2xl font-bold text-pink-600 mb-1">15.7K</div>
            <div className="text-sm text-gray-600">Curtidas</div>
          </Card>
          <Card className="p-4 text-center bg-white/80 backdrop-blur-sm border-purple-200">
            <div className="text-2xl font-bold text-orange-600 mb-1">892</div>
            <div className="text-sm text-gray-600">Usuários Ativos</div>
          </Card>
          <Card className="p-4 text-center bg-white/80 backdrop-blur-sm border-purple-200">
            <div className="text-2xl font-bold text-green-600 mb-1">156</div>
            <div className="text-sm text-gray-600">Novos Hoje</div>
          </Card>
        </div>

        {/* Featured Look */}
        <Card className="p-8 mb-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <Badge className="bg-white/20 text-white border-white/30">
                🔥 Look da Semana
              </Badge>
              <h2 className="text-3xl font-bold">
                Street Style Urbano
              </h2>
              <p className="text-purple-100">
                O look mais curtido desta semana! Atitude e personalidade nas ruas com combinações ousadas e modernas.
              </p>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <Heart className="w-4 h-4" />
                  <span>2,156 curtidas</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Eye className="w-4 h-4" />
                  <span>8,943 visualizações</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>342 experimentaram</span>
                </div>
              </div>
              <Button 
                className="bg-white text-purple-600 hover:bg-gray-100"
                onClick={() => handleTryLook(trendingLooks[2])}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Experimentar Este Look
              </Button>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=600&fit=crop"
                alt="Look da semana"
                className="w-full max-w-sm mx-auto rounded-2xl shadow-2xl"
              />
              <div className="absolute -top-4 -right-4 p-3 bg-yellow-400 rounded-full">
                <Star className="w-6 h-6 text-yellow-800" />
              </div>
            </div>
          </div>
        </Card>

        {/* Looks Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">
              {selectedCategory === 'all' && 'Todos os Looks'}
              {selectedCategory === 'trending' && 'Em Alta Agora'}
              {selectedCategory === 'new' && 'Novos Looks'}
              {selectedCategory === 'popular' && 'Mais Populares'}
            </h2>
            <div className="text-sm text-gray-500">
              {filteredLooks.length} resultado{filteredLooks.length !== 1 ? 's' : ''}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLooks.map((look) => (
              <Card 
                key={look.id} 
                className="group bg-white/80 backdrop-blur-sm border-purple-200 hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={look.imageUrl}
                    alt={look.title}
                    className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Actions Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      onClick={() => handleTryLook(look)}
                      className="bg-white/90 text-gray-800 hover:bg-white"
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      Experimentar
                    </Button>
                  </div>

                  {/* Stats */}
                  <div className="absolute top-4 left-4 flex space-x-2">
                    <Badge className="bg-black/50 text-white border-none">
                      <Heart className="w-3 h-3 mr-1" />
                      {look.likes.toLocaleString()}
                    </Badge>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg group-hover:text-purple-600 transition-colors">
                      {look.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {look.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {look.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLike(look.id)}
                      className="text-gray-600 hover:text-red-500"
                    >
                      <Heart className="w-4 h-4 mr-1" />
                      Curtir
                    </Button>
                    
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <Eye className="w-3 h-3" />
                      <span>{(look.likes * 4.2).toFixed(0)} views</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            className="border-purple-200 hover:bg-purple-50"
          >
            Carregar Mais Looks
          </Button>
        </div>
      </div>
    </div>
  );
}