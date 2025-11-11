'use client';

import { useState, useEffect } from 'react';
import { Sparkles, Zap, Brain, Eye } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ProcessingStatus, TryOnResult, ClothingItem } from '@/lib/types';
import { processVirtualTryOn } from '@/lib/ar-utils';

interface AIProcessingProps {
  userPhoto: File;
  clothingItem: ClothingItem;
  onComplete: (result: TryOnResult) => void;
}

export default function AIProcessing({ userPhoto, clothingItem, onComplete }: AIProcessingProps) {
  const [status, setStatus] = useState<ProcessingStatus>({
    status: 'processing',
    progress: 0,
    message: 'Iniciando processamento...'
  });

  useEffect(() => {
    const startProcessing = async () => {
      try {
        const result = await processVirtualTryOn(userPhoto, clothingItem, setStatus);
        onComplete(result);
      } catch (error) {
        setStatus({
          status: 'error',
          progress: 0,
          message: 'Erro no processamento. Tente novamente.'
        });
      }
    };

    startProcessing();
  }, [userPhoto, clothingItem, onComplete]);

  const getStepIcon = (progress: number) => {
    if (progress < 30) return <Eye className="w-6 h-6" />;
    if (progress < 60) return <Brain className="w-6 h-6" />;
    if (progress < 90) return <Zap className="w-6 h-6" />;
    return <Sparkles className="w-6 h-6" />;
  };

  const getStepColor = (progress: number) => {
    if (progress < 30) return 'from-blue-500 to-cyan-500';
    if (progress < 60) return 'from-purple-500 to-pink-500';
    if (progress < 90) return 'from-orange-500 to-red-500';
    return 'from-green-500 to-emerald-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-slate-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-8 bg-white/80 backdrop-blur-sm border-purple-200">
        <div className="text-center space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <div className={`p-4 bg-gradient-to-br ${getStepColor(status.progress)} rounded-2xl w-fit mx-auto animate-pulse`}>
              <div className="text-white">
                {getStepIcon(status.progress)}
              </div>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-800">
              IA Processando seu Look
            </h1>
            
            <p className="text-gray-600 max-w-md mx-auto">
              Nossa inteligência artificial está aplicando a roupa em sua foto com precisão realista
            </p>
          </div>

          {/* Progress */}
          <div className="space-y-4">
            <div className="relative">
              <Progress 
                value={status.progress} 
                className="h-3 bg-gray-200"
              />
              <div 
                className="absolute top-0 left-0 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${status.progress}%` }}
              />
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">0%</span>
              <span className="font-semibold text-purple-600">{status.progress}%</span>
              <span className="text-gray-500">100%</span>
            </div>
          </div>

          {/* Status Message */}
          <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-200">
            <p className="text-lg font-semibold text-purple-800 mb-2">
              {status.message}
            </p>
            
            {status.progress < 100 && (
              <p className="text-sm text-purple-600">
                Aguarde enquanto processamos sua imagem...
              </p>
            )}
          </div>

          {/* Processing Steps */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className={`p-4 rounded-xl transition-all duration-500 ${
              status.progress >= 10 ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'
            } border`}>
              <Eye className={`w-6 h-6 mx-auto mb-2 ${
                status.progress >= 10 ? 'text-blue-600' : 'text-gray-400'
              }`} />
              <p className={`text-xs font-medium ${
                status.progress >= 10 ? 'text-blue-700' : 'text-gray-500'
              }`}>
                Análise da Foto
              </p>
            </div>

            <div className={`p-4 rounded-xl transition-all duration-500 ${
              status.progress >= 40 ? 'bg-purple-50 border-purple-200' : 'bg-gray-50 border-gray-200'
            } border`}>
              <Brain className={`w-6 h-6 mx-auto mb-2 ${
                status.progress >= 40 ? 'text-purple-600' : 'text-gray-400'
              }`} />
              <p className={`text-xs font-medium ${
                status.progress >= 40 ? 'text-purple-700' : 'text-gray-500'
              }`}>
                Detecção do Corpo
              </p>
            </div>

            <div className={`p-4 rounded-xl transition-all duration-500 ${
              status.progress >= 70 ? 'bg-orange-50 border-orange-200' : 'bg-gray-50 border-gray-200'
            } border`}>
              <Zap className={`w-6 h-6 mx-auto mb-2 ${
                status.progress >= 70 ? 'text-orange-600' : 'text-gray-400'
              }`} />
              <p className={`text-xs font-medium ${
                status.progress >= 70 ? 'text-orange-700' : 'text-gray-500'
              }`}>
                Ajuste Realista
              </p>
            </div>

            <div className={`p-4 rounded-xl transition-all duration-500 ${
              status.progress >= 95 ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
            } border`}>
              <Sparkles className={`w-6 h-6 mx-auto mb-2 ${
                status.progress >= 95 ? 'text-green-600' : 'text-gray-400'
              }`} />
              <p className={`text-xs font-medium ${
                status.progress >= 95 ? 'text-green-700' : 'text-gray-500'
              }`}>
                Finalização
              </p>
            </div>
          </div>

          {/* Fun Facts */}
          <div className="text-left space-y-3 p-6 bg-gradient-to-r from-slate-50 to-gray-50 rounded-2xl border border-gray-200">
            <h3 className="font-semibold text-gray-800 text-center mb-4">
              🧠 Enquanto você espera...
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div className="space-y-2">
                <p>• Nossa IA analisa mais de 100 pontos do seu corpo</p>
                <p>• Ajustamos automaticamente luz e sombras</p>
                <p>• Reconhecemos diferentes tipos de tecido</p>
              </div>
              <div className="space-y-2">
                <p>• Processamos em resolução ultra-alta</p>
                <p>• Mantemos proporções naturais</p>
                <p>• Geramos versão com fundo transparente</p>
              </div>
            </div>
          </div>

          {status.status === 'error' && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-700 font-medium">
                Ops! Algo deu errado. Tente novamente ou use uma foto diferente.
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}