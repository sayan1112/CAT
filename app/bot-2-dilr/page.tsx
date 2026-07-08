'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { ArrowLeft, Brain, Eye } from 'lucide-react'
import { DILRBot } from '@/components/bots/dilr-bot'

export default function DILRPage() {
  const [activeStep, setActiveStep] = useState<string>('step-1')

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-purple-500/5">
      {/* Header */}
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">DILR Bot</h1>
              <p className="text-xs text-muted-foreground">Peek-a-Boo Visual Strategy</p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <Card className="mb-8 border-purple-200/50 bg-gradient-to-br from-purple-50 to-transparent">
          <CardHeader>
            <CardTitle className="text-2xl">The Peek-a-Boo Visual Strategy</CardTitle>
            <CardDescription className="text-base">
              Master complex logical problems through systematic visual problem-solving
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              This strategy teaches you to tackle DILR problems by unveiling complexity step-by-step:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                <span className="text-purple-600 font-bold mt-1">1.</span>
                <div>
                  <span className="font-medium text-foreground">Peek</span>
                  <p className="text-sm text-muted-foreground">Scan and identify the structure of the problem</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-600 font-bold mt-1">2.</span>
                <div>
                  <span className="font-medium text-foreground">Visualize</span>
                  <p className="text-sm text-muted-foreground">Create a mental or written diagram/matrix</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-600 font-bold mt-1">3.</span>
                <div>
                  <span className="font-medium text-foreground">Deduce</span>
                  <p className="text-sm text-muted-foreground">Use logic to fill gaps and find patterns</p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Interactive Bot */}
        <DILRBot />

        {/* Steps Accordion */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Learn the Strategy</h2>
          
          <Accordion value={activeStep} onValueChange={setActiveStep} type="single" className="space-y-3">
            <AccordionItem value="step-1" className="border border-border rounded-lg px-6 data-[state=open]:bg-purple-50/50">
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex items-center gap-4 text-left">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-600 text-white font-bold text-sm">
                    1
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Peek: Scan the Structure</p>
                    <p className="text-sm text-muted-foreground">Understand what you're dealing with</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <div className="ml-14 space-y-4">
                  <p className="text-muted-foreground">
                    Before diving deep, understand the problem type:
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex gap-2">
                      <span className="text-purple-600">•</span>
                      <span>Is it a <span className="font-medium">ranking</span> or <span className="font-medium">arrangement</span> problem?</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-purple-600">•</span>
                      <span>Are there <span className="font-medium">multiple conditions</span> or <span className="font-medium">hidden constraints</span>?</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-purple-600">•</span>
                      <span>How many <span className="font-medium">entities and attributes</span> are involved?</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-purple-600">•</span>
                      <span>What's the <span className="font-medium">relationship structure</span>?</span>
                    </li>
                  </ul>
                  <div className="mt-4 p-4 bg-purple-100/50 rounded-lg border border-purple-200">
                    <p className="text-sm font-medium text-foreground">Pro Tip:</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Read the problem statement without trying to solve it. Just identify the entities and their possible attributes.
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="step-2" className="border border-border rounded-lg px-6 data-[state=open]:bg-purple-50/50">
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex items-center gap-4 text-left">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-600 text-white font-bold text-sm">
                    2
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Visualize: Create a Diagram</p>
                    <p className="text-sm text-muted-foreground">Make the invisible visible</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <div className="ml-14 space-y-4">
                  <p className="text-muted-foreground">
                    Choose the right visualization method:
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex gap-2">
                      <span className="text-purple-600">•</span>
                      <span><span className="font-medium">Matrix/Grid</span> - for multiple attributes</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-purple-600">•</span>
                      <span><span className="font-medium">Timeline</span> - for sequence problems</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-purple-600">•</span>
                      <span><span className="font-medium">Network/Tree</span> - for hierarchical relationships</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-purple-600">•</span>
                      <span><span className="font-medium">Venn diagram</span> - for set relationships</span>
                    </li>
                  </ul>
                  <div className="mt-4 p-4 bg-purple-100/50 rounded-lg border border-purple-200">
                    <p className="text-sm font-medium text-foreground">Pro Tip:</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      A good visualization captures all constraints visually. When stuck, your diagram should help you see what you're missing.
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="step-3" className="border border-border rounded-lg px-6 data-[state=open]:bg-purple-50/50">
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex items-center gap-4 text-left">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-600 text-white font-bold text-sm">
                    3
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Deduce: Fill the Gaps</p>
                    <p className="text-sm text-muted-foreground">Use logic systematically</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <div className="ml-14 space-y-4">
                  <p className="text-muted-foreground">
                    Apply logical deduction systematically:
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex gap-2">
                      <span className="text-purple-600">•</span>
                      <span>Start with <span className="font-medium">direct statements</span> (certain facts)</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-purple-600">•</span>
                      <span>Apply <span className="font-medium">elimination</span> based on constraints</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-purple-600">•</span>
                      <span>Look for <span className="font-medium">hidden patterns</span> and deductions</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-purple-600">•</span>
                      <span>Verify your solution against <span className="font-medium">all conditions</span></span>
                    </li>
                  </ul>
                  <div className="mt-4 p-4 bg-purple-100/50 rounded-lg border border-purple-200">
                    <p className="text-sm font-medium text-foreground">Pro Tip:</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      If you reach an impossible state, backtrack and reconsider your previous deductions. One wrong assumption ruins everything.
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Navigation */}
        <div className="flex justify-center gap-4 mt-12">
          <Link href="/bot-1-quant">
            <Button variant="outline">Previous: Quant Bot</Button>
          </Link>
          <Link href="/bot-3-varc">
            <Button className="bg-primary hover:bg-primary/90">
              Next: VARC Bot
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
