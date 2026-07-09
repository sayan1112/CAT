import { generateText, streamText } from 'ai'
import { createOpenAI } from '@ai-sdk/openai'
import formulas from './data/formulas.json'
import fewShots from './data/few-shots.json'

const openai = createOpenAI()
const MODEL_NAME = 'gpt-4o-mini'

// Central error log structure
export interface ErrorLogEntry {
  id: string
  questionText: string
  topic: string
  mistakeType: 'Silly' | 'Concept Gap' | 'Time Out'
  source: 'mock' | 'practice' | 'PYQ'
  timestamp: string
  confidence: number // 1 to 5
  reviewCount: number
  lastReviewedDate?: string
  cleared?: boolean
}

// 1. Quant Companion: Formula Roulette & Scroll Chat
export async function getFormulaRouletteQuestion() {
  // Select a random formula
  const randomIndex = Math.floor(Math.random() * formulas.length)
  const formula = formulas[randomIndex]

  const prompt = `You are a CAT/MBA exam prep assistant. You are given this verified formula:
Topic: ${formula.topic}
Formula: ${formula.formula}
Description: ${formula.description}
Key Insight: ${formula.keyInsight}

Generate a challenging but solveable CAT-level multiple-choice question that tests this formula.
Do NOT output any intro or outro. Just output a valid JSON object in the following format:
{
  "question": "The question text...",
  "options": [
    "A) Option A",
    "B) Option B",
    "C) Option C",
    "D) Option D"
  ],
  "correctAnswer": "A",
  "explanation": "Detailed explanation of why A is correct and how the formula is applied."
}`

  const { text } = await generateText({
    model: openai(MODEL_NAME),
    prompt,
    responseFormat: { type: 'json' }
  })

  try {
    const data = JSON.parse(text)
    return {
      formula,
      question: data.question,
      options: data.options,
      correctAnswer: data.correctAnswer,
      explanation: data.explanation
    }
  } catch (err) {
    // Fallback if parsing fails
    return {
      formula,
      question: `Find the value matching ${formula.topic} when relevant values are applied under the formula: ${formula.formula}.`,
      options: ["A) 1", "B) 2", "C) 3", "D) 4"],
      correctAnswer: "A",
      explanation: formula.description
    }
  }
}

export async function streamQuantScrollChat(messages: any[]) {
  const systemPrompt = `You are the Quant Bot, an expert mathematics tutor specializing in the 3-Step Scroll Strategy for solving quantitative problems.

Your approach:
1. **Understand**: Help the student identify given information, what needs to be found, and any constraints.
2. **Plan**: Guide them to choose the best approach (direct formula, step-by-step, elimination, or pattern recognition).
3. **Execute**: Walk through the solution step-by-step with verification.

Format your responses with clear markdown headers:
### Step 1: Understand
- What's given: ...
- What we need: ...
- Key insight: ...

### Step 2: Plan
- Approach: ...
- Why this works: ...

### Step 3: Execute
- Solution: ...
- Verification: ... (Highlight common exam traps or how to double-check this answer)

Keep responses highly concise. Under each step, use short bullet points. Do not write paragraphs.`

  return streamText({
    model: openai(MODEL_NAME),
    system: systemPrompt,
    messages,
  })
}

// 2. Error Investigator: Auto-tag & Peek-a-boo steps
export async function investigateError(questionInput: string) {
  const fewShotsPrompt = fewShots.errorInvestigator.map((fs, idx) => `
Example ${idx + 1}:
Input: "${fs.input}"
Output:
${JSON.stringify(fs.output, null, 2)}
`).join('\n')

  const prompt = `You are the Error Investigator, an AI that analyzes student mistakes on CAT/MBA exam questions.
Your goal is to:
1. Identify the core mathematical/logical concept.
2. Tag the mistake as exactly one of: "Silly" (calculation or reading errors), "Concept Gap" (lack of understanding or formula knowledge), or "Time Out" (correct logic but too slow/abandoned due to time).
3. Generate 3 click-to-reveal (Peek-a-boo) steps that guide the student to the correct solution without showing it all at once.

Use these few-shot examples for guidance on how to tag and structure your steps:
${fewShotsPrompt}

Analyze the user's input below.
User input: "${questionInput}"

Output a valid JSON object matching the format of the examples:
{
  "mistakeType": "Silly" | "Concept Gap" | "Time Out",
  "tagReason": "Brief explanation of why this tag was chosen...",
  "steps": [
    { "title": "Peek 1: [Step Title]", "content": "[First hint or setup details]" },
    { "title": "Peek 2: [Step Title]", "content": "[Intermediate deduction or formula application]" },
    { "title": "Peek 3: [Step Title]", "content": "[Final solution check/trap caution]" }
  ]
}`

  const { text } = await generateText({
    model: openai(MODEL_NAME),
    prompt,
    responseFormat: { type: 'json' }
  })

  try {
    return JSON.parse(text)
  } catch (err) {
    return {
      mistakeType: "Silly",
      tagReason: "Could not parse response, defaulted to Silly.",
      steps: [
        { title: "Peek 1: Understand", content: "Review what was given in the question statement." },
        { title: "Peek 2: Double Check", content: "Verify calculations and conversions." },
        { title: "Peek 3: Core Solution", content: "Write down the formula and check step-by-step." }
      ]
    }
  }
}

