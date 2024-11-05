import { useEffect, useState } from "react"

import { useStorage } from "@plasmohq/storage/hook"

function OptionsIndex() {
  const [username, setUsername] = useStorage("username", "")
  //   const storage = new Storage()
  //   const [data, setData] = useState("")
  setUsername("testing")
  useEffect(() => {
    const saveStorage = async () => {
      //   const res = await storage.set("username", "foo")
      //   console.log({ res })
      //   const res2 = await storage.get("username")
      //   console.log({ res2 })
    }
    saveStorage()
  })
  return (
    <div>
      <h1>
        Welcome to your <a href="https://www.plasmo.com">Plasmo</a> Extension!
      </h1>
      <h2>This is the Option UI page!</h2>
      {/* <input onChange={(e) => setData(e.target.value)} value={data} /> */}
    </div>
  )
}

export default OptionsIndex
