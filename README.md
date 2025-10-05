# FIT5120-JobDetective 🕵️

A comprehensive web application designed to help young job seekers in Australia detect and avoid job scams using AI-powered analysis, real-time statistics, and educational resources.

## 🌟 Key Features

### 🏠 **Home Page**

- **Hero Section**: Eye-catching introduction with call-to-action
- **Feature Highlights**: Digital safety, real-time alerts, and smart decision-making tools
- **Live Statistics**: Real-time Australian job scam data with 24-hour caching
- **Dynamic Content**: Responsive design with animated elements

### 🔍 **Job Analysis Engine** (`/analyse`)

Advanced AI-powered scam detection with multiple input methods:

- **📁 File Upload**: Support for PNG, JPG, WebP, and PDF files (max 1MB)
  - Image preview functionality
  - PDF document recognition
  - Base64 conversion for secure processing

- **🔗 URL Analysis**: Direct job posting URL scanning
  - Website content extraction
  - Domain verification
  - Real-time processing

- **📝 Text Analysis**: Manual job description input
  - 5000 character limit
  - Real-time validation
  - Instant feedback

### 📊 **Analysis Reports**

- **Risk Assessment**: Color-coded risk levels (Low/Medium/High)
- **Red Flag Detection**: Detailed breakdown of suspicious elements
- **Safety Recommendations**: Personalized tips based on analysis
- **Algorithm Transparency**: Clear explanation of assessment reasoning

### 🎯 **Awareness Hub** (`/hub`)

Comprehensive educational platform with:

- **📋 Interactive Checklist**: "Before You Apply" with progress tracking
  - 4-step verification process
  - Persistent progress storage
  - External resource links (LinkedIn, Seek, Glassdoor, etc.)
  - Reset functionality with confirmation

- **📈 Live Statistics**: Embedded Tableau dashboard
  - Australian scam trends
  - Interactive visualizations
  - Real-time data updates

- **📰 News Carousel**: Latest scam alerts and warnings
  - Responsive design
  - External news sources

### 🔧 **Additional Features**

- **Responsive Design**: Mobile-first approach with detailed breakpoints
- **Error Handling**: Comprehensive error modals with alternative suggestions
- **Loading States**: Smooth loading animations for all async operations
- **Caching System**: 24-hour localStorage cache for performance optimization
- **Accessibility**: Screen reader compatible with proper ARIA labels

## 🛠️ Technology Stack

### **Frontend**

- **Framework**: Vue 3 (Composition API + Options API)
- **Build Tool**: Vite 7.0.6
- **Routing**: Vue Router 4.5.1 with custom scroll behavior
- **Styling**: Bootstrap 5.3.8 + Custom CSS with modern gradients
- **Components**: Modular component architecture

### **Backend & APIs**

- **API Gateway**: AWS API Gateway with CORS support
- **Compute**: AWS Lambda functions for processing
- **Database**: MySQL hosted on AWS RDS
- **File Processing**: Base64 encoding for secure file uploads

### **External Integrations**

- **Statistics**: ScamWatch Australian data
- **Visualization**: Tableau Public dashboards
- **News**: NewsAPI.org API integration

### **Development Tools**

- **Linting**: ESLint 9.31.0 with Vue plugin
- **Formatting**: Prettier 3.6.2
- **DevTools**: Vue DevTools integration
- **Environment**: Node.js 20.19.0+ || 22.12.0+

## 📁 Detailed Project Structure

