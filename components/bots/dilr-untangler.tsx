'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Loader2, Zap, AlertTriangle, ArrowRight, BookOpen } from 'lucide-react'

export function DilrUntangler() {
  const [inputText, setInputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  const handleUntangle = async () => {
    if (!inputText.trim()) return
    setIsLoading(true)
    setResult(null)

    try {
      const res = await fetch('/api/llm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'dilr-untangler',
          dilrDescription: inputText
        })
      })

      if (!res.ok) throw new Error('API failed')
      const data = await res.json()
      setResult(data)
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  const getVerdictStyle = (verdict: string) => {
    const v = verdict.toUpperCase()
    if (v.includes('ATTEMPT')) return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20 shadow-emerald-500/5'
    if (v.includes('SKIP')) return 'bg-rose-500/10 text-rose-500 border-rose-500/20 shadow-rose-500/5'
    return 'bg-amber-500/10 text-amber-500 border-amber-500/20 shadow-amber-500/5'
  }

  return (
    <Card className="border-purple-500/25 bg-background/60 backdrop-blur-md overflow-hidden shadow-lg">
      <CardHeader className="bg-gradient-to-r from-purple-600/10 to-pink-600/10 border-b border-purple-500/15 py-3">
        <div>
          <CardTitle className="text-base font-bold flex items-center gap-1.5 text-purple-500">
            🧩 DILR Untangler
          </CardTitle>
          <CardDescription className="text-xs">
            Evaluate logical sets, decide if you should attempt, and optimize solving order
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        
        {/* Input box */}
        <div className="space-y-2">
          <Textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste a description of the DILR puzzle / table / logic grid (e.g. '8 people in a circle, 3 clues are negative, 4 variables...')"
            rows={3}
            className="text-xs animate-in"
            disabled={isLoading}
          />
          
          {/* Quick Mock Fill button for testing convenience */}
          <div className="flex gap-2 justify-end">
            <Button
              onClick={() => setInputText("A tournament has 8 teams playing in a knock-out format. There are 3 seeded teams, and some match scores are missing from the grid. We have to find the total goals scored in Round 2.")}
              variant="ghost"
              size="xs"
              className="text-[9px] h-6 text-purple-500 hover:text-purple-600 hover:bg-purple-500/5 px-2"
              disabled={isLoading}
            >
              🪄 Mock Tournament Set
            </Button>
            <Button
              onClick={() => setInputText("Matrix matching with 4 parameters: 5 people, 5 cities, 5 jobs, and 5 cars. Clues: A drives BMW, Doctor lives in Delhi, B does not live in Mumbai, C is a teacher.")}
              variant="ghost"
              size="xs"
              className="text-[9px] h-6 text-purple-500 hover:text-purple-600 hover:bg-purple-500/5 px-2"
              disabled={isLoading}
            >
              🪄 Mock Matrix Set
            </Button>
          </div>

          <Button
            onClick={handleUntangle}
            disabled={isLoading || !inputText.trim()}
            className="w-full text-xs font-bold bg-purple-600 hover:bg-purple-700 gap-1.5"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Untangling Set Structure...
              </>
            ) : (
              <>
                <Zap className="w-4 h-4" /> Evaluate Attempt Verdict
              </>
            )}
          </Button>
        </div>

        {/* Results */}
        {result && (
          <div className="space-y-4 animate-in fade-in zoom-in-95 duration-200 border-t border-border/40 pt-4">
            
            {/* Verdict and Difficulty Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className={`border p-3 rounded-lg text-center ${getVerdictStyle(result.verdict)}`}>
                <span className="text-[9px] font-bold text-muted-foreground uppercase block tracking-wider mb-1">Verdict</span>
                <span className="text-sm font-black">{result.verdict}</span>
              </div>
              <div className="border border-border/40 p-3 rounded-lg text-center bg-secondary/20">
                <span className="text-[9px] font-bold text-muted-foreground uppercase block tracking-wider mb-1">Difficulty</span>
                <span className="text-sm font-black text-foreground">{result.difficulty}</span>
              </div>
            </div>

            {/* Strategic Checklist */}
            <div className="bg-secondary/35 border border-border/40 rounded-xl p-3.5 space-y-2.5">
              <h5 className="text-xs font-black text-purple-500 uppercase tracking-wide flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" /> Decision & Solve Strategy:
              </h5>
              <div className="space-y-2">
                {result.strategy?.map((strat: string, idx: number) => (
                  <div key={idx} className="text-xs leading-relaxed text-foreground/80 flex items-start gap-2">
                    <span className="text-purple-500 shrink-0 font-bold">•</span>
                    <span>{strat}</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-[9px] text-center text-muted-foreground italic leading-normal px-4">
              ⚠️ In DILR, choosing the correct 2 sets to solve is better than starting 4 and finishing none. Speed-to-decision saves your score.
            </p>
          </div>
        )}

      </CardContent>
    </Card>
  )
}
