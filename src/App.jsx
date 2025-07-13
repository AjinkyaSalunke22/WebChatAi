import { useState, useEffect } from 'react'
import { Box } from '@mui/material'
import Sidebar from './components/Sidebar'
import ChatArea from './components/ChatArea'
import LoadingOverlay from './components/LoadingOverlay'
import { useWebLLM } from './hooks/useWebLLM'
import { useChatHistory } from './hooks/useChatHistory'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const { 
    sendMessage, 
    isLoading, 
    isModelLoaded, 
    loadingProgress, 
    loadingStatus,
    downloadSpeed,
    remainingTime,
    isInitializing,
    streamingResponse,
    isStreaming
  } = useWebLLM()
  
  const {
    chats,
    currentChatId,
    createNewChat,
    updateChat,
    switchToChat,
    getCurrentChat
  } = useChatHistory()
  
  const currentChat = getCurrentChat()
  const messages = currentChat?.messages || []

  const handleSendMessage = async (content) => {
    if (!isModelLoaded) {
      return
    }
    
    let chatId = currentChatId
    
    // Create new chat if none exists
    if (!chatId) {
      chatId = createNewChat(content)
    }
    
    const userMessage = { id: Date.now(), role: 'user', content }
    const assistantMessageId = Date.now() + 1
    
    const updatedMessages = [...messages, userMessage]
    updateChat(chatId, updatedMessages)
    
    // Add empty assistant message for streaming
    const assistantMessage = { id: assistantMessageId, role: 'assistant', content: '', isStreaming: true }
    const messagesWithAssistant = [...updatedMessages, assistantMessage]
    updateChat(chatId, messagesWithAssistant)
    
    try {
      const response = await sendMessage(content, (streamedContent) => {
        const streamingMessages = messagesWithAssistant.map(msg => 
          msg.id === assistantMessageId 
            ? { ...msg, content: streamedContent }
            : msg
        )
        updateChat(chatId, streamingMessages)
      })
      
      // Mark streaming as complete
      const finalMessages = messagesWithAssistant.map(msg => 
        msg.id === assistantMessageId 
          ? { ...msg, content: response, isStreaming: false }
          : msg
      )
      updateChat(chatId, finalMessages)
    } catch (error) {
      // Handle error by showing error message
      const errorMessages = messagesWithAssistant.map(msg => 
        msg.id === assistantMessageId 
          ? { ...msg, content: 'Sorry, I encountered an error. Please try again.', isStreaming: false }
          : msg
      )
      updateChat(chatId, errorMessages)
    }
  }

  const handleNewChat = () => {
    createNewChat()
  }
  
  const handleSwitchChat = (chatId) => {
    switchToChat(chatId)
  }

  return (
    <>
      <Box sx={{ display: 'flex', height: '100vh' }}>
        <Sidebar 
          open={sidebarOpen} 
          onToggle={() => setSidebarOpen(!sidebarOpen)}
          onNewChat={handleNewChat}
          chats={chats}
          currentChatId={currentChatId}
          onSwitchChat={handleSwitchChat}
        />
        <ChatArea 
          messages={messages}
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
          isModelLoaded={isModelLoaded}
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          isStreaming={isStreaming}
        />
      </Box>
      <LoadingOverlay 
        open={isInitializing}
        progress={loadingProgress}
        status={loadingStatus}
        downloadSpeed={downloadSpeed}
        remainingTime={remainingTime}
      />
    </>
  )
}

export default App