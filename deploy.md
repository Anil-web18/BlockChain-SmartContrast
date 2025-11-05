# Supply Chain Deployment Guide

## 🚀 Quick Deployment Options

### 1. Netlify (Frontend Only)
```bash
# Build and deploy frontend
cd frontend/supplychain-frontend
npm install
npm run build

# Deploy to Netlify
npx netlify-cli deploy --prod --dir=build
```

### 2. Vercel (Full-Stack)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy entire project
vercel --prod
```

### 3. Docker (Local/Cloud)
```bash
# Build and run container
docker build -t supplychain-app .
docker run -p 5000:5000 supplychain-app
```

### 4. GitHub Pages (Frontend)
```bash
# Add to package.json
"homepage": "https://yourusername.github.io/repository-name"

# Install gh-pages
npm install --save-dev gh-pages

# Add deploy script
"deploy": "npm run build && gh-pages -d build"

# Deploy
npm run deploy
```

## 🔧 Environment Setup

### Frontend (.env)
```
REACT_APP_API_URL=https://your-backend-url.com
REACT_APP_BLOCKCHAIN_NETWORK=mainnet
```

### Backend (.env)
```
PORT=5000
MONGODB_URI=your-mongodb-connection
AWS_ACCESS_KEY_ID=your-aws-key
AWS_SECRET_ACCESS_KEY=your-aws-secret
TWILIO_ACCOUNT_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-token
```

## 📱 PWA Features
- Offline functionality
- Push notifications
- Mobile app installation
- Service worker caching

## 🌐 Live Demo URLs
- Frontend: https://your-app.netlify.app
- Full-Stack: https://your-app.vercel.app
- Docker: http://localhost:5000