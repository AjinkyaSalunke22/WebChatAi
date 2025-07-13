import { Typography } from '@mui/material'
import CodeBlock from './CodeBlock'

const MessageContent = ({ content }) => {
  const parseContent = (text) => {
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g
    const inlineCodeRegex = /`([^`]+)`/g
    
    let lastIndex = 0
    const elements = []
    let match

    // Handle code blocks
    while ((match = codeBlockRegex.exec(text)) !== null) {
      // Add text before code block
      if (match.index > lastIndex) {
        const beforeText = text.slice(lastIndex, match.index)
        elements.push(
          <Typography
            key={`text-${lastIndex}`}
            component="span"
            sx={{
              color: 'text.primary',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              lineHeight: 1.7,
              fontSize: '1rem',
              fontWeight: 400,
            }}
          >
            {beforeText.replace(inlineCodeRegex, (_, code) => `\`${code}\``)}
          </Typography>
        )
      }

      // Add code block
      const language = match[1] || 'text'
      const code = match[2].trim()
      elements.push(
        <CodeBlock key={`code-${match.index}`} code={code} language={language} />
      )

      lastIndex = match.index + match[0].length
    }

    // Add remaining text
    if (lastIndex < text.length) {
      const remainingText = text.slice(lastIndex)
      elements.push(
        <Typography
          key={`text-${lastIndex}`}
          component="span"
          sx={{
            color: 'text.primary',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            lineHeight: 1.7,
            fontSize: '1rem',
            fontWeight: 400,
          }}
        >
          {remainingText.replace(inlineCodeRegex, (_, code) => (
            <Typography
              component="code"
              sx={{
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                color: 'primary.main',
                px: 1,
                py: 0.5,
                borderRadius: 1,
                fontSize: '0.9em',
                fontFamily: 'monospace',
              }}
            >
              {code}
            </Typography>
          ))}
        </Typography>
      )
    }

    return elements.length > 0 ? elements : (
      <Typography
        sx={{
          color: 'text.primary',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          lineHeight: 1.7,
          fontSize: '1rem',
          fontWeight: 400,
        }}
      >
        {content}
      </Typography>
    )
  }

  return <>{parseContent(content)}</>
}

export default MessageContent