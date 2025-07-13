import { Box, Typography, Avatar, Paper, Chip } from '@mui/material'
import { Person, Psychology, AutoAwesome, Security } from '@mui/icons-material'
import { useEffect, useRef } from 'react'
import TypingIndicator from './TypingIndicator'
import MessageContent from './MessageContent'

const MessageList = ({ messages, isLoading, isStreaming }) => {
  const messagesEndRef = useRef(null)
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }
  
  useEffect(() => {
    scrollToBottom()
  }, [messages, isStreaming])
  return (
    <Box
      sx={{
        flexGrow: 1,
        overflowY: 'auto',
        p: 4,
        background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)',
      }}
    >
      {messages.length === 0 && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            textAlign: 'center',
            maxWidth: 600,
            mx: 'auto',
          }}
        >
          <Avatar
            sx={{
              width: 120,
              height: 120,
              mb: 4,
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              boxShadow: '0 20px 40px rgba(99, 102, 241, 0.3)',
            }}
          >
            <Psychology sx={{ fontSize: 60 }} />
          </Avatar>
          
          <Typography variant="h3" sx={{ color: 'text.primary', mb: 2, fontWeight: 800, letterSpacing: '-0.025em' }}>
            Welcome to WebChatAI
          </Typography>
          
          <Typography variant="h6" sx={{ color: 'text.secondary', mb: 6, fontWeight: 400 }}>
            Your intelligent AI assistant, running locally in your browser
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Chip
              icon={<Security />}
              label="100% Private"
              variant="outlined"
              sx={{
                borderColor: 'primary.main',
                color: 'primary.main',
                fontWeight: 500,
              }}
            />
            <Chip
              icon={<AutoAwesome />}
              label="AI Powered"
              variant="outlined"
              sx={{
                borderColor: 'secondary.main',
                color: 'secondary.main',
                fontWeight: 500,
              }}
            />
          </Box>
          
          <Paper
            elevation={0}
            sx={{
              p: 4,
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 4,
              maxWidth: 500,
            }}
          >
            <Typography variant="body1" sx={{ color: 'text.primary', lineHeight: 1.7, fontWeight: 500 }}>
              Start a conversation and experience AI that respects your privacy. 
              All processing happens locally - your data never leaves your device.
            </Typography>
          </Paper>
        </Box>
      )}
      
      <Box sx={{ maxWidth: 800, mx: 'auto' }}>
        {messages.map((message) => (
          <Box
            key={message.id}
            sx={{
              display: 'flex',
              mb: 6,
              p: 4,
              borderRadius: 4,
              background: message.role === 'assistant' 
                ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)'
                : 'transparent',
              border: message.role === 'assistant' ? '1px solid' : 'none',
              borderColor: message.role === 'assistant' ? 'divider' : 'transparent',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: message.role === 'assistant' ? '0 8px 32px rgba(99, 102, 241, 0.1)' : 'none',
              },
            }}
          >
            <Avatar
              sx={{
                mr: 4,
                width: 48,
                height: 48,
                background: message.role === 'user' 
                  ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                  : 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
              }}
            >
              {message.role === 'user' ? <Person /> : <Psychology />}
            </Avatar>
            <Box sx={{ flexGrow: 1, minWidth: 0 }}>
              <Typography
                variant="caption"
                sx={{
                  color: 'text.secondary',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  mb: 1,
                  display: 'block',
                }}
              >
                {message.role === 'user' ? 'You' : 'WebChatAI'}
              </Typography>
              {message.role === 'assistant' && message.isStreaming ? (
                <TypingIndicator text={message.content} />
              ) : (
                <MessageContent content={message.content} />
              )}
            </Box>
          </Box>
        ))}
      </Box>
      <div ref={messagesEndRef} />
    </Box>
  )
}

export default MessageList