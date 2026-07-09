'use client'

import { useState, useEffect } from 'react'
import { EnergySelector } from '@/components/dashboard/energy-selector'
import { MomentumMeter } from '@/components/dashboard/momentum-meter'
import { WhatsappPipeline } from '@/components/dashboard/whatsapp-pipeline'
import { PanicMode } from '@/components/dashboard/panic-mode'
import { Button } from '@/components/ui/button'
import { ShieldAlert, Calendar, Users, Award, EyeOff, CheckCircle } from 'lucide-react'

export default function Home() {
  const [panicActive, setPanicActive] = useState(false)
  const [daysRemaining, setDaysRemaining] = useState(138)
  const [leaderboardOptIn, setLeaderboardOptIn] = useState(true)

  const toggleCountdownSimulation = () => {
    // Toggle between standard countdown (138 days) and final stretch countdown (18 days)
    setDaysRemaining(prev => (prev === 138 ? 18 : 138))
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 selection:bg-primary/30 selection:text-primary-foreground relative pb-20">
      
      {/* Background gradients for ambient glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="border-b border-white/10 bg-slate-950/80 backdrop-blur sticky top-0 z-40">
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <span className="text-white font-bold text-lg">μ</span>
            </div>
            <span className="text-base font-black bg-gradient-to-r from-indigo-200 to-purple-200 bg-clip-text text-transparent tracking-tight">
              CAT Micro-Bots
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={() => setPanicActive(true)}
              variant="outline"
              size="sm"
              className="bg-rose-950/40 border-rose-500/35 text-rose-400 hover:bg-rose-950/80 hover:text-rose-300 font-bold text-xs gap-1.5 shadow-md shadow-rose-950/20"
            >
              <ShieldAlert className="w-3.5 h-3.5" /> Panic Button
            </Button>
          </div>
        </nav>
      </header>

      {/* Dashboard Core Content Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Sub-header slogan */}
        <div className="mb-6 space-y-1 text-center sm:text-left">
          <h2 className="text-2xl font-black tracking-tight">Vibe-Based Study Room</h2>
          <p className="text-xs text-muted-foreground">Zero friction, low activation energy. Tap, focus, log, repeat.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Area: Energy Selector and Task Panels */}
          <div className="lg:col-span-2 space-y-6">
            <EnergySelector />
          </div>

          {/* Sidebar Area: Momentum, Countdown, WhatsApp, Leaderboard */}
          <div className="space-y-6">
            
            {/* Momentum Meter */}
            <MomentumMeter />

            {/* Calendar-Aware Nudges */}
            <div className="border border-white/10 bg-slate-900/50 backdrop-blur-md p-4 rounded-xl shadow-xl space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wide flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-indigo-400" /> Calendar countdown Nudges
                </span>
                <button
                  onClick={toggleCountdownSimulation}
                  className="text-[9px] font-bold text-primary hover:underline hover:text-primary/95 bg-secondary/35 px-2 py-0.5 rounded border border-border/40"
                >
                  Simulate {daysRemaining === 138 ? 'Final 30d' : '138d'}
                </button>
              </div>

              <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                <span className="text-xs text-muted-foreground font-semibold">Days to CAT Exam:</span>
                <span className={`text-base font-black ${daysRemaining < 30 ? 'text-rose-500 animate-pulse' : 'text-slate-100'}`}>
                  {daysRemaining} Days
                </span>
              </div>

              <div className={`p-3 rounded-lg border text-xs leading-relaxed ${
                daysRemaining < 30 
                  ? 'bg-rose-500/10 border-rose-500/20 text-rose-300 font-medium' 
                  : 'bg-secondary/40 border-border/50 text-muted-foreground'
              }`}>
                {daysRemaining < 30 ? (
                  <p>
                    🚨 **Final Countdown active!** De-emphasize learning new topics. Shift 85% focus to reviewing your **Swipe Deck** and fixing past logged errors.
                  </p>
                ) : (
                  <p>
                    📅 Standard prep phase. Focus on building core concepts in Quant and DILR. Keep logging daily mistakes to train your error models.
                  </p>
                )}
              </div>
            </div>

            {/* Mock WhatsApp Pipeline */}
            <WhatsappPipeline />

            {/* Study Group Leaderboard (Opt-In) */}
            <div className="border border-white/10 bg-slate-900/50 backdrop-blur-md p-4 rounded-xl shadow-xl space-y-3">
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wide flex items-center gap-1">
                  <Users className="w-4 h-4 text-indigo-400" /> Study Group Leaderboard
                </span>
                <label className="relative inline-flex items-center cursor-pointer scale-75">
                  <input 
                    type="checkbox" 
                    checked={leaderboardOptIn} 
                    onChange={(e) => setLeaderboardOptIn(e.target.checked)} 
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-border/50 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-500"></div>
                </label>
              </div>

              {leaderboardOptIn ? (
                <div className="space-y-2.5">
                  <div className="text-[10px] text-muted-foreground font-semibold flex justify-between">
                    <span>STUDENT</span>
                    <span className="flex gap-4">
                      <span>MOMENTUM</span>
                      <span>CLEARED</span>
                    </span>
                  </div>
                  
                  {/* List */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs bg-white/5 px-2.5 py-1.5 rounded border border-white/5">
                      <span className="font-bold text-indigo-300">You (Rank 2)</span>
                      <div className="flex gap-7 font-mono font-semibold">
                        <span>85%</span>
                        <span>12</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-xs opacity-75 px-2.5 py-1.5">
                      <span>Amit (Rank 1)</span>
                      <div className="flex gap-7 font-mono">
                        <span>92%</span>
                        <span>15</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-xs opacity-75 px-2.5 py-1.5">
                      <span>Priya (Rank 3)</span>
                      <div className="flex gap-7 font-mono">
                        <span>78%</span>
                        <span>8</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4 text-xs text-muted-foreground flex flex-col items-center justify-center gap-1.5">
                  <EyeOff className="w-8 h-8 text-muted-foreground/60" />
                  <p>Leaderboard participation is disabled. Toggle switch to join group rankings.</p>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>

      {/* Panic Overlay Mode */}
      {panicActive && <PanicMode onExit={() => setPanicActive(false)} />}

    </main>
  )
}
