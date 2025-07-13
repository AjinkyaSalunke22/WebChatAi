import { useState, useEffect, useRef } from 'react'
import * as webllm from '@mlc-ai/web-llm'

const MODEL_ID = 'TinyLlama-1.1B-Chat-v0.4-q4f16_1-MLC'

export const useWebLLM = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isModelLoaded, setIsModelLoaded] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [loadingStatus, setLoadingStatus] = useState('')
  const [downloadSpeed, setDownloadSpeed] = useState('')
  const [remainingTime, setRemainingTime] = useState('')
  const [isInitializing, setIsInitializing] = useState(true)

  const [streamingResponse, setStreamingResponse] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const engineRef = useRef(null)
  const startTimeRef = useRef(null)
  const lastProgressRef = useRef(0)

  const loadModel = async () => {
    try {
      setIsInitializing(true)
      setIsModelLoaded(false)
      setLoadingStatus('Initializing TinyLlama...')
      
      const engine = new webllm.MLCEngine()
      
      engine.setInitProgressCallback((report) => {
        const progress = report.progress * 100
        setLoadingProgress(progress)
        
        if (report.text.includes('Downloading')) {
          if (!startTimeRef.current) {
            startTimeRef.current = Date.now()
          }
          
          const elapsed = (Date.now() - startTimeRef.current) / 1000
          const progressDiff = progress - lastProgressRef.current
          
          if (elapsed > 1 && progressDiff > 0) {
            const speed = progressDiff / elapsed
            const remaining = (100 - progress) / speed
            
            setDownloadSpeed(`${speed.toFixed(1)}%/s`)
            setRemainingTime(`${Math.ceil(remaining)}s remaining`)
            
            lastProgressRef.current = progress
            startTimeRef.current = Date.now()
          }
          
          setLoadingStatus('Downloading TinyLlama from internet...')
        } else if (report.text.includes('Loading')) {
          setLoadingStatus('Loading TinyLlama from cache...')
          setDownloadSpeed('')
          setRemainingTime('')
        } else {
          setLoadingStatus(report.text)
        }
      })
      
      await engine.reload(MODEL_ID)
      engineRef.current = engine
      setIsModelLoaded(true)
      setIsInitializing(false)
    } catch (error) {
      console.error('Failed to load model:', error)
      setIsInitializing(false)
    }
  }

  useEffect(() => {
    loadModel()
  }, [])

  const sendMessage = async (message, onStream) => {
    if (!engineRef.current || !isModelLoaded) {
      throw new Error('Model not loaded yet...')
    }
    
    setIsLoading(true)
    setIsStreaming(true)
    setStreamingResponse('')
    
    try {
      const stream = await engineRef.current.chat.completions.create({
        messages: [{ role: 'user', content: message }],
        temperature: 0.7,
        max_tokens: 512,
        stream: true,
      })
      
      let fullResponse = ''
      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || ''
        if (content) {
          fullResponse += content
          onStream?.(fullResponse)
        }
      }
      
      setIsStreaming(false)
      return fullResponse
    } catch (error) {
      console.error('Error generating response:', error)
      setIsStreaming(false)
      throw error
    } finally {
      setIsLoading(false)
    }
  }



  return { 
    sendMessage, 
    isLoading, 
    isModelLoaded, 
    loadingProgress, 
    loadingStatus,
    downloadSpeed,
    remainingTime,
    isInitializing,
    streamingResponse,
    isStreaming
  }
}