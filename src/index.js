import express from 'express'
import corsOptions from './middleware/cors.js'
import cors from 'cors'
import { PORT } from './config/config.js'
import { loginRousts } from './routs/loginRouts.js'

const app = express()

app.use(cors(corsOptions))
app.use(express.json())

app.use('/', loginRousts)


app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))