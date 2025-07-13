import { useState, useEffect } from 'react'

export const useChatHistory = () => {
  const [chats, setChats] = useState([])
  const [currentChatId, setCurrentChatId] = useState(null)

  useEffect(() => {
    // Clear localStorage on page load/refresh
    localStorage.removeItem('webchatai_chats')
    localStorage.removeItem('webchatai_current_chat')
  }, [])

  const createNewChat = (firstMessage = null) => {
    const chatId = Date.now().toString()
    const newChat = {
      id: chatId,
      title: firstMessage ? firstMessage.substring(0, 50) + '...' : 'New Chat',
      messages: firstMessage ? [{ id: Date.now(), role: 'user', content: firstMessage }] : [],
      createdAt: new Date().toISOString()
    }
    
    setChats(prev => [newChat, ...prev])
    setCurrentChatId(chatId)
    
    // Save to localStorage
    const updatedChats = [newChat, ...chats]
    localStorage.setItem('webchatai_chats', JSON.stringify(updatedChats))
    localStorage.setItem('webchatai_current_chat', chatId)
    
    return chatId
  }

  const updateChat = (chatId, messages) => {
    setChats(prev => prev.map(chat => 
      chat.id === chatId 
        ? { ...chat, messages, title: messages[0]?.content?.substring(0, 50) + '...' || 'New Chat' }
        : chat
    ))
    
    // Save to localStorage
    const updatedChats = chats.map(chat => 
      chat.id === chatId 
        ? { ...chat, messages, title: messages[0]?.content?.substring(0, 50) + '...' || 'New Chat' }
        : chat
    )
    localStorage.setItem('webchatai_chats', JSON.stringify(updatedChats))
  }

  const switchToChat = (chatId) => {
    setCurrentChatId(chatId)
    localStorage.setItem('webchatai_current_chat', chatId)
  }

  const getCurrentChat = () => {
    return chats.find(chat => chat.id === currentChatId)
  }

  return {
    chats,
    currentChatId,
    createNewChat,
    updateChat,
    switchToChat,
    getCurrentChat
  }
}