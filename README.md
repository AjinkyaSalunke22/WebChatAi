# WebChatAI 🤖

## 🌐 [Try WebChatAI Live](https://webbchatai.netlify.app/)

![Image](https://github.com/user-attachments/assets/54a898da-eaa9-4129-b4a0-18ce5bc9346e)

A privacy-first, offline AI chat application that runs entirely in your browser using WebGPU acceleration. Experience the power of AI without compromising your privacy - all processing happens locally on your device.

![WebChatAI](https://img.shields.io/badge/AI-Powered-blue) ![Privacy](https://img.shields.io/badge/Privacy-First-green) ![Offline](https://img.shields.io/badge/100%25-Offline-orange) ![WebGPU](https://img.shields.io/badge/WebGPU-Accelerated-purple)

## ✨ Features

### 🔒 **Complete Privacy**
- **100% Local Processing**: All AI computations happen in your browser
- **No Data Transmission**: Your conversations never leave your device
- **No Server Dependencies**: Works completely offline after initial model download

### 🚀 **Performance**
- **WebGPU Acceleration**: Leverages your device's GPU for fast inference
- **Real-time Streaming**: See responses as they're generated
- **Optimized Model**: Uses TinyLlama 1.1B for efficient local processing

### 💬 **Chat Experience**
- **Multiple Conversations**: Create and manage multiple chat sessions
- **Rich Text Support**: Handles code blocks, inline code, and formatted text
- **Typing Indicators**: Visual feedback during response generation
- **Auto-scroll**: Automatically scrolls to latest messages

### 🎨 **Modern UI**
- **Dark Theme**: Easy on the eyes with a sleek dark interface
- **Responsive Design**: Works on desktop and mobile devices
- **Material-UI Components**: Professional and polished interface
- **Smooth Animations**: Fluid transitions and hover effects

## 🏗️ Architecture

### Core Technologies
- **React 18**: Modern React with hooks and functional components
- **Vite**: Fast build tool and development server
- **Material-UI (MUI)**: Component library for consistent UI
- **@mlc-ai/web-llm**: WebLLM for running AI models in the browser

### Project Structure
```
WebChatAi/
├── src/
│   ├── components/          # React components
│   │   ├── ChatArea.jsx     # Main chat interface
│   │   ├── ChatHeader.jsx   # Header with model status
│   │   ├── CodeBlock.jsx    # Code syntax highlighting
│   │   ├── LoadingOverlay.jsx # Model loading screen
│   │   ├── MessageContent.jsx # Message parsing and rendering
│   │   ├── MessageInput.jsx  # Input field with send button
│   │   ├── MessageList.jsx   # Chat message display
│   │   ├── Sidebar.jsx       # Navigation and chat history
│   │   └── TypingIndicator.jsx # Streaming text animation
│   ├── hooks/               # Custom React hooks
│   │   ├── useChatHistory.js # Chat session management
│   │   └── useWebLLM.js     # AI model integration
│   ├── App.jsx              # Main application component
│   └── main.jsx             # Application entry point
├── index.html               # HTML template
├── package.json             # Dependencies and scripts
└── vite.config.js           # Vite configuration
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16 or higher)
- **Modern Browser** with WebGPU support (Chrome 113+, Edge 113+)
- **GPU** (recommended for optimal performance)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd WebChatAi
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
npm run preview
```

## 🔧 Configuration

### Model Configuration
The app uses TinyLlama 1.1B by default. You can modify the model in `src/hooks/useWebLLM.js`:

```javascript
const MODEL_ID = 'TinyLlama-1.1B-Chat-v0.4-q4f16_1-MLC'
```

### CORS Headers
The Vite configuration includes necessary CORS headers for WebLLM:

```javascript
server: {
  headers: {
    'Cross-Origin-Embedder-Policy': 'require-corp',
    'Cross-Origin-Opener-Policy': 'same-origin',
  },
}
```

## 🎯 Usage

### First Launch
1. **Model Download**: On first launch, the app downloads the TinyLlama model (~600MB)
2. **Progress Tracking**: Real-time download progress with speed and time estimates
3. **Automatic Loading**: Model loads from cache on subsequent visits

### Chat Interface
1. **Start Chatting**: Type your message and press Enter or click Send
2. **Multiple Chats**: Click "New Conversation" to start fresh sessions
3. **Chat History**: Access previous conversations from the sidebar
4. **Code Support**: The AI can generate and display code with syntax highlighting

### Privacy Features
- **Local Storage**: Chat history stored locally in your browser
- **No Telemetry**: No analytics or tracking
- **Offline Mode**: Works without internet after initial setup

## 🔍 Key Components

### useWebLLM Hook
Manages AI model lifecycle:
- Model downloading and loading
- Message processing and streaming
- Progress tracking and error handling

### useChatHistory Hook
Handles conversation management:
- Creating new chat sessions
- Updating message history
- Switching between conversations
- Local storage persistence

### MessageContent Component
Processes and renders messages:
- Markdown-like parsing
- Code block detection and highlighting
- Inline code formatting
- Text wrapping and styling

## 🛠️ Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Code Style
- **Functional Components**: Uses React hooks exclusively
- **Material-UI Theming**: Consistent dark theme throughout
- **Responsive Design**: Mobile-first approach
- **Error Handling**: Graceful error states and loading indicators

## 🌐 Browser Compatibility

### Supported Browsers
- **Chrome/Chromium** 113+ (recommended)
- **Microsoft Edge** 113+
- **Firefox** (experimental WebGPU support)

### WebGPU Requirements
- **Hardware**: Dedicated or integrated GPU
- **Drivers**: Up-to-date graphics drivers
- **Flags**: WebGPU enabled in browser settings

## 📊 Performance

### Model Specifications
- **Model**: TinyLlama 1.1B parameters
- **Quantization**: 4-bit quantization for efficiency
- **Memory**: ~600MB download, ~1GB RAM usage
- **Speed**: 10-50 tokens/second (varies by hardware)

### Optimization Tips
- **GPU Acceleration**: Ensure WebGPU is enabled
- **Memory**: Close other tabs for better performance
- **Storage**: Ensure sufficient disk space for model cache

## 🔐 Privacy & Security

### Data Handling
- **No Server Communication**: All processing happens locally
- **Local Storage Only**: Data stored in browser's local storage
- **No Cookies**: No tracking or session cookies
- **No Analytics**: No usage tracking or telemetry

### Security Features
- **Content Security Policy**: Strict CSP headers
- **CORS Protection**: Proper CORS configuration
- **Input Sanitization**: Safe handling of user input

## 🤝 Contributing

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Code Guidelines
- Follow existing code style
- Add comments for complex logic
- Test on multiple browsers
- Ensure responsive design

## 📄 License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **MLC-LLM**: For the WebLLM framework
- **TinyLlama**: For the efficient language model
- **Material-UI**: For the component library
- **Vite**: For the build tooling

## 📞 Support

### Common Issues
- **WebGPU Not Supported**: Update browser or enable WebGPU flags
- **Model Loading Fails**: Check internet connection and storage space
- **Slow Performance**: Ensure GPU acceleration is enabled

### Browser Flags
For browsers with experimental WebGPU support:
- Chrome: `chrome://flags/#enable-unsafe-webgpu`
- Firefox: `dom.webgpu.enabled` in about:config

---

**WebChatAI** - Your private, offline AI assistant. Chat with confidence knowing your data stays with you. 🔒✨
