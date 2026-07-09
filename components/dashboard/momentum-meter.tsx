'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Zap, AlertCircle, RefreshCw, BarChart2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface MoodLog {
  timestamp: string
  energy: string
  taskType: string
}

export function MomentumMeter() {
  const [momentum, setMomentum] = useState<number>(85)
  const [moodLogs, setMoodLogs] = useState<MoodLog[]>([])
  const [insights, setInsights] = useState<string[]>([])

  useEffect(() => {
    // Load from LocalStorage
    const savedMomentum = localStorage.getItem('cat-prep-momentum')
    if (savedMomentum) {
      setMomentum(Number(savedMomentum))
    }

    const savedLogs = localStorage.getItem('cat-prep-mood-logs')
    if (savedLogs) {
      try {
        setMoodLogs(JSON.parse(savedLogs))
      } catch (e) {
        console.error(e)
      }
    }
  }, [])

  useEffect(() => {
    // Generate simple correlation insights
    if (moodLogs.length === 0) {
      setInsights([
        "Start practicing to see personalized focus insights.",
        "We correlate your picked energy with study time to build peak-hour recommendations."
      ])
      return
    }

    const newInsights: string[] = []
    const peaks = moodLogs.filter(l => l.energy === 'Peak Energy 🔥')
    const morningPeaks = peaks.filter(l => {
      const hours = new Date(l.timestamp).getHours()
      return hours >= 5 && hours < 12
    })

    if (morningPeaks.length >= 2) {
      newInsights.push("🔥 You tackle your best Quant problems at Peak Energy in the mornings.")
    } else {
      newInsights.push("☕ Keep logging sessions to generate your Peak Focus recommendations.")
    }

    const brainDeads = moodLogs.filter(l => l.energy === 'Brain Dead 🥱')
    if (brainDeads.length > 0) {
      newInsights.push("🥱 You've done passive review sessions when tired—great job keeping the momentum!")
    }

    setInsights(newInsights)
  }, [moodLogs])

  const saveMomentum = (val: number) => {
    setMomentum(val)
    localStorage.setItem('cat-prep-momentum', String(val))
  }

  const simulateStudy = () => {
    const newVal = Math.min(100, momentum + 15)
    saveMomentum(newVal)

    // Log the mood log
    const energies = ['Brain Dead 🥱', 'Medium Focus ☕', 'Peak Energy 🔥']
    const pickedEnergy = energies[Math.floor(Math.random() * energies.length)]
    const tasks = ['Quant Companion', 'Formula Roulette', 'DILR Untangler', 'Swipe Deck']
    const pickedTask = tasks[Math.floor(Math.random() * tasks.length)]

    const newLog: MoodLog = {
      timestamp: new Date().toISOString(),
      energy: pickedEnergy,
      taskType: pickedTask
    }

    const updatedLogs = [newLog, ...moodLogs].slice(0, 30)
    setMoodLogs(updatedLogs)
    localStorage.setItem('cat-prep-mood-logs', JSON.stringify(updatedLogs))
  }

  const simulateMissedDay = () => {
    // Decay slowly: 15% reduction instead of resetting to 0
    const newVal = Math.max(0, Math.round(momentum * 0.85))
    saveMomentum(newVal)
  }

  const getBatteryColor = () => {
    if (momentum > 70) return 'bg-emerald-500 shadow-emerald-500/50'
    if (momentum > 40) return 'bg-amber-500 shadow-amber-500/50'
    return 'bg-rose-500 shadow-rose-500/50'
  }

  return (
    <Card className="border-border/60 bg-background/50 backdrop-blur-md relative overflow-hidden shadow-xl">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500" /> Momentum Meter
            </CardTitle>
            <CardDescription>Streaks decay gently, keeping guilt away</CardDescription>
          </div>
          <span className="text-2xl font-black text-foreground">{momentum}%</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Momentum Bar */}
        <div className="w-full h-4 bg-muted rounded-full overflow-hidden p-0.5 border border-border/50">
          <div 
            className={`h-full rounded-full transition-all duration-500 ${getBatteryColor()}`}
            style={{ width: `${momentum}%` }}
          />
        </div>

        {/* Action simulations for presentation */}
        <div className="flex gap-2 justify-between">
          <Button size="xs" variant="outline" onClick={simulateMissedDay} className="text-xs py-1 h-7">
            Simulate Missed Day (-15%)
          </Button>
          <Button size="xs" variant="outline" onClick={simulateStudy} className="text-xs py-1 h-7 bg-primary/10 border-primary/20 text-primary hover:bg-primary/20">
            Simulate Study (+15%)
          </Button>
        </div>

        {/* Mood insights */}
        <div className="border-t border-border/60 pt-4 mt-2">
          <div className="flex items-center gap-1.5 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            <BarChart2 className="w-4 h-4 text-primary" /> Mood-Task Correlation
          </div>
          <div className="space-y-2">
            {insights.map((insight, idx) => (
              <div key={idx} className="text-sm text-foreground/80 bg-secondary/35 p-2.5 rounded-lg border border-border/40">
                {insight}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
