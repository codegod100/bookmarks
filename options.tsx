import { useEffect, useState } from "react"

import { sendToBackground, sendToContentScript } from "@plasmohq/messaging"
import { useStorage } from "@plasmohq/storage/hook"

function OptionsIndex() {
  const [username, setUsername] = useStorage("username", "")
  const [password, setPassword] = useStorage("password", "")

  return (
    <div>
      <h1>Set your bsky login here</h1>
      <input
        placeholder="username"
        onChange={async (e) => setUsername(e.target.value)}
        value={username}
      />
      <input
        type="password"
        placeholder="app password"
        onChange={async (e) => setPassword(e.target.value)}
        value={password}></input>
      <h2>Settings auto save</h2>
    </div>
  )
}

export default OptionsIndex
