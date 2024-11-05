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
  const [username, setUsername] = useStorage("username")
  const [data, setData] = useState("")
  useEffect(() => {
    console.log("popup loaded")
    console.log({ username })
    const sendContent = async () => {
      const resp2 = await sendToBackground({
        name: "save",
        body: {
          username: "testing"
        }
      })
      // const username = await storage.get("username")
      // console.log({ username })
      const resp = await sendToContentScript({ name: "url" })
      console.log({ resp })
      const title = await grabTitle(resp)
      console.log({ title })
      setData(title)
    }
    sendContent()
  }, [])
  return (
    <div
      style={{
        padding: 16
      }}>
      <div>Username: {username}</div>
      <div>Title: {data}</div>
      <a href="">Save bookmark</a>
    </div>
  )
}

export default IndexPopup
