import type { PlasmoMessaging } from "@plasmohq/messaging"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  //   const message = await querySomeApi(req.body.id)
  const username = req.body.username
  console.log({ username })
  res.send({
    username
  })
}

export default handler
