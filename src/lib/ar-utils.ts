// Utilitários para processamento de imagem e IA

import { ProcessingStatus, TryOnResult, ClothingItem } from './types';

// Simula o processamento de IA para try-on virtual
export const processVirtualTryOn = async (
  userPhotoFile: File,
  clothingItem: ClothingItem,
  onProgress: (status: ProcessingStatus) => void
): Promise<TryOnResult> => {
  // Simula o processo de IA
  const steps = [
    { progress: 10, message: 'Analisando sua foto...' },
    { progress: 30, message: 'Detectando corpo e postura...' },
    { progress: 50, message: 'Segmentando a roupa...' },
    { progress: 70, message: 'Ajustando tamanho e perspectiva...' },
    { progress: 85, message: 'Aplicando iluminação realista...' },
    { progress: 95, message: 'Finalizando resultado...' },
    { progress: 100, message: 'Pronto! Seu look está incrível!' }
  ];

  for (const step of steps) {
    onProgress({
      status: 'processing',
      progress: step.progress,
      message: step.message
    });
    await new Promise(resolve => setTimeout(resolve, 800));
  }

  // Simula URLs de resultado (em produção seria gerado pela IA)
  const resultImageUrl = `https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=600&fit=crop`;
  const transparentResultUrl = `https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=600&fit=crop&bg=transparent`;

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
    message: 'Processamento concluído!'
  });

  return result;
};

// Detecta automaticamente o tipo de roupa
export const detectClothingType = (imageFile: File): Promise<ClothingItem['category']> => {
  return new Promise((resolve) => {
    // Simula detecção de IA
    setTimeout(() => {
      const types: ClothingItem['category'][] = ['shirt', 'pants', 'dress', 'jacket'];
      const randomType = types[Math.floor(Math.random() * types.length)];
      resolve(randomType);
    }, 1000);
  });
};

// Gera ID único
export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
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

// Simula download de imagem
export const downloadImage = (url: string, filename: string, transparent: boolean = false) => {
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}${transparent ? '_transparent.png' : '.jpg'}`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Valida se a imagem é adequada para try-on
export const validateUserPhoto = (file: File): { valid: boolean; message: string } => {
  const maxSize = 10 * 1024 * 1024; // 10MB
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

  if (!allowedTypes.includes(file.type)) {
    return { valid: false, message: 'Formato não suportado. Use JPG, PNG ou WEBP.' };
  }

  if (file.size > maxSize) {
    return { valid: false, message: 'Imagem muito grande. Máximo 10MB.' };
  }

  return { valid: true, message: 'Imagem válida!' };
};

// Simula dados de roupas populares
export const getPopularClothing = (): ClothingItem[] => {
  return [
    {
      id: '1',
      name: 'Camisa Social Branca',
      category: 'shirt',
      imageUrl: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&h=400&fit=crop',
      brand: 'Style Co.',
      price: 89.90
    },
    {
      id: '2',
      name: 'Vestido Floral Verão',
      category: 'dress',
      imageUrl: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=300&h=400&fit=crop',
      brand: 'Fashion Plus',
      price: 159.90
    },
    {
      id: '3',
      name: 'Jaqueta Jeans Clássica',
      category: 'jacket',
      imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=400&fit=crop',
      brand: 'Denim Co.',
      price: 199.90
    },
    {
      id: '4',
      name: 'Calça Jeans Skinny',
      category: 'pants',
      imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=400&fit=crop',
      brand: 'Urban Style',
      price: 129.90
    }
  ];
};