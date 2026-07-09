'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, Eye, Check, RefreshCw, XCircle } from 'lucide-react'
import { ErrorLogEntry } from '@/lib/llm'

export function SwipeDeck() {
  const [deck, setDeck] = useState<ErrorLogEntry[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [revealSolution, setRevealSolution] = useState(false)
  const [swipeDir, setSwipeDir] = useState<'left' | 'right' | null>(null)

  // Curated initial cards if the user's error log is empty
  const defaultCards: ErrorLogEntry[] = [
    {
      id: 'default-1',
      questionText: "A train passes a telegraph pole in 15 seconds while traveling at 60 km/h. What is the length of the train? (Mistake made: Multiplying 60 by 15 without converting km/h to m/s)",
      topic: "Time, Speed & Distance",
      mistakeType: "Concept Gap",
      source: "mock",
      timestamp: new Date().toISOString(),
      confidence: 2,
      reviewCount: 1
    },
    {
      id: 'default-2',
      questionText: "Find the unit digit of 3^67. (Mistake made: Assumed cyclicity of 3 is 2 instead of 4, calculated remainder of 67/2 instead of 67/4)",
      topic: "Number Systems",
      mistakeType: "Silly",
      source: "practice",
      timestamp: new Date().toISOString(),
      confidence: 3,
      reviewCount: 0
    },
    {
      id: 'default-3',
      questionText: "If A and B work together they finish in 6 days. If A is twice as efficient as B, how long does A take? (Mistake made: Wrote A's speed as 2x and B's speed as x, but inverted the final ratio for time taken)",
      topic: "Time & Work",
      mistakeType: "Silly",
      source: "PYQ",
      timestamp: new Date().toISOString(),
      confidence: 4,
      reviewCount: 3
    }
  ]

  const loadDeck = () => {
    const stored = localStorage.getItem('cat-prep-error-log')
    let log: ErrorLogEntry[] = []
    if (stored) {
      try {
        log = JSON.parse(stored)
      } catch (e) {
        console.error(e)
      }
    }
    // Filter active uncleared logs
    const uncleared = log.filter(e => !e.cleared)
    if (uncleared.length > 0) {
      setDeck(uncleared)
    } else {
      setDeck(defaultCards)
    }
    setCurrentIndex(0)
    setRevealSolution(false)
    setSwipeDir(null)
  }

  useEffect(() => {
    loadDeck()

    // Add event listener to reload when error log changes (from WhatsApp or bot page)
    window.addEventListener('storage', loadDeck)
    return () => window.removeEventListener('storage', loadDeck)
  }, [])

  const handleSwipe = (direction: 'left' | 'right') => {
    setSwipeDir(direction)

    setTimeout(() => {
      const activeCard = deck[currentIndex]

      if (direction === 'right') {
        // Mastered - mark as cleared in local storage
        const stored = localStorage.getItem('cat-prep-error-log')
        if (stored) {
          try {
            const log: ErrorLogEntry[] = JSON.parse(stored)
            const updated = log.map(item => {
              if (item.id === activeCard.id) {
                return { ...item, cleared: true, lastReviewedDate: new Date().toISOString() }
              }
              return item
            })
            localStorage.setItem('cat-prep-error-log', JSON.stringify(updated))
          } catch (e) {
            console.error(e)
          }
        }
      } else {
        // Keep in rotation - increment review count
        const stored = localStorage.getItem('cat-prep-error-log')
        if (stored) {
          try {
            const log: ErrorLogEntry[] = JSON.parse(stored)
            const updated = log.map(item => {
              if (item.id === activeCard.id) {
                return { ...item, reviewCount: item.reviewCount + 1, lastReviewedDate: new Date().toISOString() }
              }
              return item
            })
            localStorage.setItem('cat-prep-error-log', JSON.stringify(updated))
          } catch (e) {
            console.error(e)
          }
        }
      }

      setCurrentIndex(prev => prev + 1)
      setRevealSolution(false)
      setSwipeDir(null)
    }, 300)
  }

  if (currentIndex >= deck.length) {
    return (
      <Card className="border-border/60 bg-background/50 backdrop-blur-md text-center py-10 shadow-xl">
        <CardContent className="space-y-4">
          <p className="text-muted-foreground text-lg">🎉 Inbox Zero! No pending review cards.</p>
          <Button onClick={loadDeck} size="sm" variant="outline" className="gap-2">
            <RefreshCw className="w-4 h-4" /> Restart Review Rotation
          </Button>
        </CardContent>
      </Card>
    )
  }

  const activeCard = deck[currentIndex]

  const getTagColor = (tag: string) => {
    switch (tag) {
      case 'Silly': return 'bg-rose-500/10 text-rose-500 border-rose-500/20'
      case 'Concept Gap': return 'bg-amber-500/10 text-amber-500 border-amber-500/20'
      case 'Time Out': return 'bg-blue-500/10 text-blue-500 border-blue-500/20'
      default: return 'bg-secondary text-foreground'
    }
  }

  return (
    <div className="relative w-full max-w-md mx-auto h-[440px] flex items-center justify-center select-none">
      {/* Swipe Overlay Indicator */}
      {swipeDir && (
        <div className={`absolute z-25 inset-0 flex items-center justify-center rounded-xl font-black text-4xl uppercase tracking-widest pointer-events-none transition-all duration-200 border-4 ${
          swipeDir === 'right' 
            ? 'bg-emerald-500/20 text-emerald-500 border-emerald-500/60 rotate-6 scale-105' 
            : 'bg-rose-500/20 text-rose-500 border-rose-500/60 -rotate-6 scale-105'
        }`}>
          {swipeDir === 'right' ? 'Mastered!' : 'Retry Later'}
        </div>
      )}

      {/* Current Card */}
      <Card className={`absolute w-full h-full border-border/70 bg-card/95 shadow-2xl flex flex-col justify-between transition-all duration-300 transform rounded-xl ${
        swipeDir === 'right' 
          ? 'translate-x-full rotate-12 opacity-0' 
          : swipeDir === 'left' 
          ? '-translate-x-full -rotate-12 opacity-0' 
          : 'translate-x-0 rotate-0 opacity-100'
      }`}>
        <CardHeader className="pb-2 flex flex-row items-start justify-between space-y-0">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20">
              {activeCard.topic}
            </span>
            <CardDescription className="text-xs mt-1">
              Source: <span className="font-semibold text-foreground/80">{activeCard.source.toUpperCase()}</span>
            </CardDescription>
          </div>
          <span className={`text-[10px] font-bold border px-2 py-0.5 rounded ${getTagColor(activeCard.mistakeType)}`}>
            {activeCard.mistakeType}
          </span>
        </CardHeader>

        <CardContent className="flex-1 overflow-y-auto flex flex-col justify-between px-6 py-4">
          <div className="space-y-4">
            <h3 className="text-base font-medium text-foreground leading-relaxed">
              {activeCard.questionText.split('(Mistake')[0]}
            </h3>
            
            {activeCard.questionText.includes('(Mistake') && (
              <div className="bg-secondary/40 border border-border/50 rounded-lg p-3 text-xs text-muted-foreground italic">
                💡 Logged mistake: {activeCard.questionText.split('(Mistake made:')[1]?.replace(')', '') || activeCard.questionText}
              </div>
            )}

            {revealSolution && (
              <div className="bg-amber-500/5 border border-amber-500/20 rounded-lg p-3 text-sm text-foreground/90 space-y-2 mt-2 animate-in fade-in zoom-in-95 duration-200">
                <p className="font-semibold text-xs text-amber-500 flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" /> REVISION TIP:
                </p>
                <p className="text-xs leading-relaxed">
                  {activeCard.mistakeType === 'Concept Gap' 
                    ? 'Check unit conversions (e.g. km/h to m/s = * 5/18) and confirm core formula parameters before calculation.' 
                    : 'Slow down at the final algebraic steps. Sign flips and basic cyclicity steps are typical areas for silly mistakes.'}
                </p>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-border/40 mt-4 flex items-center justify-between">
            <span className="text-[10px] text-muted-foreground font-mono">
              Reviewed {activeCard.reviewCount} times
            </span>
            {!revealSolution && (
              <Button 
                onClick={() => setRevealSolution(true)} 
                size="xs" 
                variant="ghost" 
                className="text-xs text-primary hover:text-primary/80 hover:bg-transparent p-0 h-auto font-semibold gap-1"
              >
                Reveal Tip <Eye className="w-3 h-3" />
              </Button>
            )}
          </div>
        </CardContent>

        {/* Footer Actions */}
        <div className="grid grid-cols-2 border-t border-border/60 divide-x divide-border/60">
          <button
            onClick={() => handleSwipe('left')}
            className="flex items-center justify-center gap-2 py-4 text-xs font-semibold text-rose-500 hover:bg-rose-500/5 transition rounded-bl-xl active:bg-rose-500/10"
          >
            <ArrowLeft className="w-4 h-4" /> Keep in Rotation
          </button>
          <button
            onClick={() => handleSwipe('right')}
            className="flex items-center justify-center gap-2 py-4 text-xs font-semibold text-emerald-500 hover:bg-emerald-500/5 transition rounded-br-xl active:bg-emerald-500/10"
          >
            Mastered <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </Card>
    </div>
  )
}
