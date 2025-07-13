import { Box, IconButton, Typography, Chip, Avatar } from '@mui/material'
import { Menu as MenuIcon, Psychology } from '@mui/icons-material'

const ChatHeader = ({ onToggleSidebar, isModelLoaded }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        p: 3,
        borderBottom: '1px solid',
        borderColor: 'divider',
        background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
      }}
    >
      <IconButton 
        onClick={onToggleSidebar} 
        sx={{ 
          color: 'text.primary', 
          mr: 3,
          p: 1.5,
          borderRadius: 2,
          '&:hover': {
            backgroundColor: 'rgba(99, 102, 241, 0.1)',
            transform: 'scale(1.05)',
          },
          transition: 'all 0.2s ease',
        }}
      >
        <MenuIcon />
      </IconButton>
      
      <Avatar
        sx={{
          bgcolor: 'primary.main',
          mr: 2,
          width: 40,
          height: 40,
          boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
        }}
      >
        <Psychology />
      </Avatar>
      
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h6" sx={{ color: 'text.primary', fontWeight: 700, mb: 0.5 }}>
          WebChatAI
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
          Powered by TinyLlama 1.1B
        </Typography>
      </Box>
      
      <Chip
        label={isModelLoaded ? 'Online' : 'Connecting...'}
        color={isModelLoaded ? 'success' : 'warning'}
        variant="filled"
        size="small"
        sx={{
          fontWeight: 600,
          fontSize: '0.75rem',
          height: 28,
          '& .MuiChip-label': {
            px: 2,
          },
          boxShadow: isModelLoaded ? '0 2px 8px rgba(34, 197, 94, 0.3)' : '0 2px 8px rgba(245, 158, 11, 0.3)',
        }}
      />
    </Box>
  )
}

export default ChatHeader