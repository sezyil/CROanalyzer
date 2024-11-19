export interface User {
  id: string;
  email: string;
  name?: string;
  role: 'USER' | 'ADMIN';
  subscription?: Subscription;
}

export interface Website {
  id: string;
  url: string;
  name: string;
  userId: string;
  analyses: Analysis[];
  abTests: ABTest[];
}

export interface Analysis {
  id: string;
  websiteId: string;
  score: number;
  insights: AnalysisInsights;
  metrics: AnalysisMetrics;
  createdAt: string;
  updatedAt: string;
}

export interface AnalysisInsights {
  layout: LayoutInsight[];
  content: ContentInsight[];
  performance: PerformanceInsight[];
  seo: SEOInsight[];
  accessibility: AccessibilityInsight[];
}

export interface BaseInsight {
  id: string;
  type: string;
  title: string;
  description: string;
  impact: 'LOW' | 'MEDIUM' | 'HIGH';
  confidence: number;
  recommendation: string;
}

export interface LayoutInsight extends BaseInsight {
  type: 'LAYOUT';
  elementPath: string;
  currentValue: string;
  recommendedValue: string;
}

export interface ContentInsight extends BaseInsight {
  type: 'CONTENT';
  location: string;
  currentContent: string;
  suggestedContent: string;
}

export interface PerformanceInsight extends BaseInsight {
  type: 'PERFORMANCE';
  metric: string;
  currentValue: number;
  threshold: number;
  unit: string;
}

export interface SEOInsight extends BaseInsight {
  type: 'SEO';
  category: string;
  currentState: string;
  recommendedState: string;
}

export interface AccessibilityInsight extends BaseInsight {
  type: 'ACCESSIBILITY';
  wcagGuideline: string;
  currentState: string;
  requiredState: string;
}

export interface AnalysisMetrics {
  conversionRate: number;
  bounceRate: number;
  averageSessionDuration: number;
  pageViews: number;
  uniqueVisitors: number;
  exitRate: number;
  loadTime: number;
  mobileUsage: number;
  deviceBreakdown: DeviceMetrics;
  formCompletionRate: number;
  ctaClickRate: number;
}

export interface DeviceMetrics {
  desktop: number;
  mobile: number;
  tablet: number;
}

export interface ABTest {
  id: string;
  websiteId: string;
  name: string;
  status: 'DRAFT' | 'RUNNING' | 'COMPLETED' | 'STOPPED';
  variants: ABTestVariant[];
  results?: ABTestResults;
  startDate: string;
  endDate?: string;
}

export interface ABTestVariant {
  id: string;
  name: string;
  changes: ABTestChange[];
  traffic: number;
}

export interface ABTestChange {
  elementPath: string;
  type: 'STYLE' | 'CONTENT' | 'LAYOUT';
  originalValue: string;
  newValue: string;
}

export interface ABTestResults {
  winner?: string;
  metrics: {
    [variantId: string]: {
      visitors: number;
      conversions: number;
      conversionRate: number;
      revenue?: number;
      confidence: number;
    };
  };
}

export interface Subscription {
  id: string;
  userId: string;
  plan: 'FREE' | 'PRO' | 'ENTERPRISE';
  status: 'ACTIVE' | 'CANCELED' | 'PAST_DUE';
  currentPeriodEnd: string;
}

export interface APIError {
  message: string;
  code: string;
  status: number;
  details?: Record<string, unknown>;
}
