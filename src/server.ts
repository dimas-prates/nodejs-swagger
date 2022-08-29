import express from 'express'
import router from './routes'
import "dotenv/config"
const appPort = process.env.PORT || 3000
const app = express()
app.use(express.json())
app.use(router)

app.get("/terms", (req, res) => {
    return res.json({ message: "Terms of service" })
})

app.use('/v1', router)
app.listen(appPort, () => { console.log(`Server's running. PORT:${appPort}`) })