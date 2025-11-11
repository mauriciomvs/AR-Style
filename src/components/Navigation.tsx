'use client';

import { Home, Image, Compass, User, Sparkles } from 'lucide-react';
import { TabType } from '@/lib/types';

interface NavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export default function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const tabs = [
    { id: 'home' as TabType, label: 'Início', icon: Home },
    { id: 'gallery' as TabType, label: 'Galeria', icon: Image },
    { id: 'explore' as TabType, label: 'Explorar', icon: Compass },
    { id: 'profile' as TabType, label: 'Perfil', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-t border-purple-200 z-50">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-around py-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex flex-col items-center space-y-1 py-2 px-4 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{tab.label}</span>
                {isActive && (
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2">
                    <Sparkles className="w-3 h-3 text-purple-300" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}