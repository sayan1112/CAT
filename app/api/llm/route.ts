import { NextRequest, NextResponse } from 'next/server'
import {
  getFormulaRouletteQuestion,
  streamQuantScrollChat,
  investigateError,
  runVarcCoach,
  untangleDilr,
  generateVocabQuiz,
  generatePostMortemSummary
} from '@/lib/llm'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { action } = body

    if (!action) {
      return NextResponse.json({ error: 'Missing action parameter' }, { status: 400 })
    }

    switch (action) {
      case 'formula-roulette': {
        const question = await getFormulaRouletteQuestion()
        return NextResponse.json(question)
      }

      case 'quant-chat': {
        const { messages } = body
        if (!messages) {
          return NextResponse.json({ error: 'Missing messages for quant-chat' }, { status: 400 })
        }
        const result = await streamQuantScrollChat(messages)
        return result.toDataStreamResponse()
      }

      case 'investigate-error': {
        const { questionInput } = body
        if (!questionInput) {
          return NextResponse.json({ error: 'Missing questionInput' }, { status: 400 })
        }
        const investigation = await investigateError(questionInput)
        return NextResponse.json(investigation)
      }

      case 'varc-coach': {
        const { articleText } = body
        if (!articleText) {
          return NextResponse.json({ error: 'Missing articleText' }, { status: 400 })
        }
        const analysis = await runVarcCoach(articleText)
        return NextResponse.json(analysis)
      }

      case 'dilr-untangler': {
        const { dilrDescription } = body
        if (!dilrDescription) {
          return NextResponse.json({ error: 'Missing dilrDescription' }, { status: 400 })
        }
        const analysis = await untangleDilr(dilrDescription)
        return NextResponse.json(analysis)
      }

      case 'vocab-quiz': {
        const { word } = body
        if (!word) {
          return NextResponse.json({ error: 'Missing word' }, { status: 400 })
        }
        const quiz = await generateVocabQuiz(word)
        return NextResponse.json(quiz)
      }

      case 'post-mortem': {
        const { errors } = body
        if (!errors) {
          return NextResponse.json({ error: 'Missing errors list' }, { status: 400 })
        }
        const summary = await generatePostMortemSummary(errors)
        return NextResponse.json({ summary })
      }

      default:
        return NextResponse.json({ error: `Unknown action: ${action}` }, { status: 400 })
    }
  } catch (error: any) {
    console.error('Error in Central LLM API Route:', error)
    return NextResponse.json(
      { error: error?.message || 'Internal Server Error' },
      { status: 500 }
    )
  }
}
