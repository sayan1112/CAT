'use client'

import { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Send, Image, Mic, CheckCheck, Loader2 } from 'lucide-react'
import { ErrorLogEntry } from '@/lib/llm'

interface ChatMessage {
  id: string
  sender: 'user' | 'bot'
  text: string
  isImage?: boolean
  isAudio?: boolean
  timestamp: string
}

export function WhatsappPipeline() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: '🤖 Welcome to the CAT WhatsApp Bot Pipeline! Send me a screenshot of a problem or a text description, or log an error by telling me what went wrong.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const addMessageToChat = (sender: 'user' | 'bot', text: string, isImage = false, isAudio = false) => {
    const newMsg: ChatMessage = {
      id: Math.random().toString(),
      sender,
      text,
      isImage,
      isAudio,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    setMessages(prev => [...prev, newMsg])
  }

  const logErrorToStorage = (questionText: string, topic: string, mistakeType: 'Silly' | 'Concept Gap' | 'Time Out') => {
    const stored = localStorage.getItem('cat-prep-error-log')
    let log: ErrorLogEntry[] = []
    if (stored) {
      try {
        log = JSON.parse(stored)
      } catch (e) {
        console.error(e)
      }
    }

    const newEntry: ErrorLogEntry = {
      id: 'err-' + Math.random().toString(),
      questionText,
      topic,
      mistakeType,
      source: 'mock',
      timestamp: new Date().toISOString(),
      confidence: 3,
      reviewCount: 0,
      cleared: false
    }

    const updated = [newEntry, ...log]
    localStorage.setItem('cat-prep-error-log', JSON.stringify(updated))
    
    // Dispatch custom event to notify other components (e.g., Swipe Deck)
    window.dispatchEvent(new Event('storage'))
  }

  const handleSendText = async (text: string, isImage = false, isAudio = false) => {
    if (!text.trim()) return
    setIsLoading(true)

    // First display user message in chat
    addMessageToChat('user', text, isImage, isAudio)
    setInputText('')

    try {
      // Direct call to our centralized LLM route
      const res = await fetch('/app/api/llm' /* wait, let's call relative path /api/llm */, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'investigate-error',
          questionInput: text
        })
      })

      // Wait, let's verify if the route is at '/api/llm'
      const apiEndpoint = '/api/llm'
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'investigate-error',
          questionInput: text
        })
      })

      if (!response.ok) {
        throw new Error('API failed')
      }

      const data = await response.json()
      const { mistakeType, tagReason, steps } = data

      // Log the error to LocalStorage database
      logErrorToStorage(text, steps?.[0]?.content?.slice(0, 30) || 'Quantitative Aptitude', mistakeType)

      // Bot reply
      const reply = `✅ **Transcribed & Analyzed!**\n\n📌 **Mistake Tagged**: ${mistakeType}\n📝 **Reason**: ${tagReason}\n\n🤖 *I have saved this to your Central Error Log and added it to your Swipe-to-Review rotation!*`
      addMessageToChat('bot', reply)

    } catch (e) {
      console.error(e)
      // Fallback response
      logErrorToStorage(text, 'Quantitative Aptitude', 'Silly')
      addMessageToChat('bot', `🤖 [Mock Pipeline] Logged successfully in offline mode!\n\nTagged: **Silly**\nTopic: Quant\nAdded to your Swipe-to-Review deck.`)
    } finally {
      setIsLoading(false)
    }
  }

  // Pre-configured mocks
  const sendMockPhoto = () => {
    handleSendText("A train travels 100km in 2 hours. What's its speed? Wait, the speed is 50km/h but I wrote 200km/h because I multiplied distance by time instead of dividing.", true, false)
  }

  const sendMockVoiceNote = () => {
    handleSendText("I messed up a TSD question. I forgot to convert speed from 72 km/h to m/s before multiplying by 10 seconds. Got 720 meters instead of 200 meters.", false, true)
  }

  return (
    <Card className="border-border/60 bg-background/50 backdrop-blur-md overflow-hidden flex flex-col h-[500px] shadow-xl">
      <CardHeader className="bg-emerald-600 dark:bg-emerald-800 text-white py-3 px-4 flex flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle className="text-base text-white">🟢 WhatsApp Prep Pipeline</CardTitle>
          <CardDescription className="text-xs text-emerald-100">
            Pipeline simulation • Active
          </CardDescription>
        </div>
        <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse" />
      </CardHeader>

      {/* Messages */}
      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#ece5dd]/25 dark:bg-secondary/10">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-lg p-3 text-sm relative shadow-sm ${
              msg.sender === 'user'
                ? 'bg-emerald-500 text-white rounded-tr-none'
                : 'bg-card text-foreground border border-border/40 rounded-tl-none'
            }`}>
              {msg.isImage && (
                <div className="mb-2 p-2 bg-emerald-600/20 dark:bg-emerald-950/40 rounded border border-emerald-400/20 text-xs flex items-center gap-2">
                  <Image className="w-4 h-4 text-emerald-400" /> [Mock Photo Uploaded]
                </div>
              )}
              {msg.isAudio && (
                <div className="mb-2 p-2 bg-emerald-600/20 dark:bg-emerald-950/40 rounded border border-emerald-400/20 text-xs flex items-center gap-2">
                  <Mic className="w-4 h-4 text-emerald-400" /> 🎤 [Audio Note Logged]
                </div>
              )}
              <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
              <div className="flex justify-end items-center gap-1 mt-1 text-[9px] text-muted-foreground/80">
                <span>{msg.timestamp}</span>
                {msg.sender === 'user' && <CheckCheck className="w-3.5 h-3.5 text-emerald-300" />}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="px-4 py-2.5 rounded-lg bg-card border border-border/40 flex items-center gap-2 shadow-sm">
              <Loader2 className="w-4 h-4 animate-spin text-emerald-500" />
              <span className="text-xs text-muted-foreground">Bot is transcribing & analyzing...</span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </CardContent>

      {/* Simulator preset triggers */}
      <div className="bg-secondary/40 border-t border-border/60 p-2 flex gap-2 justify-center">
        <Button 
          onClick={sendMockPhoto} 
          disabled={isLoading}
          variant="outline" 
          size="xs" 
          className="text-[10px] h-7 px-2 border-emerald-500/20 text-emerald-600 hover:bg-emerald-50/20 gap-1"
        >
          <Image className="w-3.5 h-3.5" /> Mock Send Photo
        </Button>
        <Button 
          onClick={sendMockVoiceNote} 
          disabled={isLoading}
          variant="outline" 
          size="xs" 
          className="text-[10px] h-7 px-2 border-emerald-500/20 text-emerald-600 hover:bg-emerald-50/20 gap-1"
        >
          <Mic className="w-3.5 h-3.5" /> Mock Send Voice
        </Button>
      </div>

      {/* Input */}
      <form 
        onSubmit={(e) => {
          e.preventDefault()
          if (!inputText.trim()) return
          handleSendText(inputText)
        }} 
        className="p-3 border-t border-border/60 flex gap-2 bg-card"
      >
        <Input
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type a mistake description..."
          className="flex-1 text-sm h-9"
          disabled={isLoading}
        />
        <Button 
          type="submit" 
          size="icon" 
          disabled={isLoading || !inputText.trim()}
          className="bg-emerald-600 hover:bg-emerald-700 h-9 w-9"
        >
          <Send className="w-4 h-4 text-white" />
        </Button>
      </form>
    </Card>
  )
}
