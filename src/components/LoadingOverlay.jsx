import { Box, Typography, LinearProgress, Backdrop } from '@mui/material'
import { Psychology } from '@mui/icons-material'

const LoadingOverlay = ({ open, progress, status, downloadSpeed, remainingTime }) => {
  return (
    <Backdrop
      sx={{
        color: '#fff',
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: 'rgba(15, 23, 42, 0.95)',
        backdropFilter: 'blur(20px)',
      }}
      open={open}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          maxWidth: 500,
          p: 6,
          borderRadius: 4,
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Psychology sx={{ fontSize: 100, color: 'primary.main', mb: 4 }} />
        <Typography variant="h3" sx={{ mb: 2, fontWeight: 800, color: 'text.primary' }}>
          WebChatAI
        </Typography>
        <Typography variant="h6" sx={{ mb: 4, color: 'text.secondary', fontWeight: 400 }}>
          {status}
        </Typography>
        
        <Box sx={{ width: '100%', mb: 3 }}>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 12,
              borderRadius: 6,
              backgroundColor: 'rgba(99, 102, 241, 0.2)',
              '& .MuiLinearProgress-bar': {
                background: 'linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%)',
                borderRadius: 6,
              },
            }}
          />
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mb: 2 }}>
          <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 600 }}>
            {Math.round(progress)}%
          </Typography>
          {downloadSpeed && (
            <Typography variant="body2" sx={{ color: 'primary.main', fontWeight: 500 }}>
              {downloadSpeed}
            </Typography>
          )}
        </Box>
        
        {remainingTime && (
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {remainingTime}
          </Typography>
        )}
      </Box>
    </Backdrop>
  )
}

export default LoadingOverlay