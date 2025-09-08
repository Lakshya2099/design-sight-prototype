# DesignSight 🎨

**AI-Powered Design Analysis Platform**

A full-stack application that uses artificial intelligence to analyze design screenshots and provide contextual feedback for developers, designers, and QA teams.

## ✨ Features

- **Smart Image Upload**: Upload design screenshots with automatic project association
- **AI-Powered Analysis**: Get intelligent feedback on UI/UX, accessibility, and performance
- **Role-Based Filtering**: View feedback specific to your role (Developer, Designer, QA)
- **Interactive Feedback**: Click on feedback points to see detailed suggestions
- **Real-time Processing**: Live analysis status with polling for completion
- **Responsive Design**: Works seamlessly across different screen sizes

## 🚀 Quick Start with Docker

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd design-sight
   ```

2. **Set up environment**
   ```bash
   cp .env.example .env
   # Add your OpenAI API key to .env file
   ```

3. **Run the application**
   ```bash
   docker-compose up
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5001

## 🛠️ Technology Stack

### Frontend
- **React.js** - Modern UI library
- **Vite** - Fast development build tool
- **Axios** - HTTP client for API calls
- **CSS3** - Custom styling

### Backend
- **Node.js 22** - Runtime environment
- **Express.js** - Web application framework
- **MongoDB** - Document database
- **Mongoose** - MongoDB object modeling
- **Multer** - File upload handling
- **OpenAI API** - AI-powered image analysis

### DevOps
- **Docker & Docker Compose** - Containerization
- **ESM Modules** - Modern JavaScript modules

## 📁 Project Structure

```
design-sight/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ImageUploader.jsx
│   │   │   ├── FeedbackOverlay.jsx
│   │   │   └── RoleSwitcher.jsx
│   │   ├── pages/
│   │   │   └── ProjectView.jsx
│   │   └── App.jsx
│   └── package.json
├── backend/
│   ├── controllers/
│   │   ├── imageController.js
│   │   └── projectController.js
│   ├── models/
│   │   ├── imageModel.js
│   │   └── projectModel.js
│   ├── routes/
│   │   ├── imageRoutes.js
│   │   └── projectRoutes.js
│   ├── services/
│   │   └── aiAnalysisService.js
│   ├── uploads/
│   └── server.js
├── docker-compose.yml
├── .env.example
└── README.md
```

## 🔧 Manual Setup (Without Docker)

### Prerequisites
- Node.js 22+
- MongoDB running locally
- OpenAI API key

### Backend Setup
```bash
cd backend
npm install
npm start
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## 🌟 Key Features Breakdown

### 1. Intelligent Image Upload
- Automatic project creation if not exists
- File validation (images only, 5MB limit)
- Secure file storage with unique naming

### 2. AI Analysis Engine
- OpenAI Vision API integration
- Role-specific feedback generation
- Automatic status tracking and polling

### 3. Interactive UI
- Real-time feedback overlay on images
- Role-based filtering system
- Clean, intuitive design interface

### 4. Robust Backend
- RESTful API design
- MongoDB integration with Mongoose
- Error handling and validation
- Auto-scaling project management

## 📋 API Endpoints

### Images
- `POST /api/images/upload` - Upload image for analysis
- `GET /api/images/:id` - Get image details and feedback
- `POST /api/images/:id/analyze` - Trigger AI analysis

### Projects
- `POST /api/projects/create-default` - Auto-create default project
- `GET /api/projects/:id` - Get project details
- `GET /api/projects` - List all projects

## 🔒 Environment Variables

```env
# Required
OPENAI_API_KEY=your-openai-api-key-here
MONGO_URI=mongodb://admin:admin123@mongo:27017/designsight?authSource=admin

# Optional
PORT=5001
```

## 🏗️ Development Workflow

1. **Image Upload**: User selects and uploads design screenshot
2. **Project Association**: Image automatically linked to project (auto-created if needed)
3. **AI Analysis**: Click "Run AI Analysis" to process image with OpenAI
4. **Feedback Display**: AI-generated feedback appears as interactive overlays
5. **Role Filtering**: Switch between Developer/Designer/QA views

## 🎯 Technical Highlights

- **Auto-Recovery**: Intelligent project creation prevents upload failures
- **Real-time Updates**: Polling system for analysis status tracking
- **Type Safety**: ESM modules with modern JavaScript patterns
- **Error Resilience**: Comprehensive error handling throughout the stack
- **Performance**: Optimized file handling and database queries
- **Security**: Input validation and file type restrictions

## 🚀 Production Considerations

- Add JWT authentication for user management
- Implement rate limiting for API endpoints
- Set up proper logging and monitoring
- Configure SSL certificates for HTTPS
- Add database indexes for better performance
- Implement caching for frequently accessed data

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

***

**Built with ❤️ by [Your Name]**

*This application demonstrates full-stack development skills with modern technologies, AI integration, and production-ready architecture.*
