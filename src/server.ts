import express from 'express'
import { router } from './routes'
import "dotenv/config"
import swaggerUi from 'swagger-ui-express'
import swaggerDocs from './swagger.json'

const appPort = process.env.PORT || 3000
const app = express()
app.use(express.json())

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.get("/terms", (req, res) => {
    return res.json({ message: "Terms of service" })
})
app.use(router)
app.listen(appPort, () => { console.log(`Server's running. PORT:${appPort}`) })