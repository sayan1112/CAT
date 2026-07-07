'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, Send, ChevronDown } from 'lucide-react'
import { useChat } from '@ai-sdk/react'

export function VARCBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [passageText, setPassageText] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/bots/varc',
    id: 'varc-bot',
  })

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handlePassageSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (passageText.trim()) {
      const event = new Event('submit', { bubbles: true })
      const textarea = document.createElement('textarea')
      textarea.value = `Passage: ${passageText}`
      
      // Manually create a synthetic input change
      Object.defineProperty(textarea, 'value', {
        get() {
          return `Passage: ${passageText}`
        }
      })
      
      handleInputChange({ target: textarea } as any)
      
      // Submit the form
      handleSubmit(e as any)
      setPassageText('')
    }
  }

  return (
    <Card className="mb-12 border-emerald-200/50 overflow-hidden">
      <CardHeader 
        className="cursor-pointer hover:bg-emerald-50/50 transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Reading Comprehension Coach</CardTitle>
            <CardDescription>
              Share a passage and questions - I'll guide you through tone analysis and MCQ strategy
            </CardDescription>
          </div>
          <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </CardHeader>

      {isOpen && (
        <CardContent className="space-y-4">
          {/* Chat Messages */}
          <div className="space-y-4 h-96 overflow-y-auto bg-emerald-50/30 rounded-lg p-4 border border-emerald-100">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <p className="text-muted-foreground mb-2">Share a passage and question below</p>
                <p className="text-xs text-muted-foreground">
                  I'll help you analyze tone and eliminate wrong options
                </p>
              </div>
            ) : (
              <>
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-2 rounded-lg ${
                        message.role === 'user'
                          ? 'bg-emerald-600 text-white'
                          : 'bg-white text-foreground border border-emerald-100'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="px-4 py-2 rounded-lg bg-white text-foreground border border-emerald-100 flex gap-2">
                      <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
                      <span className="text-sm">Analyzing...</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Passage Input */}
          {messages.length === 0 && (
            <form onSubmit={handlePassageSubmit} className="space-y-2">
              <Textarea
                value={passageText}
                onChange={(e) => setPassageText(e.target.value)}
                placeholder="Paste the reading passage here..."
                className="min-h-24"
                disabled={isLoading}
              />
              <Button
                type="submit"
                disabled={isLoading || !passageText.trim()}
                className="w-full bg-emerald-600 hover:bg-emerald-700"
              >
                Load Passage
              </Button>
            </form>
          )}

          {/* Question Input */}
          {messages.length > 0 && (
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="Ask a question about the passage..."
                className="flex-1"
                disabled={isLoading}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
                    e.preventDefault()
                    handleSubmit(e as any)
                  }
                }}
              />
              <Button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-emerald-600 hover:bg-emerald-700"
                size="icon"
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
          )}

          <p className="text-xs text-muted-foreground text-center">
            The bot will guide you through Tone Analysis → Question Understanding → Strategic Elimination
          </p>
        </CardContent>
      )}
    </Card>
  )
}
