import { Box, IconButton, Typography, Snackbar } from '@mui/material'
import { ContentCopy, Check } from '@mui/icons-material'
import { useState } from 'react'

const CodeBlock = ({ code, language = 'text' }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <Box
      sx={{
        position: 'relative',
        my: 2,
        borderRadius: 2,
        overflow: 'hidden',
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 3,
          py: 1.5,
          backgroundColor: '#1a1a1a',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
          {language}
        </Typography>
        <IconButton
          onClick={handleCopy}
          size="small"
          sx={{
            color: copied ? 'success.main' : 'text.secondary',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.1)',
            },
          }}
        >
          {copied ? <Check fontSize="small" /> : <ContentCopy fontSize="small" />}
        </IconButton>
      </Box>
      <Box
        sx={{
          backgroundColor: '#0d1117',
          p: 3,
          overflow: 'auto',
          maxHeight: 400,
        }}
      >
        <Typography
          component="pre"
          sx={{
            color: '#e6edf3',
            fontFamily: '"Fira Code", "Consolas", "Monaco", monospace',
            fontSize: '0.9rem',
            lineHeight: 1.5,
            margin: 0,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}
        >
          {code}
        </Typography>
      </Box>
    </Box>
  )
}

export default CodeBlock