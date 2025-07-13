import { Box, Drawer, Typography, Button, Divider, List, ListItem, ListItemButton, ListItemText, Avatar } from '@mui/material'
import { Add as AddIcon, Psychology, Chat as ChatIcon, AutoAwesome } from '@mui/icons-material'

const Sidebar = ({ open, onToggle, onNewChat, chats, currentChatId, onSwitchChat }) => {
  const drawerWidth = 280

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      sx={{
        width: open ? drawerWidth : 0,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)',
          borderRight: '1px solid',
          borderColor: 'divider',
          transition: 'all 0.3s ease',
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Box sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Avatar
            sx={{
              bgcolor: 'primary.main',
              mr: 2,
              width: 36,
              height: 36,
              boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
            }}
          >
            <Psychology fontSize="small" />
          </Avatar>
          <Typography variant="h5" sx={{ color: 'text.primary', fontWeight: 700, letterSpacing: '-0.025em' }}>
            WebChatAI
          </Typography>
        </Box>
        
        <Button
          fullWidth
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onNewChat}
          sx={{
            mb: 3,
            py: 2,
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            color: 'white',
            fontWeight: 600,
            borderRadius: 3,
            boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
            '&:hover': {
              background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 24px rgba(99, 102, 241, 0.4)',
            },
            transition: 'all 0.3s ease',
          }}
        >
          New Conversation
        </Button>
      </Box>
      
      <Divider sx={{ borderColor: 'divider', mx: 2 }} />
      
      <Box sx={{ flexGrow: 1, overflowY: 'auto', px: 2, py: 1 }}>
        <Typography variant="overline" sx={{ color: 'text.secondary', px: 2, py: 1, fontSize: '0.7rem', fontWeight: 600 }}>
          Recent Chats
        </Typography>
        <List sx={{ p: 0 }}>
          {chats.map((chat) => (
            <ListItem key={chat.id} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => onSwitchChat(chat.id)}
                selected={chat.id === currentChatId}
                sx={{
                  px: 3,
                  py: 2.5,
                  borderRadius: 2,
                  mx: 1,
                  '&.Mui-selected': {
                    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%)',
                    borderLeft: '3px solid',
                    borderColor: 'primary.main',
                  },
                  '&:hover': {
                    backgroundColor: 'rgba(99, 102, 241, 0.08)',
                    transform: 'translateX(4px)',
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                <ChatIcon sx={{ color: 'text.secondary', mr: 2, fontSize: 18 }} />
                <ListItemText
                  primary={chat.title}
                  primaryTypographyProps={{
                    sx: {
                      color: 'text.primary',
                      fontSize: '0.9rem',
                      fontWeight: 500,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
      
      <Box sx={{ p: 3, borderTop: '1px solid', borderColor: 'divider', background: 'rgba(15, 23, 42, 0.5)' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <AutoAwesome sx={{ color: 'primary.main', mr: 1, fontSize: 16 }} />
          <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
            Powered by TinyLlama 1.1B
          </Typography>
        </Box>
      </Box>
    </Drawer>
  )
}

export default Sidebar