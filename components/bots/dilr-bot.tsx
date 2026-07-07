'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, Send, ChevronDown, Eye } from 'lucide-react'
import { useChat } from '@ai-sdk/react'

export function DILRBot() {
  const [isOpen, setIsOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/bots/dilr',
    id: 'dilr-bot',
  })

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <Card className="mb-12 border-purple-200/50 overflow-hidden">
      <CardHeader 
        className="cursor-pointer hover:bg-purple-50/50 transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Logical Problem Solver</CardTitle>
            <CardDescription>
              Share a DILR problem and I'll help you visualize and deduce the solution
            </CardDescription>
          </div>
          <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </CardHeader>

      {isOpen && (
        <CardContent className="space-y-4">
          {/* Chat Messages */}
          <div className="space-y-4 h-96 overflow-y-auto bg-purple-50/30 rounded-lg p-4 border border-purple-100">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <Eye className="w-8 h-8 text-purple-600 mb-2" />
                <p className="text-muted-foreground mb-2">Share a logical reasoning problem and I'll visualize it</p>
                <p className="text-xs text-muted-foreground">
                  Example: "A, B, C, D sit in a row. A is left of B..."
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
                          ? 'bg-purple-600 text-white'
                          : 'bg-white text-foreground border border-purple-100'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="px-4 py-2 rounded-lg bg-white text-foreground border border-purple-100 flex gap-2">
                      <Loader2 className="w-4 h-4 animate-spin text-purple-600" />
                      <span className="text-sm">Visualizing...</span>
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
              className="bg-purple-600 hover:bg-purple-700"
              size="icon"
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>

          <p className="text-xs text-muted-foreground text-center">
            The bot will guide you through Peek → Visualize → Deduce
          </p>
        </CardContent>
      )}
    </Card>
  )
}
