import { type NextRequest, NextResponse } from 'next/server'
import { initialMessages } from '../../components/Chat'
import { type Message } from '../../components/ChatLine'


const botName = 'AI'
const userName = 'Parrrrrot' // TODO: move to ENV var
const firstMessge = initialMessages[0].message

// @TODO: unit test this. good case for unit testing
const generatePromptFromMessages = (messages: Message[]) => {
  console.log('== INITIAL messages ==', messages)

  let prompt = ''

  // add first user message to prompt
  prompt += messages[1].message

  // remove first conversaiton (first 2 messages)
  const messagesWithoutFirstConvo = messages.slice(2)
  console.log(' == messagesWithoutFirstConvo', messagesWithoutFirstConvo)

  // early return if no messages
  if (messagesWithoutFirstConvo.length == 0) {
    return prompt
  }

  messagesWithoutFirstConvo.forEach((message: Message) => {
    const name = message.who === 'user' ? userName : botName
    prompt += `\n${name}: ${message.message}`
  })
  return prompt
}

export const config = {
  runtime: 'edge',
}

export default async function handler(req: NextRequest) {
  // read body from request
  const body = await req.json()

  console.log('== body ==', body)
  let user_input = body.messages[body.messages.length - 1].message

  const payload = {
    message: user_input
  }

  const requestHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  }

  console.log('== payload ==', payload)
  console.log('== env ==', process.env)
  const response = await fetch(`${process.env.ADDRESS}`, {
    headers: requestHeaders,
    method: 'POST',
    body: JSON.stringify(payload),
  })

  const data = await response.json()

  if (data.error) {
    console.error('OpenAI API error: ', data.error)
    return NextResponse.json({
      text: `ERROR with API integration. ${data.error.message}`,
    })
  }
  console.log(data)

  // return response with 200 and stringify json text
  return NextResponse.json({ text: data.response })
}
