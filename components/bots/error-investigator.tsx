'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Loader2, Search, Sparkles, Check, ChevronDown } from 'lucide-react'
import { ErrorLogEntry } from '@/lib/llm'

interface PeekStep {
  title: string
  content: string
}

export function ErrorInvestigator() {
  const [inputText, setInputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [revealedSteps, setRevealedSteps] = useState<Record<number, boolean>>({})

  const handleInvestigate = async () => {
    if (!inputText.trim()) return
    setIsLoading(true)
    setResult(null)
    setRevealedSteps({})

    try {
      const res = await fetch('/api/llm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'investigate-error',
          questionInput: inputText
        })
      })

      if (!res.ok) throw new Error('API failed')
      const data = await res.json()
      setResult(data)

      // Automatically store in LocalStorage Error Log
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
        questionText: inputText,
        topic: data.steps?.[0]?.content?.slice(0, 30) || 'Quantitative Aptitude',
        mistakeType: data.mistakeType,
        source: 'practice',
        timestamp: new Date().toISOString(),
        confidence: 3,
        reviewCount: 0,
        cleared: false
      }

      localStorage.setItem('cat-prep-error-log', JSON.stringify([newEntry, ...log]))
      window.dispatchEvent(new Event('storage'))

    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleStep = (idx: number) => {
    setRevealedSteps(prev => ({ ...prev, [idx]: !prev[idx] }))
  }

  const getTagColor = (tag: string) => {
    switch (tag) {
      case 'Silly': return 'bg-rose-500/10 text-rose-500 border-rose-500/20'
      case 'Concept Gap': return 'bg-amber-500/10 text-amber-500 border-amber-500/20'
      case 'Time Out': return 'bg-blue-500/10 text-blue-500 border-blue-500/20'
      default: return 'bg-secondary text-foreground'
    }
  }

  return (
    <Card className="border-rose-500/25 bg-background/60 backdrop-blur-md overflow-hidden shadow-lg">
      <CardHeader className="bg-gradient-to-r from-rose-600/10 to-pink-600/10 border-b border-rose-500/15 py-3">
        <div>
          <CardTitle className="text-base font-bold flex items-center gap-1.5 text-rose-500">
            🔍 Error Investigator
          </CardTitle>
          <CardDescription className="text-xs">
            Analyze mistakes, auto-tag issues, and review with Peek-a-Boo steps
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        
        {/* Input box */}
        <div className="space-y-2">
          <Textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste a math/logic question you got wrong or type a description of the error..."
            rows={3}
            className="text-xs"
            disabled={isLoading}
          />
          <Button
            onClick={handleInvestigate}
            disabled={isLoading || !inputText.trim()}
            className="w-full text-xs font-bold bg-rose-600 hover:bg-rose-700 gap-1.5"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Analyzing Mistake...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" /> Investigate & Log Error
              </>
            )}
          </Button>
        </div>

        {/* Results */}
        {result && (
          <div className="space-y-3.5 animate-in fade-in zoom-in-95 duration-200 border-t border-border/40 pt-4">
            
            {/* Tag details */}
            <div className="flex items-center gap-2 justify-between">
              <span className="text-xs text-muted-foreground">AUTO TAGGED MISTAKE:</span>
              <span className={`text-xs font-black border px-2.5 py-0.5 rounded-full ${getTagColor(result.mistakeType)}`}>
                {result.mistakeType}
              </span>
            </div>
            
            <p className="text-xs text-muted-foreground leading-relaxed bg-secondary/35 p-3 rounded-lg border border-border/40">
              💡 <strong>Reasoning:</strong> {result.tagReason}
            </p>

            {/* Peek-a-Boo Solutions */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">Peek-a-Boo Solution Guide:</span>
              {result.steps?.map((step: PeekStep, idx: number) => {
                const isRevealed = !!revealedSteps[idx]
                return (
                  <div key={idx} className="border border-border/60 rounded-lg overflow-hidden bg-card/60">
                    <button
                      onClick={() => toggleStep(idx)}
                      className="w-full text-left px-3.5 py-2.5 text-xs font-semibold flex items-center justify-between hover:bg-secondary/40 transition active:bg-secondary/60"
                    >
                      <span>{step.title}</span>
                      <ChevronDown className={`w-3.5 h-3.5 text-muted-foreground transition-transform ${isRevealed ? 'rotate-180' : ''}`} />
                    </button>
                    {isRevealed && (
                      <div className="px-3.5 py-3 text-xs leading-relaxed text-foreground/80 border-t border-border/30 bg-secondary/20 animate-in slide-in-from-top-1 duration-150">
                        {step.content}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
            
            <p className="text-[10px] text-center text-emerald-500 font-medium">
              ✔ Stored in Central Error Log & ready in Swipe deck.
            </p>
          </div>
        )}

      </CardContent>
    </Card>
  )
}