```text
fit5120-jobdetective/
├── public/
│   └── favicon.ico                    # App favicon
├── src/
│   ├── assets/                        # Static resources
│   │   ├── images/                    # Illustrations and graphics
│   │   │   ├── illustration.svg       # Hero section illustration
│   │   │   ├── ilus2.svg             # Secondary illustrations
│   │   │   ├── ilus3.svg             # Home page graphics
│   │   │   ├── ilus4.svg             # Statistics section
│   │   │   ├── newman.png            # Profile images
│   │   │   └── screen.png            # Screenshots
│   │   ├── logo.svg                  # App logo
│   │   ├── base.css                  # CSS reset and base styles
│   │   └── main.css                  # Global styles and utilities
│   │
│   ├── components/                    # Reusable UI components
│   │   ├── icons/                    # SVG icon components
│   │   │   ├── IconCommunity.vue     # Community icon
│   │   │   ├── IconDocumentation.vue # Docs icon
│   │   │   ├── IconEcosystem.vue     # Ecosystem icon
│   │   │   ├── IconSupport.vue       # Support icon
│   │   │   └── IconTooling.vue       # Tooling icon
│   │   ├── hub/                      # Awareness hub section modules
│   │   │   ├── CallToActionSection.vue # Analyse CTA panel
│   │   │   ├── ChecklistSection.vue  # Interactive safety checklist
│   │   │   ├── NewsSection.vue       # News carousel wrapper
│   │   │   ├── ScamReportsSection.vue # Recent scam submissions feed
│   │   │   └── StatisticsSection.vue # Tableau statistics wrapper
│   │   ├── BaseButton.vue            # Multi-variant button component
│   │   ├── ErrorDisplay.vue          # Error handling component
│   │   ├── FeatureCard.vue           # Feature showcase cards
│   │   ├── FilterTabs.vue            # Content filtering tabs
│   │   ├── LoadingSpinner.vue        # Loading state component
│   │   ├── NavFooter.vue             # Footer navigation
│   │   ├── NavigationBar.vue         # Main navigation header
│   │   ├── NewsCarousel.vue          # News slider component
│   │   ├── SectionHeader.vue         # Section title component
│   │   └── TabNavigation.vue         # Tab switching interface
│   │
│   ├── router/                       # Vue Router configuration
│   │   └── index.js                  # Routes and navigation logic
│   │
│   ├── views/                        # Main application pages
│   │   ├── AboutView.vue             # About/Contact page
│   │   ├── AnalyzeView.vue           # Job analysis interface
│   │   ├── HomeView.vue              # Landing page with statistics
│   │   ├── HubView.vue               # Educational awareness hub
│   │   └── ReportView.vue            # Analysis results display
│   │
│   ├── App.vue                       # Root application component
│   └── main.js                       # Application entry point
│
├── dist/                             # Production build output
├── node_modules/                     # Dependencies
├── eslint.config.js                  # ESLint configuration
├── jsconfig.json                     # JavaScript project config
├── package.json                      # Project dependencies and scripts
├── package-lock.json                 # Dependency lock file
├── vite.config.js                    # Vite build configuration
└── README.md                         # Project documentation
```

## 🚀 Getting Started

### **Prerequisites**

- Node.js 20.19.0+ or 22.12.0+
- npm or yarn package manager

### **Installation**

```bash
# Clone the repository
git clone <repository-url>
cd fit5120-jobdetective

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### **Development Scripts**

```bash
npm run dev      # Start development server with hot reload
npm run build    # Create production build
npm run preview  # Preview production build locally
npm run lint     # Run ESLint with auto-fix
npm run format   # Format code with Prettier
```

## 🌐 Deployment

### **Current Deployment**

- **Platform**: Digital Ocean App Platform
- **URL**: [https://jobdetective-nkb32.ondigitalocean.app/](https://jobdetective-nkb32.ondigitalocean.app/)
- **Build Command**: `npm run build`
- **Output Directory**: `dist/`

## 📊 Data Sources & APIs

### **Primary Data Sources**

- **ScamWatch Australia**: Official government scam statistics
- **Kaggle**: Fake and Real Job Dataset
- **ASIC Company Registry**: Official Company name list

### **API Endpoints**

- **Statistics API**: Real-time scam data with caching
- **File Analysis API**: Image and PDF processing
- **URL Analysis API**: Website content extraction
- **Text Analysis API**: Direct text processing
- **Get News API**: Get recent job related scam news

## 🔒 Security & Privacy

- **File Processing**: Secure base64 encoding for uploads
- **API Security**: API key authentication for all endpoints
- **Data Privacy**: No personal data storage, analysis only
- **CORS Protection**: Proper cross-origin resource sharing setup

---
