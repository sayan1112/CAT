'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { ArrowLeft, BookOpen } from 'lucide-react'
import { VARCBot } from '@/components/bots/varc-bot'

export default function VARCPage() {
  const [activeStep, setActiveStep] = useState<string>('step-1')

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-emerald-500/5">
      {/* Header */}
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">VARC Bot</h1>
              <p className="text-xs text-muted-foreground">Tone + MCQ Strategy</p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <Card className="mb-8 border-emerald-200/50 bg-gradient-to-br from-emerald-50 to-transparent">
          <CardHeader>
            <CardTitle className="text-2xl">The Tone + MCQ Strategy</CardTitle>
            <CardDescription className="text-base">
              Master reading comprehension and multiple choice questions through tone analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              This strategy teaches you to read actively and answer MCQs confidently:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                <span className="text-emerald-600 font-bold mt-1">1.</span>
                <div>
                  <span className="font-medium text-foreground">Read for Tone</span>
                  <p className="text-sm text-muted-foreground">Identify the author's attitude, intent, and emotional undercurrent</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-600 font-bold mt-1">2.</span>
                <div>
                  <span className="font-medium text-foreground">Analyze the Question</span>
                  <p className="text-sm text-muted-foreground">Understand what's being asked and the scope of the answer</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-600 font-bold mt-1">3.</span>
                <div>
                  <span className="font-medium text-foreground">Eliminate & Choose</span>
                  <p className="text-sm text-muted-foreground">Use tone-based elimination to find the best answer</p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Interactive Bot */}
        <VARCBot />

        {/* Steps Accordion */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Learn the Strategy</h2>
          
          <Accordion value={activeStep} onValueChange={setActiveStep} type="single" className="space-y-3">
            <AccordionItem value="step-1" className="border border-border rounded-lg px-6 data-[state=open]:bg-emerald-50/50">
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex items-center gap-4 text-left">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-600 text-white font-bold text-sm">
                    1
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Read for Tone & Intent</p>
                    <p className="text-sm text-muted-foreground">Go beyond literal meaning</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <div className="ml-14 space-y-4">
                  <p className="text-muted-foreground">
                    While reading, identify these elements:
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex gap-2">
                      <span className="text-emerald-600">•</span>
                      <span><span className="font-medium">Author's attitude:</span> supportive, critical, neutral, sarcastic?</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-emerald-600">•</span>
                      <span><span className="font-medium">Main idea:</span> What's the core message?</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-emerald-600">•</span>
                      <span><span className="font-medium">Supporting points:</span> Evidence or examples provided?</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-emerald-600">•</span>
                      <span><span className="font-medium">Emotional undertones:</span> Positive, negative, or mixed?</span>
                    </li>
                  </ul>
                  <div className="mt-4 p-4 bg-emerald-100/50 rounded-lg border border-emerald-200">
                    <p className="text-sm font-medium text-foreground">Pro Tip:</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Your tone analysis will eliminate many wrong answers before you even read the options.
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="step-2" className="border border-border rounded-lg px-6 data-[state=open]:bg-emerald-50/50">
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex items-center gap-4 text-left">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-600 text-white font-bold text-sm">
                    2
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Analyze the Question</p>
                    <p className="text-sm text-muted-foreground">Know what you're answering</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <div className="ml-14 space-y-4">
                  <p className="text-muted-foreground">
                    Before looking at options, understand:
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex gap-2">
                      <span className="text-emerald-600">•</span>
                      <span><span className="font-medium">Question type:</span> Detail, inference, tone, purpose, main idea?</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-emerald-600">•</span>
                      <span><span className="font-medium">Scope:</span> About specific line or entire passage?</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-emerald-600">•</span>
                      <span><span className="font-medium">What's being tested:</span> Comprehension, vocabulary, analysis?</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-emerald-600">•</span>
                      <span><span className="font-medium">Expected answer tone:</span> Positive, negative, neutral?</span>
                    </li>
                  </ul>
                  <div className="mt-4 p-4 bg-emerald-100/50 rounded-lg border border-emerald-200">
                    <p className="text-sm font-medium text-foreground">Pro Tip:</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Question type determines your approach. Don't use detail-finding for inference questions.
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="step-3" className="border border-border rounded-lg px-6 data-[state=open]:bg-emerald-50/50">
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex items-center gap-4 text-left">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-600 text-white font-bold text-sm">
                    3
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Eliminate & Choose Strategically</p>
                    <p className="text-sm text-muted-foreground">Match tone and scope carefully</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <div className="ml-14 space-y-4">
                  <p className="text-muted-foreground">
                    Use systematic elimination:
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex gap-2">
                      <span className="text-emerald-600">•</span>
                      <span>Eliminate options with <span className="font-medium">wrong tone</span> (contradicts passage)</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-emerald-600">•</span>
                      <span>Eliminate <span className="font-medium">too extreme</span> or <span className="font-medium">too narrow</span> options</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-emerald-600">•</span>
                      <span>Eliminate options based on <span className="font-medium">scope mismatch</span></span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-emerald-600">•</span>
                      <span>Choose the option that matches <span className="font-medium">tone and evidence</span></span>
                    </li>
                  </ul>
                  <div className="mt-4 p-4 bg-emerald-100/50 rounded-lg border border-emerald-200">
                    <p className="text-sm font-medium text-foreground">Pro Tip:</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Often, 2-3 options will be clearly wrong. Between the final candidates, tone and scope are tie-breakers.
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Navigation */}
        <div className="flex justify-center gap-4 mt-12">
          <Link href="/bot-2-dilr">
            <Button variant="outline">Previous: DILR Bot</Button>
          </Link>
          <Link href="/">
            <Button className="bg-primary hover:bg-primary/90">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
