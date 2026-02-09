const express = require('express')
const serverConfig = require('./config/serverConfig')
const connectDB = require('./config/dbConfig')
const bodyParser = require('body-parser')
const userRouter = require('./route/userRoute')
const authRouter = require('./route/authRoutes')
const cookieParser = require('cookie-parser')

//making express app
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))
app.use(express.text())
app.use(cookieParser())

//routing
app.use('/users',userRouter)
app.use('/auth',authRouter)



//making server
app.listen(serverConfig.PORT, async () => {
    //connecting with database
     connectDB()
    console.log(`server is running on port ${serverConfig.PORT}`)


})