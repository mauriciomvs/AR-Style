'use client';

import { useState } from 'react';
import { Toaster } from 'sonner';
import WelcomeScreen from '@/components/WelcomeScreen';
import PhotoUpload from '@/components/PhotoUpload';
import ClothingUpload from '@/components/ClothingUpload';
import AIProcessing from '@/components/AIProcessing';
import ResultView from '@/components/ResultView';
import GalleryTab from '@/components/GalleryTab';
import ExploreTab from '@/components/ExploreTab';
import ProfileTab from '@/components/ProfileTab';
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

  // Render Explore Tab
  if (activeTab === 'explore') {
    return (
      <>
        <ExploreTab />
        <Navigation activeTab={activeTab} onTabChange={handleTabChange} />
        <Toaster position="top-center" richColors />
      </>
    );
  }

  // Render Profile Tab
  if (activeTab === 'profile') {
    return (
      <>
        <ProfileTab />
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