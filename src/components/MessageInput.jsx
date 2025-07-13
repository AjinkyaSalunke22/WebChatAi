import { useState } from 'react'
import { Box, TextField, IconButton, Paper, Typography, Fade } from '@mui/material'
import { Send as SendIcon, Security } from '@mui/icons-material'

const MessageInput = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState('')
  const [focused, setFocused] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (message.trim() && !disabled) {
      onSendMessage(message.trim())
      setMessage('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <Box 
      sx={{ 
        p: 4, 
        background: 'linear-gradient(180deg, transparent 0%, rgba(15, 23, 42, 0.8) 100%)',
        backdropFilter: 'blur(10px)',
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Box sx={{ maxWidth: 800, mx: 'auto' }}>
        <Paper
          component="form"
          onSubmit={handleSubmit}
          elevation={0}
          sx={{
            display: 'flex',
            alignItems: 'flex-end',
            background: focused 
              ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)'
              : 'background.paper',
            border: '2px solid',
            borderColor: focused ? 'primary.main' : 'divider',
            borderRadius: 4,
            p: 3,
            boxShadow: focused 
              ? '0 8px 32px rgba(99, 102, 241, 0.2)' 
              : '0 4px 16px rgba(0,0,0,0.1)',
            transition: 'all 0.3s ease',
            '&:hover': {
              borderColor: 'primary.light',
              transform: 'translateY(-2px)',
            },
          }}
        >
          <TextField
            fullWidth
            multiline
            maxRows={6}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder={disabled ? 'Connecting to AI model...' : 'Type your message here...'}
            disabled={disabled}
            variant="standard"
            InputProps={{
              disableUnderline: true,
              sx: {
                color: 'text.primary',
                fontSize: '1.1rem',
                fontWeight: 400,
                lineHeight: 1.6,
                '& .MuiInputBase-input::placeholder': {
                  color: 'text.secondary',
                  opacity: 0.7,
                },
              },
            }}
            sx={{ mr: 3 }}
          />
          <IconButton
            type="submit"
            disabled={!message.trim() || disabled}
            sx={{
              width: 48,
              height: 48,
              background: message.trim() && !disabled 
                ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
                : 'transparent',
              color: message.trim() && !disabled ? 'white' : 'text.secondary',
              border: '2px solid',
              borderColor: message.trim() && !disabled ? 'transparent' : 'divider',
              '&:hover': {
                background: message.trim() && !disabled 
                  ? 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)'
                  : 'rgba(99, 102, 241, 0.1)',
                transform: 'scale(1.1)',
                boxShadow: '0 4px 16px rgba(99, 102, 241, 0.3)',
              },
              '&:disabled': {
                opacity: 0.5,
              },
              transition: 'all 0.2s ease',
            }}
          >
            <SendIcon />
          </IconButton>
        </Paper>
        
        <Fade in={true}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 3 }}>
            <Security sx={{ color: 'primary.main', mr: 1, fontSize: 16 }} />
            <Typography 
              variant="caption" 
              sx={{ 
                color: 'text.secondary', 
                fontWeight: 500,
                letterSpacing: '0.025em',
              }}
            >
              Your conversations are completely private and processed locally
            </Typography>
          </Box>
        </Fade>
      </Box>
    </Box>
  )
}

export default MessageInput