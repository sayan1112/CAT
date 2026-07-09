'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Loader2, BookOpen, Check, HelpCircle, RefreshCw } from 'lucide-react'

export function VocabGhost() {
  const vocabWords = [
    'Capricious', 'Obfuscate', 'Cacophony', 'Recalcitrant', 
    'Garrulous', 'Ephemeral', 'Pernicious', 'Equivocal'
  ]

  const [currentWord, setCurrentWord] = useState<string>(vocabWords[0])
  const [isLoading, setIsLoading] = useState(false)
  const [quiz, setQuiz] = useState<any>(null)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [submittedAnswer, setSubmittedAnswer] = useState(false)

  const triggerVocabQuiz = async (word: string) => {
    setIsLoading(true)
    setQuiz(null)
    setSelectedOption(null)
    setSubmittedAnswer(false)
    setCurrentWord(word)

    try {
      const res = await fetch('/api/llm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'vocab-quiz',
          word
        })
      })

      if (!res.ok) throw new Error('API failed')
      const data = await res.json()
      setQuiz(data)
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * vocabWords.length)
    triggerVocabQuiz(vocabWords[randomIndex])
  }

  return (
    <Card className="border-indigo-500/25 bg-background/60 backdrop-blur-md overflow-hidden shadow-lg">
      <CardHeader className="bg-gradient-to-r from-indigo-600/10 to-purple-600/10 border-b border-indigo-500/15 py-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base font-bold flex items-center gap-1.5 text-indigo-500">
              👻 Vocab Word Ghost
            </CardTitle>
            <CardDescription className="text-xs">
              Spaced repetition micro-quizzes for CAT RC vocabulary
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        
        {!quiz ? (
          <div className="text-center py-6 space-y-3">
            <p className="text-xs text-muted-foreground">
              Review high-frequency CAT words. Serve a 1-sentence usage check.
            </p>
            <div className="flex gap-2 justify-center flex-wrap max-w-xs mx-auto">
              {vocabWords.slice(0, 4).map(word => (
                <button
                  key={word}
                  onClick={() => triggerVocabQuiz(word)}
                  disabled={isLoading}
                  className="text-[10px] px-2.5 py-1 rounded bg-secondary/60 hover:bg-secondary border border-border/40 font-semibold"
                >
                  {word}
                </button>
              ))}
            </div>
            <Button
              onClick={handleRandomWord}
              disabled={isLoading}
              className="bg-indigo-600 hover:bg-indigo-700 text-xs font-bold gap-1.5 w-full mt-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Summoning Quiz...
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4" /> Spin Random Word
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-4 animate-in fade-in duration-200">
            
            {/* Quiz Question */}
            <div className="bg-secondary/25 border border-border/40 rounded-xl p-3.5 space-y-3">
              <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-wide">
                Word Review: "{currentWord}"
              </span>
              
              <h5 className="text-xs font-semibold flex items-start gap-1.5 leading-relaxed">
                <HelpCircle className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                <span>{quiz.question}</span>
              </h5>

              {/* Options */}
              <div className="grid grid-cols-1 gap-2">
                {quiz.options.map((opt: string) => {
                  const optChar = opt.charAt(0)
                  const isSelected = selectedOption === optChar
                  const isCorrect = optChar === quiz.correctAnswer

                  let btnStyle = 'border-border/50 bg-background hover:bg-secondary/40'
                  if (isSelected) {
                    btnStyle = 'border-indigo-600 bg-indigo-600/10 text-indigo-500 font-semibold'
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
                  className="w-full text-xs font-bold bg-indigo-600 hover:bg-indigo-700"
                >
                  Check Usage
                </Button>
              ) : (
                <div className="bg-card border border-border/40 p-3 rounded-lg space-y-1.5 text-xs">
                  <p className="font-bold text-foreground">
                    {selectedOption === quiz.correctAnswer ? (
                      <span className="text-emerald-500 flex items-center gap-1">🎉 Correct Sentence Match!</span>
                    ) : (
                      <span className="text-rose-500 flex items-center gap-1">❌ Mismatched Sentence.</span>
                    )}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    {quiz.explanation}
                  </p>
                  <Button
                    onClick={handleRandomWord}
                    variant="outline"
                    className="w-full text-xs font-bold border-indigo-500/30 text-indigo-500 hover:bg-indigo-500/5 mt-2"
                  >
                    Next Word
                  </Button>
                </div>
              )}
            </div>

          </div>
        )}

      </CardContent>
    </Card>
  )
}
