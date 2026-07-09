'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Award, Compass, HelpCircle } from 'lucide-react'

export function CollegePredictor() {
  const [percentile, setPercentile] = useState<number>(95)

  const getShortlist = (pct: number) => {
    if (pct >= 99.5) {
      return {
        tier: "Tier 1: BLACKY IIMs & FMS",
        colleges: ["IIM Ahmedabad", "IIM Bangalore", "IIM Calcutta", "FMS Delhi", "IIM Lucknow"],
        advice: "🟢 Highly Realistic. Focus entirely on sectional cutoffs (typically 80-85%ile per section) and polish your written communication for WAT/GDPI."
      }
    }
    if (pct >= 98.0) {
      return {
        tier: "Tier 1.5: Kozhikode, Indore, MDI, SPJIMR",
        colleges: ["IIM Kozhikode", "IIM Indore", "MDI Gurgaon", "SPJIMR Mumbai", "IIM Shillong"],
        advice: "🟡 Strong potential. SPJIMR profile-based calls are possible here. IIM K/I calls are highly sensitive to your 10th/12th academic profile."
      }
    }
    if (pct >= 95.0) {
      return {
        tier: "Tier 2: CAP IIMs (New) & IITs",
        colleges: ["IIM Udaipur", "IIM Trichy", "IIM Raipur", "IIT Bombay (SJMSoM)", "IIT Delhi (DMS)"],
        advice: "🔵 Very secure CAP shortlist. Ensure you score consistently in mocks. IITs offer excellent ROI if you have an engineering background."
      }
    }
    if (pct >= 90.0) {
      return {
        tier: "Tier 2.5: Baby IIMs & IMT",
        colleges: ["IIM Amritsar", "IIM Jammu", "IMT Ghaziabad", "XIM Bhubaneswar", "GIM Goa"],
        advice: "🟠 Safe backup list. These schools have great placement trends. Focus on boosting your score in the next 30 days to cross the 95%ile CAP threshold."
      }
    }
    return {
      tier: "Tier 3 Backup Zone",
      colleges: ["FORE School of Management", "LBSIM Delhi", "BIMTECH Greater Noida"],
      advice: "🔴 Focus on building core speed. Analyzing silly errors in QA and verbal tone traps can easily bump you up to the 90%+ bracket."
    }
  }

  const prediction = getShortlist(percentile)

  return (
    <Card className="border-indigo-500/25 bg-background/60 backdrop-blur-md overflow-hidden shadow-lg">
      <CardHeader className="bg-gradient-to-r from-indigo-600/10 to-indigo-800/10 border-b border-indigo-500/15 py-3">
        <div className="flex items-center gap-1.5 text-indigo-500">
          <Compass className="w-5 h-5" />
          <div>
            <CardTitle className="text-base font-bold">College Predictor Lite</CardTitle>
            <CardDescription className="text-xs">
              Realistic, non-aspirational shortlist based on your rolling percentile trend
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        
        {/* Slider for Percentile */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-muted-foreground font-semibold">Rolling Percentile Trend:</span>
            <span className="text-sm font-black text-indigo-500">{percentile}%ile</span>
          </div>
          
          <input
            type="range"
            min="80"
            max="100"
            step="0.5"
            value={percentile}
            onChange={(e) => setPercentile(Number(e.target.value))}
            className="w-full accent-indigo-600 cursor-pointer h-1.5 bg-muted rounded-lg appearance-none"
          />
          <div className="flex justify-between text-[9px] text-muted-foreground/80 font-mono">
            <span>80%ile</span>
            <span>90%ile</span>
            <span>95%ile</span>
            <span>98%ile</span>
            <span>99.9%ile</span>
          </div>
        </div>

        {/* Shortlist Result Card */}
        <div className="space-y-2.5 bg-secondary/35 border border-border/40 rounded-xl p-3.5 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-border/30 pb-2">
            <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-wide">
              Shortlist Target
            </span>
            <span className="text-[10px] text-muted-foreground font-mono uppercase font-bold">
              {prediction.tier}
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5 py-1">
            {prediction.colleges.map(c => (
              <span key={c} className="text-[10px] font-bold bg-background text-foreground/85 px-2.5 py-1 rounded border border-border/40 shadow-sm">
                {c}
              </span>
            ))}
          </div>

          <div className="border-t border-border/30 pt-2 text-[11px] leading-relaxed text-foreground/80">
            {prediction.advice}
          </div>
        </div>

        <p className="text-[9px] text-center text-muted-foreground italic leading-normal">
          📈 Nudge updates dynamically as your logged mock percentiles fluctuate. Most useful during results season.
        </p>

      </CardContent>
    </Card>
  )
}
