'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, Brain, BookOpen, Zap } from 'lucide-react'

export default function Home() {
  const bots = [
    {
      id: 'bot-1-quant',
      title: 'Quant Bot',
      subtitle: 'Master Quantitative Reasoning',
      description: 'Learn the 3-step scroll strategy to break down complex math problems systematically.',
      icon: Zap,
      color: 'from-blue-500 to-blue-600',
      features: ['Step-by-step breakdown', 'Strategy learning', 'Pattern recognition'],
    },
    {
      id: 'bot-2-dilr',
      title: 'DILR Bot',
      subtitle: 'Conquer Logic & Reasoning',
      description: 'Master the peek-a-boo technique to visualize and solve complex logical problems.',
      icon: Brain,
      color: 'from-purple-500 to-purple-600',
      features: ['Visual problem-solving', 'Hidden pattern discovery', 'Logical flow'],
    },
    {
      id: 'bot-3-varc',
      title: 'VARC Bot',
      subtitle: 'Dominate Verbal & Reading',
      description: 'Learn tone analysis and multiple choice mastery through AI-guided MCQ practice.',
      icon: BookOpen,
      color: 'from-emerald-500 to-emerald-600',
      features: ['Tone analysis', 'Reading comprehension', 'MCQ strategy'],
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/20">
      {/* Header */}
      <header className="border-b border-border">
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
              <span className="text-white font-bold text-lg">μ</span>
            </div>
            <span className="text-xl font-bold text-foreground">CAT Micro-Bots</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#bots" className="text-sm font-medium text-muted-foreground hover:text-foreground transition">
              Explore
            </a>
            <Button size="sm" variant="outline">
              Learn More
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-5xl sm:text-6xl font-bold text-foreground mb-6 text-balance">
            Master CAT with Micro-Bots
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-balance">
            Three specialized AI-powered learning bots designed to teach you proven strategies for Quantitative Aptitude, Data Interpretation & Logical Reasoning, and Verbal & Reading Comprehension.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#bots">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Get Started <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Button size="lg" variant="outline">
              Learn About Strategy
            </Button>
          </div>
        </div>
      </section>

      {/* Bots Section */}
      <section id="bots" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Choose Your Learning Path
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Each Micro-Bot specializes in a different section, using proven teaching strategies to help you master complex concepts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bots.map((bot) => {
            const Icon = bot.icon
            return (
              <Link key={bot.id} href={`/${bot.id}`}>
                <Card className="h-full hover:shadow-lg hover:border-primary/50 transition-all cursor-pointer group">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${bot.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl">{bot.title}</CardTitle>
                    <CardDescription className="text-base font-medium text-primary">
                      {bot.subtitle}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{bot.description}</p>
                    <ul className="space-y-2">
                      {bot.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-20 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-muted-foreground">
            <p>&copy; 2024 CAT Micro-Bots. All rights reserved.</p>
            <div className="flex gap-6 mt-4 sm:mt-0">
              <a href="#" className="hover:text-foreground transition">Privacy</a>
              <a href="#" className="hover:text-foreground transition">Terms</a>
              <a href="#" className="hover:text-foreground transition">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
