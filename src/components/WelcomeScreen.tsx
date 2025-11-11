'use client';

import { useState } from 'react';
import { Camera, Upload, Sparkles, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface WelcomeScreenProps {
  onGetStarted: () => void;
}

export default function WelcomeScreen({ onGetStarted }: WelcomeScreenProps) {
  const [showAuth, setShowAuth] = useState(false);

  if (showAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-slate-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 bg-white/80 backdrop-blur-sm border-purple-200">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center space-x-2">
              <Sparkles className="w-8 h-8 text-purple-600" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-slate-600 bg-clip-text text-transparent">
                AR Style
              </h1>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Entre na sua conta</h2>
              <p className="text-gray-600 text-sm">
                Faça login para salvar seus looks e acessar recursos exclusivos
              </p>
            </div>

            <div className="space-y-3">
              <Button 
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white"
                onClick={onGetStarted}
              >
                Continuar com Google
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full border-purple-200 hover:bg-purple-50"
                onClick={onGetStarted}
              >
                Continuar com E-mail
              </Button>
              
              <Button 
                variant="ghost" 
                className="w-full text-purple-600 hover:bg-purple-50"
                onClick={onGetStarted}
              >
                Usar sem conta
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-slate-100">
      {/* Header */}
      <div className="text-center pt-12 pb-8 px-4">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="p-3 bg-gradient-to-br from-purple-600 to-slate-600 rounded-2xl">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-slate-600 bg-clip-text text-transparent">
            AR Style
          </h1>
        </div>
        
        <p className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
          Vista-se com Inteligência Artificial e Realidade Aumentada
        </p>
        
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Vista-se com IA e Realidade Aumentada. Experimente, visualize e baixe seu look com o AR Style!
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 pb-12">
        {/* Hero Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6 bg-white/80 backdrop-blur-sm border-purple-200 hover:shadow-lg transition-all duration-300">
            <div className="text-center space-y-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl w-fit mx-auto">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800">Foto Inteligente</h3>
              <p className="text-sm text-gray-600">
                Tire uma foto ou escolha da galeria. Nossa IA reconhece automaticamente seu corpo
              </p>
            </div>
          </Card>

          <Card className="p-6 bg-white/80 backdrop-blur-sm border-purple-200 hover:shadow-lg transition-all duration-300">
            <div className="text-center space-y-4">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl w-fit mx-auto">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800">IA Avançada</h3>
              <p className="text-sm text-gray-600">
                Processamento realista com ajuste automático de luz, sombra e perspectiva
              </p>
            </div>
          </Card>

          <Card className="p-6 bg-white/80 backdrop-blur-sm border-purple-200 hover:shadow-lg transition-all duration-300">
            <div className="text-center space-y-4">
              <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl w-fit mx-auto">
                <Upload className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800">Download Flexível</h3>
              <p className="text-sm text-gray-600">
                Baixe com fundo normal ou transparente (PNG) para qualquer uso
              </p>
            </div>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center space-y-6">
          <Button 
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-12 py-4 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => setShowAuth(true)}
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Começar Agora
          </Button>
          
          <p className="text-sm text-gray-500">
            Gratuito para começar • Sem necessidade de cadastro
          </p>
        </div>

        {/* Features List */}
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">✨ Recursos Principais</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Reconhecimento automático de corpo e roupa</li>
              <li>• Ajuste realista de iluminação e sombras</li>
              <li>• Modo AR em tempo real</li>
              <li>• Download em JPG e PNG transparente</li>
              <li>• Galeria pessoal de looks</li>
              <li>• Comparação antes/depois</li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">🔒 Privacidade Total</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Suas fotos são processadas com segurança</li>
              <li>• Nenhum dado compartilhado com terceiros</li>
              <li>• Você pode apagar tudo a qualquer momento</li>
              <li>• Download direto no seu dispositivo</li>
              <li>• Não usamos suas imagens para treinar IA</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}