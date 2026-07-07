'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, Send, ChevronDown } from 'lucide-react'
import { useChat } from '@ai-sdk/react'

export function QuantBot() {
  const [isOpen, setIsOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/bots/quant',
    id: 'quant-bot',
  })

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <Card className="mb-12 border-blue-200/50 overflow-hidden">
      <CardHeader 
        className="cursor-pointer hover:bg-blue-50/50 transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Interactive Problem Solver</CardTitle>
            <CardDescription>
              Share a problem and I'll guide you through the 3-step scroll strategy
            </CardDescription>
          </div>
          <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </CardHeader>

      {isOpen && (
        <CardContent className="space-y-4">
          {/* Chat Messages */}
          <div className="space-y-4 h-96 overflow-y-auto bg-blue-50/30 rounded-lg p-4 border border-blue-100">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <p className="text-muted-foreground mb-2">Share a math problem and I'll help you solve it</p>
                <p className="text-xs text-muted-foreground">
                  Example: "A train travels 100km in 2 hours. What's its speed?"
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
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-foreground border border-blue-100'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="px-4 py-2 rounded-lg bg-white text-foreground border border-blue-100 flex gap-2">
                      <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                      <span className="text-sm">Thinking...</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Paste your problem here..."
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
              className="bg-blue-600 hover:bg-blue-700"
              size="icon"
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>

          <p className="text-xs text-muted-foreground text-center">
            The bot will guide you through Understanding → Planning → Executing
          </p>
        </CardContent>
      )}
    </Card>
  )
}
