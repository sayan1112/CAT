'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ShieldAlert, BookOpen, AlertCircle, VolumeX, Lightbulb, X } from 'lucide-react'
import formulas from '../lib/data/formulas.json' // wait, the relative path from components/dashboard/ to lib is ../../lib/
import defaultFormulas from '@/lib/data/formulas.json'

export function PanicMode({ onExit }: { onExit: () => void }) {
  const panicFormulas = defaultFormulas.slice(0, 5) // Get key high-yield formulas

  const urgentTips = [
    "🚨 **Don't touch new topics**: In the final stretch, your error log is your goldmine.",
    "⚠️ **Silly Error rule**: If you make a calculation error in a mock, write down EXACTLY the math mistake you made. Don't write 'silly error'—be specific: e.g., '14 * 6 = 78 instead of 84'.",
    "⏳ **The 2-Minute Abandonment rule**: If a DILR set is not structured/partially filled by the 2.5-minute mark, flag it and move on. Never sink 10 minutes into a single set.",
    "📝 **Read the exact constraint**: CAT examiners love hiding conditions like 'x is a positive INTEGER'. Highlight them before starting your equations."
  ]

  return (
    <div className="fixed inset-0 z-50 bg-rose-950/90 dark:bg-rose-950/95 backdrop-blur-lg flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-300">
      <div className="max-w-2xl w-full space-y-6 relative py-8">
        
        {/* Exit Button */}
        <button 
          onClick={onExit} 
          className="absolute top-0 right-0 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all border border-white/20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-full bg-rose-600 flex items-center justify-center mx-auto animate-bounce shadow-xl shadow-rose-600/40 border border-rose-400/30">
            <ShieldAlert className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-black text-white tracking-tight uppercase">Emergency Revision Mode</h2>
          <p className="text-rose-200 text-sm max-w-md mx-auto">
            Take a deep breath. Focus only on what matters right now. No new concepts, just high-yield facts.
          </p>
        </div>

        {/* Content Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Urgent Tips */}
          <Card className="bg-white/5 border-white/10 text-white shadow-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-rose-300 flex items-center gap-1.5 font-bold">
                <Lightbulb className="w-4 h-4" /> Final Countdown Rules
              </CardTitle>
              <CardDescription className="text-rose-200/60 text-xs">Essential test-taking guidelines</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {urgentTips.map((tip, idx) => (
                <div key={idx} className="bg-white/5 p-3 rounded-lg border border-white/5 text-xs text-rose-100/90 leading-relaxed">
                  <p dangerouslySetInnerHTML={{ __html: tip.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Key Formulas */}
          <Card className="bg-white/5 border-white/10 text-white shadow-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-rose-300 flex items-center gap-1.5 font-bold">
                <BookOpen className="w-4 h-4" /> Must-Know Formulas
              </CardTitle>
              <CardDescription className="text-rose-200/60 text-xs">High-probability quantitative checks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2.5 overflow-y-auto max-h-[300px] pr-1">
              {panicFormulas.map(f => (
                <div key={f.id} className="bg-white/5 p-3 rounded-lg border border-white/5 text-xs space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-rose-200">{f.topic}</span>
                  </div>
                  <p className="font-mono text-white text-sm bg-black/30 p-1.5 rounded text-center border border-white/5">{f.formula}</p>
                  <p className="text-[10px] text-rose-200/70">{f.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>

        </div>

        {/* Breathing exercises / relaxation reminder */}
        <div className="text-center bg-white/5 border border-white/10 rounded-xl p-4 text-rose-100 text-xs">
          🧘 **Quick Exercise**: Inhale for 4 seconds, hold for 4 seconds, exhale for 4 seconds. Repeat 3 times. You are prepared.
        </div>

        <div className="flex justify-center">
          <Button 
            onClick={onExit}
            className="bg-white text-rose-950 hover:bg-rose-100 font-bold px-6 py-2 rounded-lg"
          >
            I'm Ready. Back to Dashboard.
          </Button>
        </div>

      </div>
    </div>
  )
}
