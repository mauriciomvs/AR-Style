'use client';

import { useState } from 'react';
import { Toaster } from 'sonner';
import WelcomeScreen from '@/components/WelcomeScreen';
import PhotoUpload from '@/components/PhotoUpload';
import ClothingUpload from '@/components/ClothingUpload';
import AIProcessing from '@/components/AIProcessing';
import ResultView from '@/components/ResultView';
import GalleryTab from '@/components/GalleryTab';
import Navigation from '@/components/Navigation';
import { TryOnResult, ClothingItem, TabType, GalleryItem } from '@/lib/types';

type AppStep = 'welcome' | 'photo-upload' | 'clothing-upload' | 'processing' | 'result';

export default function ARStyleApp() {
  // App State
  const [currentStep, setCurrentStep] = useState<AppStep>('welcome');
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [showMainApp, setShowMainApp] = useState(false);

  // Try-on State
  const [userPhoto, setUserPhoto] = useState<File | null>(null);
  const [selectedClothing, setSelectedClothing] = useState<ClothingItem | null>(null);
  const [currentResult, setCurrentResult] = useState<TryOnResult | null>(null);

  // Gallery State
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);

  // Welcome Screen Handlers
  const handleGetStarted = () => {
    setShowMainApp(true);
    setCurrentStep('photo-upload');
  };

  // Photo Upload Handlers
  const handlePhotoSelected = (file: File) => {
    setUserPhoto(file);
    setCurrentStep('clothing-upload');
  };

  const handleBackToPhoto = () => {
    setCurrentStep('photo-upload');
  };

  // Clothing Upload Handlers
  const handleClothingSelected = (clothing: ClothingItem) => {
    setSelectedClothing(clothing);
    setCurrentStep('processing');
  };

  const handleBackToClothing = () => {
    setCurrentStep('clothing-upload');
  };

  // Processing Handlers
  const handleProcessingComplete = (result: TryOnResult) => {
    setCurrentResult(result);
    setCurrentStep('result');
  };

  // Result Handlers
  const handleTryAnother = () => {
    setCurrentStep('clothing-upload');
  };

  const handleSaveToGallery = (result: TryOnResult) => {
    const galleryItem: GalleryItem = {
      ...result,
      tags: ['novo', 'ia-gerado'],
      isPublic: false
    };
    setGalleryItems(prev => [galleryItem, ...prev]);
  };

  // Gallery Handlers
  const handleDeleteGalleryItem = (id: string) => {
    setGalleryItems(prev => prev.filter(item => item.id !== id));
  };

  // Tab Navigation
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    if (tab === 'home') {
      setCurrentStep('photo-upload');
    }
  };

  // Render Welcome Screen
  if (!showMainApp) {
    return (
      <>
        <WelcomeScreen onGetStarted={handleGetStarted} />
        <Toaster position="top-center" richColors />
      </>
    );
  }

  // Render Gallery Tab
  if (activeTab === 'gallery') {
    return (
      <>
        <GalleryTab 
          galleryItems={galleryItems}
          onDeleteItem={handleDeleteGalleryItem}
        />
        <Navigation activeTab={activeTab} onTabChange={handleTabChange} />
        <Toaster position="top-center" richColors />
      </>
    );
  }

  // Render Explore Tab (Placeholder)
  if (activeTab === 'explore') {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-slate-100 p-4 pb-24">
          <div className="max-w-4xl mx-auto pt-8">
            <div className="text-center py-16">
              <div className="p-6 bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl w-fit mx-auto mb-6">
                <span className="text-4xl">🔍</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Explorar Looks
              </h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Em breve você poderá descobrir tendências, looks populares e inspirações da comunidade AR Style!
              </p>
            </div>
          </div>
        </div>
        <Navigation activeTab={activeTab} onTabChange={handleTabChange} />
        <Toaster position="top-center" richColors />
      </>
    );
  }

  // Render Profile Tab (Placeholder)
  if (activeTab === 'profile') {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-slate-100 p-4 pb-24">
          <div className="max-w-4xl mx-auto pt-8">
            <div className="text-center py-16">
              <div className="p-6 bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl w-fit mx-auto mb-6">
                <span className="text-4xl">👤</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Meu Perfil
              </h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Gerencie suas preferências, configurações de privacidade e dados da conta.
              </p>
            </div>
          </div>
        </div>
        <Navigation activeTab={activeTab} onTabChange={handleTabChange} />
        <Toaster position="top-center" richColors />
      </>
    );
  }

  // Render Main Try-on Flow
  return (
    <>
      {currentStep === 'photo-upload' && (
        <PhotoUpload 
          onPhotoSelected={handlePhotoSelected}
          onBack={() => setShowMainApp(false)}
        />
      )}

      {currentStep === 'clothing-upload' && (
        <ClothingUpload 
          onClothingSelected={handleClothingSelected}
          onBack={handleBackToPhoto}
        />
      )}

      {currentStep === 'processing' && userPhoto && selectedClothing && (
        <AIProcessing 
          userPhoto={userPhoto}
          clothingItem={selectedClothing}
          onComplete={handleProcessingComplete}
        />
      )}

      {currentStep === 'result' && currentResult && (
        <ResultView 
          result={currentResult}
          onTryAnother={handleTryAnother}
          onSaveToGallery={handleSaveToGallery}
        />
      )}

      {/* Navigation - only show after welcome */}
      {showMainApp && (
        <Navigation activeTab={activeTab} onTabChange={handleTabChange} />
      )}

      <Toaster position="top-center" richColors />
    </>
  );
}