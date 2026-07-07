'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { ArrowLeft, Zap, ChevronDown } from 'lucide-react'
import { QuantBot } from '@/components/bots/quant-bot'

export default function QuantPage() {
  const [activeStep, setActiveStep] = useState<string>('step-1')

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-blue-500/5">
      {/* Header */}
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">Quant Bot</h1>
              <p className="text-xs text-muted-foreground">3-Step Scroll Strategy</p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <Card className="mb-8 border-blue-200/50 bg-gradient-to-br from-blue-50 to-transparent">
          <CardHeader>
            <CardTitle className="text-2xl">The 3-Step Scroll Strategy</CardTitle>
            <CardDescription className="text-base">
              Master complex quantitative problems by breaking them into digestible steps
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              This strategy teaches you to tackle any math problem systematically:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold mt-1">1.</span>
                <div>
                  <span className="font-medium text-foreground">Understand</span>
                  <p className="text-sm text-muted-foreground">Identify what's given and what you need to find</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold mt-1">2.</span>
                <div>
                  <span className="font-medium text-foreground">Plan</span>
                  <p className="text-sm text-muted-foreground">Determine the approach and formulas needed</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold mt-1">3.</span>
                <div>
                  <span className="font-medium text-foreground">Execute</span>
                  <p className="text-sm text-muted-foreground">Solve step-by-step with clarity and verification</p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Interactive Bot */}
        <QuantBot />

        {/* Steps Accordion */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Learn the Strategy</h2>
          
          <Accordion value={activeStep} onValueChange={setActiveStep} type="single" collapsible className="space-y-3">
            <AccordionItem value="step-1" className="border border-border rounded-lg px-6 data-[state=open]:bg-blue-50/50">
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex items-center gap-4 text-left">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold text-sm">
                    1
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Step 1: Understand the Problem</p>
                    <p className="text-sm text-muted-foreground">Extract key information</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <div className="ml-14 space-y-4">
                  <p className="text-muted-foreground">
                    Before solving, take 20 seconds to understand:
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex gap-2">
                      <span className="text-blue-600">•</span>
                      <span>What information is given?</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-600">•</span>
                      <span>What do you need to find?</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-600">•</span>
                      <span>Are there any constraints?</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-600">•</span>
                      <span>Can you draw a diagram?</span>
                    </li>
                  </ul>
                  <div className="mt-4 p-4 bg-blue-100/50 rounded-lg border border-blue-200">
                    <p className="text-sm font-medium text-foreground">Pro Tip:</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Write down what you know and what you need to find. This simple act prevents careless mistakes.
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="step-2" className="border border-border rounded-lg px-6 data-[state=open]:bg-blue-50/50">
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex items-center gap-4 text-left">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold text-sm">
                    2
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Step 2: Plan Your Approach</p>
                    <p className="text-sm text-muted-foreground">Choose the right strategy</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <div className="ml-14 space-y-4">
                  <p className="text-muted-foreground">
                    Decide which approach works best:
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex gap-2">
                      <span className="text-blue-600">•</span>
                      <span><span className="font-medium">Direct formula</span> - use a known formula</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-600">•</span>
                      <span><span className="font-medium">Step-by-step</span> - break into smaller parts</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-600">•</span>
                      <span><span className="font-medium">Elimination</span> - test answer choices</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-600">•</span>
                      <span><span className="font-medium">Pattern recognition</span> - find a pattern</span>
                    </li>
                  </ul>
                  <div className="mt-4 p-4 bg-blue-100/50 rounded-lg border border-blue-200">
                    <p className="text-sm font-medium text-foreground">Pro Tip:</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      The best approach is the one that gets you to the answer fastest and with least chance of error.
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="step-3" className="border border-border rounded-lg px-6 data-[state=open]:bg-blue-50/50">
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex items-center gap-4 text-left">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold text-sm">
                    3
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Step 3: Execute & Verify</p>
                    <p className="text-sm text-muted-foreground">Solve with confidence</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <div className="ml-14 space-y-4">
                  <p className="text-muted-foreground">
                    Execute your plan carefully:
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex gap-2">
                      <span className="text-blue-600">•</span>
                      <span>Show each calculation step</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-600">•</span>
                      <span>Check units and dimensions</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-600">•</span>
                      <span>Verify your answer makes sense</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-600">•</span>
                      <span>Substitute back if possible</span>
                    </li>
                  </ul>
                  <div className="mt-4 p-4 bg-blue-100/50 rounded-lg border border-blue-200">
                    <p className="text-sm font-medium text-foreground">Pro Tip:</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      A 30-second verification can save you from losing marks on silly mistakes.
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Navigation */}
        <div className="flex justify-center gap-4 mt-12">
          <Link href="/">
            <Button variant="outline">Back to Home</Button>
          </Link>
          <Link href="/bot-2-dilr">
            <Button className="bg-primary hover:bg-primary/90">
              Next: DILR Bot
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
