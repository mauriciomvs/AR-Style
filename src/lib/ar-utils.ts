// Utilitários para processamento de imagem e IA

import { ProcessingStatus, TryOnResult, ClothingItem } from './types';

// Simula o processamento de IA para try-on virtual
export const processVirtualTryOn = async (
  userPhotoFile: File,
  clothingItem: ClothingItem,
  onProgress: (status: ProcessingStatus) => void
): Promise<TryOnResult> => {
  // Simula o processo de IA com etapas realistas
  const steps = [
    { progress: 5, message: 'Iniciando análise da imagem...' },
    { progress: 15, message: 'Detectando corpo humano...' },
    { progress: 25, message: 'Mapeando pontos de referência...' },
    { progress: 40, message: 'Analisando postura e proporções...' },
    { progress: 55, message: 'Segmentando a roupa selecionada...' },
    { progress: 70, message: 'Ajustando tamanho e perspectiva...' },
    { progress: 80, message: 'Aplicando iluminação realista...' },
    { progress: 90, message: 'Corrigindo sombras e reflexos...' },
    { progress: 95, message: 'Gerando versão transparente...' },
    { progress: 100, message: 'Pronto! Seu look está incrível!' }
  ];

  for (const step of steps) {
    onProgress({
      status: 'processing',
      progress: step.progress,
      message: step.message
    });
    // Tempo variável para simular processamento real
    const delay = step.progress < 50 ? 600 : step.progress < 90 ? 1000 : 800;
    await new Promise(resolve => setTimeout(resolve, delay));
  }

  // Simula URLs de resultado (em produção seria gerado pela IA)
  const resultImages = [
    'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=600&fit=crop'
  ];
  
  const randomImage = resultImages[Math.floor(Math.random() * resultImages.length)];
  const resultImageUrl = randomImage;
  const transparentResultUrl = `${randomImage}&bg=transparent`;

  const result: TryOnResult = {
    id: generateId(),
    userId: 'user-1',
    originalPhotoUrl: URL.createObjectURL(userPhotoFile),
    clothingItem,
    resultImageUrl,
    transparentResultUrl,
    createdAt: new Date(),
    liked: false
  };

  onProgress({
    status: 'completed',
    progress: 100,
    message: 'Processamento concluído com sucesso!'
  });

  return result;
};

// Detecta automaticamente o tipo de roupa usando IA simulada
export const detectClothingType = (imageFile: File): Promise<ClothingItem['category']> => {
  return new Promise((resolve) => {
    // Simula análise de IA mais realista
    setTimeout(() => {
      // Análise baseada no nome do arquivo ou características simuladas
      const fileName = imageFile.name.toLowerCase();
      
      if (fileName.includes('shirt') || fileName.includes('camisa') || fileName.includes('blusa')) {
        resolve('shirt');
      } else if (fileName.includes('dress') || fileName.includes('vestido')) {
        resolve('dress');
      } else if (fileName.includes('pants') || fileName.includes('calca') || fileName.includes('jeans')) {
        resolve('pants');
      } else if (fileName.includes('jacket') || fileName.includes('jaqueta') || fileName.includes('casaco')) {
        resolve('jacket');
      } else if (fileName.includes('shoe') || fileName.includes('sapato') || fileName.includes('tenis')) {
        resolve('shoes');
      } else {
        // Detecção aleatória mais inteligente baseada em probabilidades reais
        const types: { type: ClothingItem['category'], weight: number }[] = [
          { type: 'shirt', weight: 35 },
          { type: 'dress', weight: 25 },
          { type: 'pants', weight: 20 },
          { type: 'jacket', weight: 15 },
          { type: 'accessories', weight: 5 }
        ];
        
        const random = Math.random() * 100;
        let cumulative = 0;
        
        for (const item of types) {
          cumulative += item.weight;
          if (random <= cumulative) {
            resolve(item.type);
            return;
          }
        }
        
        resolve('shirt'); // fallback
      }
    }, 1200); // Tempo mais realista para análise
  });
};

// Gera ID único mais robusto
export const generateId = (): string => {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substr(2, 9);
  return `${timestamp}-${randomStr}`;
};

// Converte arquivo para base64
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