// 3. VARC Coach: Tone Analogy + 1-Question Quiz
export async function runVarcCoach(articleText: string) {
  const fewShot = fewShots.varcCoach[0]
  const prompt = `You are the VARC Coach, an expert Verbal Ability and Reading Comprehension instructor.
Analyze this short article.
1. Identify the author's tone and main idea.
2. Provide a highly relatable, quick real-life analogy that highlights the tone/attitude (e.g. 'Like a disappointed parent checking a report card' or 'Like a tech geek showing off their new phone').
3. Generate a 1-question multiple-choice comprehension quiz testing the tone or main point of the article.

Few-shot example:
Article: "${fewShot.article}"
Output:
${JSON.stringify(fewShot.output, null, 2)}

Analyze this article:
"${articleText}"

Output a valid JSON object matching the example format:
{
  "toneAnalysis": {
    "attitude": "Description...",
    "mainIdea": "Description...",
    "analogy": "Description..."
  },
  "quiz": {
    "question": "Question text...",
    "options": ["A) Option A", "B) Option B", "C) Option C", "D) Option D"],
    "correctAnswer": "A",
    "explanation": "Why this is correct..."
  }
}`

  const { text } = await generateText({
    model: openai(MODEL_NAME),
    prompt,
    responseFormat: { type: 'json' }
  })

  try {
    return JSON.parse(text)
  } catch (err) {
    return fewShot.output // Fallback
  }
}

// 4. DILR Untangler: Speed-to-decision
export async function untangleDilr(dilrDescription: string) {
  const fewShot = fewShots.dilrUntangler[0]
  const prompt = `You are the DILR Untangler. Given a description of a DILR (Data Interpretation & Logical Reasoning) puzzle set, help the student decide whether they should attempt it in an exam scenario, and what order they should solve it. Focus on speed-to-decision, NOT solving the puzzle for them.

Few-shot example:
Description: "${fewShot.description}"
Output:
${JSON.stringify(fewShot.output, null, 2)}

Analyze this DILR set:
"${dilrDescription}"

Output a valid JSON object matching the format:
{
  "verdict": "ATTEMPT / SKIP / LATER",
  "difficulty": "Easy / Medium / Hard",
  "strategy": [
    "1. Bullet point strategy 1...",
    "2. Bullet point strategy 2...",
    "3. Bullet point strategy 3..."
  ]
}`

  const { text } = await generateText({
    model: openai(MODEL_NAME),
    prompt,
    responseFormat: { type: 'json' }
  })

  try {
    return JSON.parse(text)
  } catch (err) {
    return fewShot.output // Fallback
  }
}

// 5. Vocab/RC Word Ghost: Spaced repetition micro-quizzes
export async function generateVocabQuiz(word: string) {
  const prompt = `Generate a spaced-repetition one-line micro-quiz for the vocabulary word: "${word}".
Provide two simple sentences: one using the word correctly, and one using it incorrectly or with a mismatched meaning.
Ensure it is a quick check (which sentence uses the word correctly).

Output a valid JSON object in the format:
{
  "question": "Which sentence uses the word '${word}' correctly?",
  "options": [
    "A) [Sentence with correct usage]",
    "B) [Sentence with incorrect usage]"
  ],
  "correctAnswer": "A",
  "explanation": "Definition of '${word}' and why the correct sentence fits."
}`

  const { text } = await generateText({
    model: openai(MODEL_NAME),
    prompt,
    responseFormat: { type: 'json' }
  })

  try {
    return JSON.parse(text)
  } catch (err) {
    return {
      question: `Which sentence uses the word '${word}' correctly?`,
      options: [
        `A) Her choice was extremely ${word} and logical.`,
        `B) The rain was so ${word} that it flooded the backyard.`
      ],
      correctAnswer: "A",
      explanation: `Correct usage of ${word}.`
    }
  }
}

// 6. Mock Post-Mortem Bot: Summary based on logged mistakes
export async function generatePostMortemSummary(errors: ErrorLogEntry[]) {
  if (!errors || errors.length === 0) {
    return "You have no logged errors in your database yet! Log some errors via the Error Investigator or WhatsApp pipeline to generate an automatic mock exam post-mortem analysis."
  }

  const errorSummaryText = errors.map((err, idx) => 
    `- Topic: ${err.topic} | Mistake Type: ${err.mistakeType} | Confidence: ${err.confidence}/5 | Source: ${err.source}`
  ).join('\n')

  const prompt = `You are the Mock Post-Mortem Bot. Analyze the student's logged errors from recent practice and mock tests.
Here is the error list:
${errorSummaryText}

Generate a short, punchy post-mortem summary. 
Avoid a wall of text. Use bullet points.
Identify:
1. The primary issue: Silly calculation errors vs. Concept Gaps vs. Time Management (Time Out).
2. Actionable advice: What specific topic they should prioritize revision for.
3. Keep it under 150 words total.`

  const { text } = await generateText({
    model: openai(MODEL_NAME),
    prompt
  })

  return text
}
