'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Loader2, FileText, Sparkles, RefreshCw } from 'lucide-react'
import { ErrorLogEntry } from '@/lib/llm'

export function MockPostMortem() {
  const [summary, setSummary] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const triggerPostMortem = async () => {
    setIsLoading(true)
    setSummary(null)

    // Load from LocalStorage
    const stored = localStorage.getItem('cat-prep-error-log')
    let log: ErrorLogEntry[] = []
    if (stored) {
      try {
        log = JSON.parse(stored)
      } catch (e) {
        console.error(e)
      }
    }

    try {
      const res = await fetch('/api/llm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'post-mortem',
          errors: log
        })
      })

      if (!res.ok) throw new Error('API failed')
      const data = await res.json()
      setSummary(data.summary)
    } catch (e) {
      console.error(e)
      setSummary("⚠️ Failed to load. Please verify your connection or ensure you have logged some errors.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="border-indigo-500/25 bg-background/60 backdrop-blur-md overflow-hidden shadow-lg">
      <CardHeader className="bg-gradient-to-r from-indigo-600/10 to-indigo-700/10 border-b border-indigo-500/15 py-3">
        <div>
          <CardTitle className="text-base font-bold flex items-center gap-1.5 text-indigo-500">
            📊 Mock Test Post-Mortem
          </CardTitle>
          <CardDescription className="text-xs">
            Auto-generate a summary of your weaknesses from your logged errors
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        
        {!summary ? (
          <div className="text-center py-6 space-y-3">
            <p className="text-xs text-muted-foreground leading-relaxed">
              Skip stressful self-diagnosis. Let AI review your mistake log and generate a targeted post-mortem summary.
            </p>
            <Button
              onClick={triggerPostMortem}
              disabled={isLoading}
              className="bg-indigo-600 hover:bg-indigo-700 text-xs font-bold gap-1.5 w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Synthesizing Error Log...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" /> Generate Post-Mortem Report
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-xl p-4 space-y-3">
              <span className="text-[10px] font-black text-indigo-500 uppercase tracking-wide flex items-center gap-1">
                <FileText className="w-4 h-4" /> AI POST-MORTEM REPORT
              </span>
              <p className="text-xs leading-relaxed text-foreground/90 whitespace-pre-line font-medium">
                {summary}
              </p>
            </div>
            <Button
              onClick={triggerPostMortem}
              variant="outline"
              size="xs"
              className="w-full text-xs font-bold border-indigo-500/30 text-indigo-500 hover:bg-indigo-500/5 gap-1.5"
              disabled={isLoading}
            >
              <RefreshCw className="w-3.5 h-3.5" /> Re-Analyze Log
            </Button>
          </div>
        )}

      </CardContent>
    </Card>
  )
}
