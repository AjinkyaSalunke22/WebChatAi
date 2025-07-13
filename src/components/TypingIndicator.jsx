import { Typography, Box } from '@mui/material'

const TypingIndicator = ({ text }) => {
  return (
    <Typography
      variant="body1"
      sx={{
        color: 'text.primary',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
        lineHeight: 1.7,
        fontSize: '1rem',
        fontWeight: 400,
      }}
    >
      {text}
      <Box
        component="span"
        sx={{
          display: 'inline-block',
          width: '2px',
          height: '1.2em',
          backgroundColor: 'primary.main',
          marginLeft: '4px',
          animation: 'blink 1s infinite',
          '@keyframes blink': {
            '0%, 50%': { opacity: 1 },
            '51%, 100%': { opacity: 0 },
          },
        }}
      />
    </Typography>
  )
}

export default TypingIndicator