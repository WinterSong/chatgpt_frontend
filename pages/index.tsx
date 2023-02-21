import { Text, Page } from '@vercel/examples-ui'
import { Chat } from '../components/Chat'

function Home() {
  return (
    <Page>
      <section className="flex flex-col gap-6">
        <Text variant="h1">Chatgpt Port</Text>
        <Text className="text-zinc-600">
        </Text>
      </section>

      <section className="flex flex-col gap-3">
        <Text variant="h2">AI Chat Bot:</Text>
        <div className="lg:w-2/3">
          <Chat />
        </div>
      </section>
    </Page>
  )
}

export default Home
