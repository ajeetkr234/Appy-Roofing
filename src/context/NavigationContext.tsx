import React, { createContext, useContext, useState, useEffect } from 'react';

export type PageType = 'home' | 'services' | 'projects' | 'materials' | 'reviews' | 'about' | 'contact';

interface NavigationContextType {
  currentPage: PageType;
  navigate: (page: PageType, hash?: string) => void;
}

const NavigationContext = createContext<NavigationContextType>({
  currentPage: 'home',
  navigate: () => {},
});

const getPageFromUrl = (): PageType => {
  const path = window.location.pathname.toLowerCase().replace(/^\//, '');
  const hash = window.location.hash.toLowerCase().replace(/^#\/?/, '');

  const target = path || hash;

  if (target.startsWith('service')) return 'services';
  if (target.startsWith('project')) return 'projects';
  if (target.startsWith('material')) return 'materials';
  if (target.startsWith('review')) return 'reviews';
  if (target.startsWith('about') || target.startsWith('why-choose-us')) return 'about';
  if (target.startsWith('contact') || target.startsWith('estimate')) return 'contact';

  return 'home';
};

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PageType>(getPageFromUrl);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(getPageFromUrl());
      window.scrollTo({ top: 0, behavior: 'instant' });
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  const navigate = (page: PageType, hash?: string) => {
    setCurrentPage(page);
    const newPath = page === 'home' ? '/' : `/${page}`;
    const fullUrl = hash ? `${newPath}#${hash}` : newPath;

    window.history.pushState({ page }, '', fullUrl);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <NavigationContext.Provider value={{ currentPage, navigate }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => useContext(NavigationContext);
