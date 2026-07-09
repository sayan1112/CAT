'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, Send, Dices, Award, HelpCircle, ArrowRight } from 'lucide-react'
import { useChat } from '@ai-sdk/react'

export function QuantCompanion() {
  const [activeTab, setActiveTab] = useState<'roulette' | 'chat'>('roulette')
  const [rouletteLoading, setRouletteLoading] = useState(false)
  const [rouletteData, setRouletteData] = useState<any>(null)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [submittedAnswer, setSubmittedAnswer] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  // Custom Next.js Chat hook
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/llm',
    id: 'quant-companion-chat',
    body: {
      action: 'quant-chat'
    }
  })

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const triggerFormulaRoulette = async () => {
    setRouletteLoading(true)
    setRouletteData(null)
    setSelectedOption(null)
    setSubmittedAnswer(false)

    try {
      const res = await fetch('/api/llm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'formula-roulette' })
      })

      if (!res.ok) throw new Error('API failed')
      const data = await res.json()
      setRouletteData(data)
    } catch (e) {
      console.error(e)
    } finally {
      setRouletteLoading(false)
    }
  }

  const handleOptionSelect = (optionChar: string) => {
    if (submittedAnswer) return
    setSelectedOption(optionChar)
  }

  const checkAnswer = () => {
    if (!selectedOption) return
    setSubmittedAnswer(true)
  }

  return (
    <Card className="border-blue-500/25 bg-background/60 backdrop-blur-md overflow-hidden shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-600/10 to-indigo-600/10 border-b border-blue-500/15 py-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base font-bold flex items-center gap-1.5 text-blue-500">
              📐 Quant Companion
            </CardTitle>
            <CardDescription className="text-xs">
              3-Step Scroll Strategy & Formula Roulette
            </CardDescription>
          </div>
          
          {/* Sub Tabs */}
          <div className="flex bg-secondary/80 p-0.5 rounded-lg border border-border/60">
            <button
              onClick={() => setActiveTab('roulette')}
              className={`text-[10px] px-2 py-1 font-semibold rounded ${
                activeTab === 'roulette' 
                  ? 'bg-blue-600 text-white shadow-sm' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Roulette
            </button>
            <button
              onClick={() => setActiveTab('chat')}
              className={`text-[10px] px-2 py-1 font-semibold rounded ${
                activeTab === 'chat' 
                  ? 'bg-blue-600 text-white shadow-sm' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Scroll Chat
            </button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        {activeTab === 'roulette' ? (
          <div className="space-y-4">
            {!rouletteData ? (
              <div className="text-center py-6 space-y-3">
                <p className="text-sm text-muted-foreground">
                  Don't want to pick a math topic? Spin the roulette to serve a random formula and quiz.
                </p>
                <Button 
                  onClick={triggerFormulaRoulette} 
                  disabled={rouletteLoading}
                  className="bg-blue-600 hover:bg-blue-700 text-xs font-bold gap-1.5"
                >
                  {rouletteLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Spinning...
                    </>
                  ) : (
                    <>
                      <Dices className="w-4 h-4" /> Spin Formula Roulette
                    </>
                  )}
                </Button>
              </div>
            ) : (
              <div className="space-y-4 animate-in fade-in duration-200">
                {/* Served Formula */}
                <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-3 space-y-1.5">
                  <div className="flex justify-between items-center text-[10px] font-bold text-blue-500">
                    <span>TOPIC: {rouletteData.formula.topic.toUpperCase()}</span>
                    <span>HUMAN VERIFIED ✔</span>
                  </div>
                  <h4 className="font-mono text-sm text-foreground bg-secondary/55 p-2 rounded text-center border border-border/40">
                    {rouletteData.formula.formula}
                  </h4>
                  <p className="text-xs text-muted-foreground">{rouletteData.formula.description}</p>
                </div>

                {/* Challenge Question */}
                <div className="space-y-3 bg-secondary/25 p-3 rounded-lg border border-border/40">
                  <h5 className="text-sm font-semibold flex gap-1.5 items-start">
                    <HelpCircle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                    <span>{rouletteData.question}</span>
                  </h5>

                  {/* Options */}
                  <div className="grid grid-cols-1 gap-2">
                    {rouletteData.options.map((opt: string) => {
                      const optChar = opt.charAt(0) // A, B, C, D
                      const isSelected = selectedOption === optChar
                      const isCorrect = optChar === rouletteData.correctAnswer

                      let btnStyle = 'border-border/50 bg-background hover:bg-secondary/40'
                      if (isSelected) {
                        btnStyle = 'border-blue-600 bg-blue-600/10 text-blue-500'
                      }
                      if (submittedAnswer) {
                        if (isCorrect) {
                          btnStyle = 'border-emerald-600 bg-emerald-600/15 text-emerald-500'
                        } else if (isSelected) {
                          btnStyle = 'border-rose-600 bg-rose-600/15 text-rose-500'
                        } else {
                          btnStyle = 'opacity-50 border-border/30 bg-background'
                        }
                      }

                      return (
                        <button
                          key={opt}
                          onClick={() => handleOptionSelect(optChar)}
                          disabled={submittedAnswer}
                          className={`text-left text-xs p-2.5 rounded-lg border transition duration-200 ${btnStyle}`}
                        >
                          {opt}
                        </button>
                      )
                    })}
                  </div>

                  {!submittedAnswer ? (
                    <Button
                      onClick={checkAnswer}
                      disabled={!selectedOption}
                      className="w-full text-xs font-bold bg-blue-600 hover:bg-blue-700"
                    >
                      Check Answer
                    </Button>
                  ) : (
                    <div className="bg-secondary/40 border border-border/50 rounded-lg p-3 space-y-2 animate-in slide-in-from-bottom-2 duration-200">
                      <p className="text-xs font-bold text-foreground">
                        {selectedOption === rouletteData.correctAnswer ? (
                          <span className="text-emerald-500 flex items-center gap-1">🎉 Correct! Great job!</span>
                        ) : (
                          <span className="text-rose-500 flex items-center gap-1">❌ Incorrected. Correct option is {rouletteData.correctAnswer}</span>
                        )}
                      </p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {rouletteData.explanation}
                      </p>
                      <Button
                        onClick={triggerFormulaRoulette}
                        variant="outline"
                        className="w-full text-xs font-bold border-blue-500/30 text-blue-500 hover:bg-blue-500/5 mt-2"
                      >
                        Spin Next Formula
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {/* Chat message display */}
            <div className="h-64 overflow-y-auto bg-blue-50/5 dark:bg-secondary/15 rounded-lg p-3 border border-border/40 space-y-3">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-xs space-y-1">
                  <p className="text-muted-foreground font-medium">Quant AI Tutor (3-Step Scroll Mode)</p>
                  <p className="text-[10px] text-muted-foreground/80 max-w-xs">
                    Paste any math question. I will guide you systematically: Analogy → Master Formula → Traps.
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
                        className={`max-w-[85%] px-3 py-2 rounded-lg text-xs leading-relaxed ${
                          message.role === 'user'
                            ? 'bg-blue-600 text-white rounded-tr-none shadow-sm'
                            : 'bg-card text-foreground border border-border/40 rounded-tl-none shadow-sm markdown-styling'
                        }`}
                      >
                        <p className="whitespace-pre-wrap">{message.content}</p>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="px-3 py-2 rounded-lg bg-card border border-border/40 flex gap-1.5 items-center shadow-sm">
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-600" />
                        <span className="text-[10px] text-muted-foreground">Thinking...</span>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="Ask me a math question..."
                className="flex-1 text-xs h-9"
                disabled={isLoading}
              />
              <Button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-blue-600 hover:bg-blue-700 h-9 w-9 p-0 flex items-center justify-center shrink-0"
              >
                <Send className="w-3.5 h-3.5 text-white" />
              </Button>
            </form>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
