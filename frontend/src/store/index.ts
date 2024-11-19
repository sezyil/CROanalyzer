import { create } from 'zustand';
import { User, Website, Analysis, ABTest } from '../types';

interface AuthState {
  user: User | null;
  token: string | null;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
}

interface WebsiteState {
  websites: Website[];
  currentWebsite: Website | null;
  setWebsites: (websites: Website[]) => void;
  setCurrentWebsite: (website: Website | null) => void;
  addWebsite: (website: Website) => void;
  updateWebsite: (website: Website) => void;
  deleteWebsite: (websiteId: string) => void;
}

interface AnalysisState {
  analyses: Analysis[];
  currentAnalysis: Analysis | null;
  setAnalyses: (analyses: Analysis[]) => void;
  setCurrentAnalysis: (analysis: Analysis | null) => void;
  addAnalysis: (analysis: Analysis) => void;
  updateAnalysis: (analysis: Analysis) => void;
}

interface ABTestState {
  tests: ABTest[];
  currentTest: ABTest | null;
  setTests: (tests: ABTest[]) => void;
  setCurrentTest: (test: ABTest | null) => void;
  addTest: (test: ABTest) => void;
  updateTest: (test: ABTest) => void;
  deleteTest: (testId: string) => void;
}

interface UIState {
  isLoading: boolean;
  error: string | null;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem('token'),
  setUser: (user) => set({ user }),
  setToken: (token) => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
    set({ token });
  },
  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null });
  },
}));

export const useWebsiteStore = create<WebsiteState>((set) => ({
  websites: [],
  currentWebsite: null,
  setWebsites: (websites) => set({ websites }),
  setCurrentWebsite: (currentWebsite) => set({ currentWebsite }),
  addWebsite: (website) => 
    set((state) => ({ websites: [...state.websites, website] })),
  updateWebsite: (website) =>
    set((state) => ({
      websites: state.websites.map((w) => (w.id === website.id ? website : w)),
      currentWebsite: state.currentWebsite?.id === website.id ? website : state.currentWebsite,
    })),
  deleteWebsite: (websiteId) =>
    set((state) => ({
      websites: state.websites.filter((w) => w.id !== websiteId),
      currentWebsite: state.currentWebsite?.id === websiteId ? null : state.currentWebsite,
    })),
}));

export const useAnalysisStore = create<AnalysisState>((set) => ({
  analyses: [],
  currentAnalysis: null,
  setAnalyses: (analyses) => set({ analyses }),
  setCurrentAnalysis: (currentAnalysis) => set({ currentAnalysis }),
  addAnalysis: (analysis) =>
    set((state) => ({ analyses: [...state.analyses, analysis] })),
  updateAnalysis: (analysis) =>
    set((state) => ({
      analyses: state.analyses.map((a) => (a.id === analysis.id ? analysis : a)),
      currentAnalysis: state.currentAnalysis?.id === analysis.id ? analysis : state.currentAnalysis,
    })),
}));

export const useABTestStore = create<ABTestState>((set) => ({
  tests: [],
  currentTest: null,
  setTests: (tests) => set({ tests }),
  setCurrentTest: (currentTest) => set({ currentTest }),
  addTest: (test) =>
    set((state) => ({ tests: [...state.tests, test] })),
  updateTest: (test) =>
    set((state) => ({
      tests: state.tests.map((t) => (t.id === test.id ? test : t)),
      currentTest: state.currentTest?.id === test.id ? test : state.currentTest,
    })),
  deleteTest: (testId) =>
    set((state) => ({
      tests: state.tests.filter((t) => t.id !== testId),
      currentTest: state.currentTest?.id === testId ? null : state.currentTest,
    })),
}));

export const useUIStore = create<UIState>((set) => ({
  isLoading: false,
  error: null,
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));
