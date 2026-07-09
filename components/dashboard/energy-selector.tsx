'use client'

import { useState } from 'react'
import { SwipeDeck } from './swipe-deck'
import { QuantCompanion } from '../bots/quant-companion'
import { ErrorInvestigator } from '../bots/error-investigator'
import { VarcCoach } from '../bots/varc-coach'
import { DilrUntangler } from '../bots/dilr-untangler'
import { VocabGhost } from '../bots/vocab-ghost'
import { MockPostMortem } from '../bots/mock-post-mortem'
import { CollegePredictor } from '../bots/college-predictor'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Bolt, Coffee, Flame, Moon, Sparkles } from 'lucide-react'

type EnergyVibe = 'brain-dead' | 'medium' | 'peak'

export function EnergySelector() {
  const [vibe, setVibe] = useState<EnergyVibe>('medium')
  const [fiveMinuteMode, setFiveMinuteMode] = useState(false)
  const [activeTask, setActiveTask] = useState<string>('')

  const handleVibeChange = (newVibe: EnergyVibe) => {
    setVibe(newVibe)
    setActiveTask('') // reset active sub-task when vibe changes
  }

  // Energy vibes config
  const vibes = [
    {
      id: 'brain-dead',
      label: 'Brain Dead 🥱',
      color: 'border-blue-500 text-blue-500 hover:bg-blue-500/5',
      activeColor: 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/20',
      description: 'Passive / Easy tasks to keep momentum'
    },
    {
      id: 'medium',
      label: 'Medium Focus ☕',
      color: 'border-amber-500 text-amber-500 hover:bg-amber-500/5',
      activeColor: 'bg-amber-500 text-white border-amber-500 shadow-lg shadow-amber-500/20',
      description: 'Quick math roulette or DILR decisions'
    },
    {
      id: 'peak',
      label: 'Peak Energy 🔥',
      color: 'border-rose-500 text-rose-500 hover:bg-rose-500/5',
      activeColor: 'bg-rose-600 text-white border-rose-600 shadow-lg shadow-rose-500/20',
      description: 'Deep work & interactive problem analysis'
    }
  ]

  return (
    <div className="space-y-6">
      
      {/* Vibe Selection Panel */}
      <Card className="border-border/60 bg-background/50 backdrop-blur-md shadow-xl">
        <CardContent className="p-4 space-y-4">
          
          {/* Five-minute mode toggle */}
          <div className="flex items-center justify-between bg-secondary/35 border border-border/40 p-3 rounded-xl">
            <div className="flex items-center gap-2">
              <Bolt className={`w-5 h-5 ${fiveMinuteMode ? 'text-amber-500 animate-pulse' : 'text-muted-foreground'}`} />
              <div>
                <span className="text-xs font-bold text-foreground block">⚡ 5-Minute Break Mode</span>
                <span className="text-[10px] text-muted-foreground">For lift/queue/toilet breaks — serves exactly one card</span>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={fiveMinuteMode} 
                onChange={(e) => setFiveMinuteMode(e.target.checked)} 
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-border/50 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500"></div>
            </label>
          </div>

          {/* Regular Energy Selection */}
          {!fiveMinuteMode && (
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">
                Pick Your Current Energy Level:
              </span>
              <div className="grid grid-cols-3 gap-2">
                {vibes.map((item) => {
                  const isActive = vibe === item.id
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleVibeChange(item.id as EnergyVibe)}
                      className={`text-xs font-bold py-2.5 px-2 rounded-xl border text-center transition duration-200 ${
                        isActive ? item.activeColor : `bg-background ${item.color}`
                      }`}
                    >
                      {item.label}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

        </CardContent>
      </Card>

      {/* RENDER TASKS */}
      <div className="space-y-4">
        {fiveMinuteMode ? (
          <div className="space-y-3 animate-in zoom-in-95 duration-200">
            <div className="text-center py-1">
              <span className="text-xs font-bold text-amber-500 uppercase tracking-widest flex items-center justify-center gap-1">
                <Sparkles className="w-4 h-4 animate-spin duration-3000" /> 5-Minute Micro Session
              </span>
            </div>
            {/* Serves exactly one flashcard stack */}
            <SwipeDeck />
          </div>
        ) : (
          <div className="space-y-4 animate-in fade-in duration-200">
            
            {/* Sub-Task Grid based on Vibe */}
            {vibe === 'brain-dead' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Tinder Swipe Review</h4>
                  <SwipeDeck />
                </div>
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wide">VARC Listening Room</h4>
                  <VarcCoach />
                </div>
              </div>
            )}

            {vibe === 'medium' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <QuantCompanion />
                  <DilrUntangler />
                </div>
                <VocabGhost />
              </div>
            )}

            {vibe === 'peak' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <QuantCompanion />
                  <ErrorInvestigator />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <MockPostMortem />
                  <CollegePredictor />
                </div>
              </div>
            )}

          </div>
        )}
      </div>

    </div>
  )
}
