# FIT5120-JobDetective

A web application designed to help young job seekers in Australia detect and avoid job scams using AI-powered analysis and real-time scam statistics.

## 🌟 Features

### 🏠 Home Page

- Overview of the job scam problem
- Quick navigation to scam analysis and statistics

### 🔎 Analyze Job Page

- AI-powered analysis of job ads and offers
- Upload, paste, or enter job details for instant risk assessment
- Detailed breakdown of scam indicators

## 🛠️ Technology Stack

- **Frontend**: Vue 3 with Vite
- **UI Framework**: Custom Vue components
- **Routing**: Vue Router
- **Styling**: Tailwind CSS & custom styles
- **Backend/API**: AWS API Gateway + Lambda
- **Database**: PostgreSQL database hosted on AWS
- **Build Tool**: Vite
- **Linting**: ESLint

## 📁 Project Structure

```text
src/
├── components/          # Reusable UI components (buttons, cards, navigation)
├── views/               # Main application views (Home, Analyze, Report, Login)
├── router/              # Vue Router configuration
├── assets/              # Images and static resources
└── main.js              # App entry point
```

## 🌐 Deployment

The application is configured for deployment with:

- **Production build**: `npm run build`
- **Digital Ocean**: Currently deployed at [https://iteration1-jobdetective-2x3av.ondigitalocean.app/](https://iteration1-jobdetective-2x3av.ondigitalocean.app/)

## 📊 Data Sources

- **ScamWatch**: Australian job scam statistics
- **OpenAI AI Agent**: Job scam detection and analysis

---
