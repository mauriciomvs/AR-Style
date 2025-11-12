'use client';

import { useState } from 'react';
import { 
  User, 
  Settings, 
  Heart, 
  Image, 
  Share2, 
  Download,
  Shield,
  Bell,
  Palette,
  Camera,
  Edit3,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function ProfileTab() {
  const [activeSection, setActiveSection] = useState<'profile' | 'settings' | 'privacy' | 'stats'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [notifications, setNotifications] = useState({
    newLooks: true,
    likes: true,
    comments: false,
    trends: true
  });

  // Dados simulados do usuário
  const userStats = {
    looksCreated: 47,
    totalLikes: 1234,
    totalShares: 89,
    totalDownloads: 156,
    joinDate: '2024-01-15',
    favoriteCategory: 'Casual',
    achievements: [
      { id: 1, name: 'Primeiro Look', description: 'Criou seu primeiro look', icon: '🎯', earned: true },
      { id: 2, name: 'Popular', description: '100+ curtidas em um look', icon: '❤️', earned: true },
      { id: 3, name: 'Criativo', description: '10+ looks criados', icon: '🎨', earned: true },
      { id: 4, name: 'Influencer', description: '1000+ curtidas totais', icon: '⭐', earned: true },
      { id: 5, name: 'Trendsetter', description: 'Look em destaque', icon: '🔥', earned: false }
    ]
  };

  const menuItems = [
    { id: 'profile', label: 'Perfil', icon: User },
    { id: 'settings', label: 'Configurações', icon: Settings },
    { id: 'privacy', label: 'Privacidade', icon: Shield },
    { id: 'stats', label: 'Estatísticas', icon: Award }
  ];

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const renderProfileSection = () => (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="p-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
          <div className="relative">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
              <User className="w-12 h-12 text-white" />
            </div>
            <Button
              size="sm"
              className="absolute -bottom-2 -right-2 bg-white text-purple-600 hover:bg-gray-100 rounded-full p-2"
            >
              <Camera className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
              <h1 className="text-2xl font-bold">Usuário AR Style</h1>
              <Badge className="bg-yellow-400 text-yellow-800">
                <Award className="w-3 h-3 mr-1" />
                Pro
              </Badge>
            </div>
            <p className="text-purple-100 mb-4">
              Apaixonado por moda e tecnologia. Criando looks incríveis desde janeiro de 2024.
            </p>
            <div className="flex items-center justify-center md:justify-start space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>Membro desde Jan 2024</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>São Paulo, BR</span>
              </div>
            </div>
          </div>
          
          <Button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-white/20 hover:bg-white/30 border border-white/30"
          >
            <Edit3 className="w-4 h-4 mr-2" />
            {isEditing ? 'Cancelar' : 'Editar'}
          </Button>
        </div>
      </Card>

      {/* Profile Form */}
      <Card className="p-6 bg-white/80 backdrop-blur-sm border-purple-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Informações Pessoais</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Nome Completo</Label>
              <Input
                id="name"
                defaultValue="Usuário AR Style"
                disabled={!isEditing}
                className="border-purple-200"
              />
            </div>
            
            <div>
              <Label htmlFor="email">E-mail</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="email"
                  type="email"
                  defaultValue="usuario@example.com"
                  disabled={!isEditing}
                  className="pl-10 border-purple-200"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="phone">Telefone</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="phone"
                  defaultValue="+55 (11) 99999-9999"
                  disabled={!isEditing}
                  className="pl-10 border-purple-200"
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="location">Localização</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="location"
                  defaultValue="São Paulo, SP"
                  disabled={!isEditing}
                  className="pl-10 border-purple-200"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="bio">Bio</Label>
              <textarea
                id="bio"
                rows={4}
                defaultValue="Apaixonado por moda e tecnologia. Criando looks incríveis com IA!"
                disabled={!isEditing}
                className="w-full p-3 border border-purple-200 rounded-lg resize-none disabled:bg-gray-50"
              />
            </div>
          </div>
        </div>
        
        {isEditing && (
          <div className="flex justify-end space-x-3 mt-6">
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancelar
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700">
              Salvar Alterações
            </Button>
          </div>
        )}
      </Card>

      {/* Achievements */}
      <Card className="p-6 bg-white/80 backdrop-blur-sm border-purple-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Conquistas</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {userStats.achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`p-4 rounded-xl text-center transition-all duration-300 ${
                achievement.earned
                  ? 'bg-gradient-to-br from-yellow-100 to-orange-100 border-2 border-yellow-200'
                  : 'bg-gray-50 border-2 border-gray-200 opacity-50'
              }`}
            >
              <div className="text-2xl mb-2">{achievement.icon}</div>
              <h3 className={`font-semibold text-sm mb-1 ${
                achievement.earned ? 'text-yellow-800' : 'text-gray-500'
              }`}>
                {achievement.name}
              </h3>
              <p className={`text-xs ${
                achievement.earned ? 'text-yellow-700' : 'text-gray-400'
              }`}>
                {achievement.description}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  const renderSettingsSection = () => (
    <div className="space-y-6">
      <Card className="p-6 bg-white/80 backdrop-blur-sm border-purple-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Notificações</h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="new-looks">Novos looks em tendência</Label>
              <p className="text-sm text-gray-500">Receba notificações sobre looks populares</p>
            </div>
            <Switch
              id="new-looks"
              checked={notifications.newLooks}
              onCheckedChange={() => handleNotificationChange('newLooks')}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="likes">Curtidas nos seus looks</Label>
              <p className="text-sm text-gray-500">Seja notificado quando alguém curtir seus looks</p>
            </div>
            <Switch
              id="likes"
              checked={notifications.likes}
              onCheckedChange={() => handleNotificationChange('likes')}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="comments">Comentários</Label>
              <p className="text-sm text-gray-500">Receba notificações sobre comentários</p>
            </div>
            <Switch
              id="comments"
              checked={notifications.comments}
              onCheckedChange={() => handleNotificationChange('comments')}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="trends">Tendências semanais</Label>
              <p className="text-sm text-gray-500">Resumo semanal das principais tendências</p>
            </div>
            <Switch
              id="trends"
              checked={notifications.trends}
              onCheckedChange={() => handleNotificationChange('trends')}
            />
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-white/80 backdrop-blur-sm border-purple-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Preferências</h2>
        
        <div className="space-y-4">
          <div>
            <Label>Qualidade de processamento</Label>
            <div className="flex space-x-3 mt-2">
              <Button variant="outline" size="sm" className="border-purple-200">Rápida</Button>
              <Button size="sm" className="bg-purple-600 hover:bg-purple-700">Alta</Button>
              <Button variant="outline" size="sm" className="border-purple-200">Ultra</Button>
            </div>
          </div>
          
          <div>
            <Label>Tema da interface</Label>
            <div className="flex space-x-3 mt-2">
              <Button size="sm" className="bg-purple-600 hover:bg-purple-700">Claro</Button>
              <Button variant="outline" size="sm" className="border-purple-200">Escuro</Button>
              <Button variant="outline" size="sm" className="border-purple-200">Auto</Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderPrivacySection = () => (
    <div className="space-y-6">
      <Card className="p-6 bg-white/80 backdrop-blur-sm border-purple-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Privacidade e Segurança</h2>
        
        <div className="space-y-6">
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Shield className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold text-green-800">Seus dados estão seguros</h3>
            </div>
            <p className="text-sm text-green-700">
              Todas as suas imagens são processadas com criptografia e podem ser apagadas a qualquer momento.
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Perfil público</Label>
                <p className="text-sm text-gray-500">Permitir que outros vejam seus looks</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Compartilhamento automático</Label>
                <p className="text-sm text-gray-500">Permitir compartilhamento dos seus looks em tendências</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Análise de dados</Label>
                <p className="text-sm text-gray-500">Ajudar a melhorar o app com dados anônimos</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
          
          <div className="pt-4 border-t">
            <Button variant="outline" className="w-full border-red-200 text-red-600 hover:bg-red-50">
              Apagar todos os meus dados
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderStatsSection = () => (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-6 text-center bg-white/80 backdrop-blur-sm border-purple-200">
          <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl w-fit mx-auto mb-3">
            <Image className="w-6 h-6 text-white" />
          </div>
          <div className="text-2xl font-bold text-gray-800 mb-1">{userStats.looksCreated}</div>
          <div className="text-sm text-gray-600">Looks Criados</div>
        </Card>
        
        <Card className="p-6 text-center bg-white/80 backdrop-blur-sm border-purple-200">
          <div className="p-3 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl w-fit mx-auto mb-3">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <div className="text-2xl font-bold text-gray-800 mb-1">{userStats.totalLikes.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Total de Curtidas</div>
        </Card>
        
        <Card className="p-6 text-center bg-white/80 backdrop-blur-sm border-purple-200">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl w-fit mx-auto mb-3">
            <Share2 className="w-6 h-6 text-white" />
          </div>
          <div className="text-2xl font-bold text-gray-800 mb-1">{userStats.totalShares}</div>
          <div className="text-sm text-gray-600">Compartilhamentos</div>
        </Card>
        
        <Card className="p-6 text-center bg-white/80 backdrop-blur-sm border-purple-200">
          <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl w-fit mx-auto mb-3">
            <Download className="w-6 h-6 text-white" />
          </div>
          <div className="text-2xl font-bold text-gray-800 mb-1">{userStats.totalDownloads}</div>
          <div className="text-sm text-gray-600">Downloads</div>
        </Card>
      </div>

      {/* Detailed Stats */}
      <Card className="p-6 bg-white/80 backdrop-blur-sm border-purple-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Estatísticas Detalhadas</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-700">Categoria Favorita</h3>
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{userStats.favoriteCategory}</span>
                <Badge className="bg-purple-100 text-purple-700">67%</Badge>
              </div>
              <div className="w-full bg-purple-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '67%' }}></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Elegante</span>
                <span>23%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Street Style</span>
                <span>10%</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-700">Atividade Mensal</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Janeiro 2024</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                  <span className="text-sm font-medium">12 looks</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Fevereiro 2024</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                  <span className="text-sm font-medium">15 looks</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Março 2024</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  <span className="text-sm font-medium">9 looks</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-slate-100 p-4 pb-24">
      <div className="max-w-6xl mx-auto pt-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl">
              <User className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Meu Perfil</h1>
          </div>
          <p className="text-gray-600">
            Gerencie suas informações, preferências e configurações
          </p>
        </div>

        {/* Navigation */}
        <Card className="p-4 mb-8 bg-white/80 backdrop-blur-sm border-purple-200">
          <div className="flex space-x-2 overflow-x-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={activeSection === item.id ? 'default' : 'ghost'}
                  onClick={() => setActiveSection(item.id as any)}
                  className={`flex items-center space-x-2 whitespace-nowrap ${
                    activeSection === item.id 
                      ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                      : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Button>
              );
            })}
          </div>
        </Card>

        {/* Content */}
        {activeSection === 'profile' && renderProfileSection()}
        {activeSection === 'settings' && renderSettingsSection()}
        {activeSection === 'privacy' && renderPrivacySection()}
        {activeSection === 'stats' && renderStatsSection()}
      </div>
    </div>
  );
}