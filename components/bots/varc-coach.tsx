'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Loader2, Play, Pause, Headphones, HelpCircle, Sparkles, Volume2, VolumeX } from 'lucide-react'

interface Article {
  id: string
  title: string
  source: string
  text: string
}

export function VarcCoach() {
  const articles: Article[] = [
    {
      id: 'art-1',
      title: 'The Resilience of Pedagogy in the AI Age',
      source: 'Aeon (Curated)',
      text: 'The rapid ascent of generative artificial intelligence has sent shockwaves through the educational landscape. Critics sound alarms about the demise of original writing and critical thinking, warning that student essays will soon be outsourced entirely to machines. Yet, this alarmist view overlooks the historical resilience of pedagogy. Just as the pocket calculator did not destroy mathematics, but rather shifted focus from arithmetic to higher-level reasoning, AI will compel educators to design assignments that value synthesis, voice, and raw human reasoning over formulaic essays.'
    },
    {
      id: 'art-2',
      title: 'Cognitive Economics & Attention Markets',
      source: 'Yale Review (Curated)',
      text: 'In contemporary digital economies, attention is no longer a passive state; it is a commodity extracted with industrial precision. Platforms design algorithms not to serve information, but to generate psychological friction that delays exit. This monetization of cognitive load creates a systemic deficit in deep, sustained reading capability. To navigate this landscape, readers must develop secondary cognitive filters, deliberately shielding themselves from micro-rewards in order to build long-form structural comprehension.'
    }
  ]

  const [selectedArticle, setSelectedArticle] = useState<Article>(articles[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [analysis, setAnalysis] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [submittedAnswer, setSubmittedAnswer] = useState(false)

  // Simulate audio player progress bar
  useEffect(() => {
    let interval: any
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            setIsPlaying(false)
            return 0
          }
          return p + 1.5
        })
      }, 500)
    }
    return () => clearInterval(interval)
  }, [isPlaying])

  const selectArticle = (art: Article) => {
    setSelectedArticle(art)
    setIsPlaying(false)
    setProgress(0)
    setAnalysis(null)
    setSelectedOption(null)
    setSubmittedAnswer(false)
  }

  const handleAnalyze = async () => {
    setIsLoading(true)
    setAnalysis(null)
    setSelectedOption(null)
    setSubmittedAnswer(false)

    try {
      const res = await fetch('/api/llm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'varc-coach',
          articleText: selectedArticle.text
        })
      })

      if (!res.ok) throw new Error('API failed')
      const data = await res.json()
      setAnalysis(data)
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="border-emerald-500/25 bg-background/60 backdrop-blur-md overflow-hidden shadow-lg">
      <CardHeader className="bg-gradient-to-r from-emerald-600/10 to-teal-600/10 border-b border-emerald-500/15 py-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base font-bold flex items-center gap-1.5 text-emerald-500">
              💬 VARC Coach
            </CardTitle>
            <CardDescription className="text-xs">
              Daily articles, tone analogies, audio logging & quizzes
            </CardDescription>
          </div>
          <Headphones className="w-5 h-5 text-emerald-500" />
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        
        {/* Article selector */}
        <div className="flex gap-2 border-b border-border/40 pb-3 overflow-x-auto">
          {articles.map(art => (
            <button
              key={art.id}
              onClick={() => selectArticle(art)}
              className={`text-xs px-3 py-1.5 rounded-lg border whitespace-nowrap transition ${
                selectedArticle.id === art.id
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                  : 'bg-background hover:bg-secondary/40 text-muted-foreground border-border/50'
              }`}
            >
              {art.title.slice(0, 20)}...
            </button>
          ))}
        </div>

        {/* Selected Article Metadata */}
        <div>
          <h4 className="text-xs font-bold text-foreground">{selectedArticle.title}</h4>
          <span className="text-[9px] uppercase tracking-wide text-muted-foreground font-semibold">Source: {selectedArticle.source}</span>
        </div>

        {/* Audio Player Simulator */}
        <div className="bg-secondary/35 border border-border/40 rounded-xl p-3.5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-1">
              🔊 PASSIVE AUDIO BROADCAST
            </span>
            <span className="text-[10px] text-muted-foreground font-mono">
              {Math.floor((progress / 100) * 180)}s / 180s
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={() => setIsPlaying(!isPlaying)}
              size="icon"
              className="bg-emerald-600 hover:bg-emerald-700 h-9 w-9 p-0 rounded-full shrink-0 flex items-center justify-center"
            >
              {isPlaying ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 text-white translate-x-[1px]" />}
            </Button>
            
            {/* Playback progress bar */}
            <div className="flex-1 h-2.5 bg-muted rounded-full overflow-hidden p-0.5 border border-border/40 relative">
              <div 
                className="h-full rounded-full bg-emerald-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>

            <Button
              onClick={() => setIsMuted(!isMuted)}
              size="icon"
              variant="ghost"
              className="h-8 w-8 hover:bg-secondary/60 text-muted-foreground p-0 flex items-center justify-center shrink-0"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Article Text Preview */}
        <div className="bg-card border border-border/40 p-3 rounded-lg text-xs leading-relaxed max-h-24 overflow-y-auto text-muted-foreground">
          {selectedArticle.text}
        </div>

        {/* Tone Analyzer Activation */}
        {!analysis ? (
          <Button
            onClick={handleAnalyze}
            disabled={isLoading}
            className="w-full text-xs font-bold bg-emerald-600 hover:bg-emerald-700 gap-1.5"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Fetching Tone Analysis...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" /> Analyze Tone & Start Quiz
              </>
            )}
          </Button>
        ) : (
          <div className="space-y-4 border-t border-border/40 pt-4 animate-in fade-in duration-200">
            
            {/* Tone insights */}
            <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-3 space-y-2">
              <h5 className="text-xs font-black text-emerald-500 uppercase tracking-wide">Tone & Analogy Analysis:</h5>
              <div className="text-xs space-y-1.5 leading-relaxed text-foreground/80">
                <p>🎭 **Attitude:** {analysis.toneAnalysis.attitude}</p>
                <p>💡 **Main Idea:** {analysis.toneAnalysis.mainIdea}</p>
                <p>🌟 **Analogy:** <span className="italic text-emerald-600 font-medium">"{analysis.toneAnalysis.analogy}"</span></p>
              </div>
            </div>

            {/* Quiz Section */}
            <div className="bg-secondary/35 border border-border/40 rounded-xl p-3 space-y-3">
              <h5 className="text-xs font-bold text-foreground flex items-start gap-1.5 leading-relaxed">
                <HelpCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>{analysis.quiz.question}</span>
              </h5>

              {/* Options */}
              <div className="grid grid-cols-1 gap-2">
                {analysis.quiz.options.map((opt: string) => {
                  const optChar = opt.charAt(0)
                  const isSelected = selectedOption === optChar
                  const isCorrect = optChar === analysis.quiz.correctAnswer

                  let btnStyle = 'border-border/50 bg-background hover:bg-secondary/40'
                  if (isSelected) {
                    btnStyle = 'border-emerald-600 bg-emerald-600/10 text-emerald-500 font-semibold'
                  }
                  if (submittedAnswer) {
                    if (isCorrect) {
                      btnStyle = 'border-emerald-600 bg-emerald-600/15 text-emerald-500 font-bold'
                    } else if (isSelected) {
                      btnStyle = 'border-rose-600 bg-rose-600/15 text-rose-500'
                    } else {
                      btnStyle = 'opacity-50 border-border/30 bg-background'
                    }
                  }

                  return (
                    <button
                      key={opt}
                      onClick={() => {
                        if (submittedAnswer) return
                        setSelectedOption(optChar)
                      }}
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
                  onClick={() => setSubmittedAnswer(true)}
                  disabled={!selectedOption}
                  className="w-full text-xs font-bold bg-emerald-600 hover:bg-emerald-700"
                >
                  Submit Answer
                </Button>
              ) : (
                <div className="bg-card border border-border/40 p-3 rounded-lg space-y-1 text-xs">
                  <p className="font-bold text-foreground">
                    {selectedOption === analysis.quiz.correctAnswer ? (
                      <span className="text-emerald-500">🎉 Correct!</span>
                    ) : (
                      <span className="text-rose-500">❌ Incorrect.</span>
                    )}
                  </p>
                  <p className="text-muted-foreground leading-relaxed mt-1">
                    {analysis.quiz.explanation}
                  </p>
                </div>
              )}
            </div>

          </div>
        )}

      </CardContent>
    </Card>
  )
}
