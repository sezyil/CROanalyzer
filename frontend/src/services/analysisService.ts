interface AnalysisResult {
  overallScore: number
  metrics: {
    name: string
    score: number
    description: string
    status: 'good' | 'warning' | 'poor'
  }[]
  recommendations: {
    title: string
    description: string
    isPremium: boolean
  }[]
}

export const analyzeWebsite = async (url: string): Promise<AnalysisResult> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000))

  // Mock analysis result
  return {
    overallScore: 75,
    metrics: [
      {
        name: 'Page Load Speed',
        score: 85,
        description: 'Your website loads quickly on both desktop and mobile devices.',
        status: 'good'
      },
      {
        name: 'Mobile Responsiveness',
        score: 70,
        description: 'Your website adapts well to mobile devices but has some minor issues.',
        status: 'warning'
      },
      {
        name: 'Call-to-Action Visibility',
        score: 60,
        description: 'Your primary CTAs need more prominence and better placement.',
        status: 'warning'
      },
      {
        name: 'Trust Indicators',
        score: 90,
        description: 'Strong social proof and security indicators throughout the site.',
        status: 'good'
      },
      {
        name: 'Checkout Flow',
        score: 65,
        description: 'Your checkout process has several friction points that need attention.',
        status: 'warning'
      },
      {
        name: 'Product Information',
        score: 80,
        description: 'Product descriptions and images are detailed and helpful.',
        status: 'good'
      }
    ],
    recommendations: [
      {
        title: 'Optimize Mobile Navigation',
        description: 'Simplify the mobile menu structure and increase touch target sizes for better usability.',
        isPremium: false
      },
      {
        title: 'Enhance CTA Visibility',
        description: 'Use contrasting colors and strategic placement to make your CTAs stand out more.',
        isPremium: false
      },
      {
        title: 'Streamline Checkout Process',
        description: 'Reduce form fields and add progress indicators in the checkout flow.',
        isPremium: false
      },
      {
        title: 'Advanced A/B Testing Strategy',
        description: 'Detailed testing plan for optimizing product page layouts and pricing displays.',
        isPremium: true
      },
      {
        title: 'Personalization Engine Setup',
        description: 'Implementation plan for dynamic content based on user behavior and preferences.',
        isPremium: true
      }
    ]
  }
}

export const authService = {
  login: async (email: string, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    // Mock successful login
    localStorage.setItem('isAuthenticated', 'true')
    return { success: true }
  },
  
  signup: async (email: string, password: string, companyName: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    // Mock successful signup
    localStorage.setItem('isAuthenticated', 'true')
    return { success: true }
  },
  
  logout: () => {
    localStorage.removeItem('isAuthenticated')
  },
  
  isAuthenticated: () => {
    return localStorage.getItem('isAuthenticated') === 'true'
  }
}
