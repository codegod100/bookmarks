import { AtpAgent } from "@atproto/api"
import { useEffect, useState } from "react"

import { sendToBackground, sendToContentScript } from "@plasmohq/messaging"
import { Storage } from "@plasmohq/storage"
import { useStorage } from "@plasmohq/storage/hook"

const storage = new Storage()
export async function grabTitle(url: string): Promise<string> {
  url = encodeURI(url)
  const response = await fetch(`https://cardyb.bsky.app/v1/extract?url=${url}`)
  const body = await response.json()
  return body.title
}

function IndexPopup() {
  const agent = new AtpAgent({
    service: "https://bsky.social"
  })

  const [username, setUsername] = useStorage("username", "")
  const [password, setPassword] = useStorage("password", "")
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")
  useEffect(() => {
    console.log("popup loaded")

    console.log("inside async")
    const doAsync = async () => {
      const url = await sendToContentScript({ name: "url" })
      console.log({ url })
      setUrl(url)
      console.log({ url })
      const title = await grabTitle(url)
      console.log({ title })
      setTitle(title)
    }
    doAsync()
  }, [])

  const hasUsername = (
    <div
      style={{
        padding: 16
      }}>
      <div>Username: {username}</div>
      <div>Title: {title}</div>
      <button
        onClick={async (e) => {
          console.log(username, password)

          const login = await agent.login({
            identifier: username,
            password
          })
          console.log({ login })
          console.log({ url })
          const res1 = await agent.com.atproto.repo.createRecord({
            did: agent.did,
            repo: agent.did,
            collection: "fyi.unravel.frontpage.post",
            record: {
              $type: "fyi.unravel.frontpage.post",
              title,
              url,
              createdAt: new Date().toISOString()
            }
          })
          console.log({ res1 })
        }}>
        Save bookmark
      </button>
    </div>
  )

  const noUsername = (
    <div>
      <a href="/options.html" target="_blank">
        click here to set login info
      </a>
    </div>
  )
  return (
    <div>
      {username && hasUsername} {!username && noUsername}
    </div>
  )
}

export default IndexPopup
