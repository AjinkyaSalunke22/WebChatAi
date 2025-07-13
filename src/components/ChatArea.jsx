import { Box } from '@mui/material'
import ChatHeader from './ChatHeader'
import MessageList from './MessageList'
import MessageInput from './MessageInput'

const ChatArea = ({ 
  messages, 
  onSendMessage, 
  isLoading, 
  isModelLoaded, 
  sidebarOpen, 
  onToggleSidebar,
  isStreaming
}) => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        backgroundColor: '#343541',
        transition: 'all 0.3s ease',
        width: sidebarOpen ? 'calc(100% - 260px)' : '100%',
      }}
    >
      <ChatHeader 
        onToggleSidebar={onToggleSidebar} 
        isModelLoaded={isModelLoaded}
      />
      <MessageList messages={messages} isLoading={isLoading} isStreaming={isStreaming} />
      <MessageInput onSendMessage={onSendMessage} disabled={!isModelLoaded || isLoading} />
    </Box>
  )
}

export default ChatArea