// Download de imagem com melhor UX
export const downloadImage = (url: string, filename: string, transparent: boolean = false) => {
  // Cria um canvas para processar a imagem se necessário
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}${transparent ? '_transparent.png' : '.jpg'}`;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  
  // Adiciona ao DOM temporariamente
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Analytics simulado
  console.log(`Download iniciado: ${filename}${transparent ? ' (PNG transparente)' : ' (JPG)'}`);
};

// Validação mais robusta de fotos do usuário
export const validateUserPhoto = (file: File): { valid: boolean; message: string } => {
  const maxSize = 10 * 1024 * 1024; // 10MB
  const minSize = 50 * 1024; // 50KB mínimo
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

  if (!allowedTypes.includes(file.type)) {
    return { 
      valid: false, 
      message: 'Formato não suportado. Use JPG, PNG ou WEBP para melhor resultado.' 
    };
  }

  if (file.size > maxSize) {
    return { 
      valid: false, 
      message: 'Imagem muito grande. Máximo 10MB para processamento otimizado.' 
    };
  }

  if (file.size < minSize) {
    return { 
      valid: false, 
      message: 'Imagem muito pequena. Use uma foto com melhor resolução.' 
    };
  }

  // Validação adicional baseada no nome
  const fileName = file.name.toLowerCase();
  if (fileName.includes('screenshot') || fileName.includes('screen')) {
    return { 
      valid: true, 
      message: 'Foto válida! Dica: fotos tiradas diretamente funcionam melhor que screenshots.' 
    };
  }

  return { 
    valid: true, 
    message: 'Perfeito! Sua foto está pronta para o processamento com IA.' 
  };
};

// Dados expandidos de roupas populares
export const getPopularClothing = (): ClothingItem[] => {
  return [
    {
      id: '1',
      name: 'Camisa Social Branca Clássica',
      category: 'shirt',
      imageUrl: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&h=400&fit=crop',
      brand: 'Style Co.',
      price: 89.90
    },
    {
      id: '2',
      name: 'Vestido Floral Verão Elegante',
      category: 'dress',
      imageUrl: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=300&h=400&fit=crop',
      brand: 'Fashion Plus',
      price: 159.90
    },
    {
      id: '3',
      name: 'Jaqueta Jeans Clássica Vintage',
      category: 'jacket',
      imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=400&fit=crop',
      brand: 'Denim Co.',
      price: 199.90
    },
    {
      id: '4',
      name: 'Calça Jeans Skinny Premium',
      category: 'pants',
      imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=400&fit=crop',
      brand: 'Urban Style',
      price: 129.90
    },
    {
      id: '5',
      name: 'Blazer Executivo Moderno',
      category: 'jacket',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop',
      brand: 'Business Elite',
      price: 299.90
    },
    {
      id: '6',
      name: 'Vestido Cocktail Noturno',
      category: 'dress',
      imageUrl: 'https://images.unsplash.com/photo-1566479179817-c0ae8e8e5e5e?w=300&h=400&fit=crop',
      brand: 'Night Glamour',
      price: 249.90
    },
    {
      id: '7',
      name: 'Camiseta Básica Premium',
      category: 'shirt',
      imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=400&fit=crop',
      brand: 'Essential Wear',
      price: 49.90
    },
    {
      id: '8',
      name: 'Calça Social Alfaiataria',
      category: 'pants',
      imageUrl: 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=300&h=400&fit=crop',
      brand: 'Formal Line',
      price: 179.90
    }
  ];
};

// Função para comprimir imagem antes do upload
export const compressImage = (file: File, maxWidth: number = 1024, quality: number = 0.8): Promise<File> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    const img = new Image();
    
    img.onload = () => {
      // Calcula dimensões mantendo proporção
      const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
      canvas.width = img.width * ratio;
      canvas.height = img.height * ratio;
      
      // Desenha imagem redimensionada
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      // Converte para blob
      canvas.toBlob((blob) => {
        if (blob) {
          const compressedFile = new File([blob], file.name, {
            type: file.type,
            lastModified: Date.now()
          });
          resolve(compressedFile);
        } else {
          resolve(file); // Fallback para arquivo original
        }
      }, file.type, quality);
    };
    
    img.src = URL.createObjectURL(file);
  });
};

// Análise de qualidade da imagem
export const analyzeImageQuality = (file: File): Promise<{
  score: number;
  suggestions: string[];
}> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      let score = 100;
      const suggestions: string[] = [];
      
      // Verifica resolução
      if (img.width < 400 || img.height < 400) {
        score -= 30;
        suggestions.push('Use uma foto com resolução maior para melhor resultado');
      }
      
      // Verifica proporção
      const ratio = img.width / img.height;
      if (ratio < 0.5 || ratio > 2) {
        score -= 20;
        suggestions.push('Prefira fotos com proporção mais equilibrada');
      }
      
      // Verifica tamanho do arquivo (indica qualidade)
      if (file.size < 200 * 1024) { // Menos de 200KB
        score -= 15;
        suggestions.push('Foto pode estar muito comprimida, use qualidade maior');
      }
      
      if (score >= 80) {
        suggestions.push('Excelente qualidade! Resultado será ótimo');
      } else if (score >= 60) {
        suggestions.push('Boa qualidade, mas pode melhorar');
      }
      
      resolve({ score: Math.max(score, 0), suggestions });
    };
    
    img.src = URL.createObjectURL(file);
  });
};