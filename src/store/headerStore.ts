import { create } from 'zustand';
import { SearchResult } from '@/types';

// Zustand store for header state management
interface HeaderState {
  activeDropdown: string | null;
  isMobileMenuOpen: boolean;
  searchQuery: string;
  searchResults: SearchResult[];
  isSearchLoading: boolean;
  isSearchOpen: boolean;
  setActiveDropdown: (dropdown: string | null) => void;
  setMobileMenuOpen: (open: boolean) => void;
  setSearchQuery: (query: string) => void;
  setSearchResults: (results: SearchResult[]) => void;
  setIsSearchLoading: (loading: boolean) => void;
  setIsSearchOpen: (open: boolean) => void;
}

export const useHeaderStore = create<HeaderState>((set) => ({
  activeDropdown: null,
  isMobileMenuOpen: false,
  searchQuery: '',
  searchResults: [],
  isSearchLoading: false,
  isSearchOpen: false,
  setActiveDropdown: (dropdown) => set({ activeDropdown: dropdown }),
  setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSearchResults: (results) => set({ searchResults: results }),
  setIsSearchLoading: (loading) => set({ isSearchLoading: loading }),
  setIsSearchOpen: (open) => set({ isSearchOpen: open }),
}));