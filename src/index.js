const express = require('express')
const serverConfig = require('./config/serverConfig')
const connectDB = require('./config/dbConfig')
const bodyParser = require('body-parser')
const userRouter = require('./route/userRoute')
const authRouter = require('./route/authRoutes')
const cookieParser = require('cookie-parser')
const User = require('./schema/userSchema')
const bcrypt = require('bcrypt')
//making express app
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text())
app.use(cookieParser())

//routing
app.use('/users',userRouter)
app.use('/auth',authRouter)

async function FirstAdmin() {
    try {
        const adm = await User.findOne({role : "ADMIN"})
        if(!adm){
            //now make admin
            const adminDetails = {
                name : "System-Admin",
                email : "abcdef@gmail.com",
                password : await bcrypt.hash("hello123", 10),
                phone : "9999999988",
                role : "ADMIN",
                isVerified : true
            }
            const admin = new User(adminDetails);
            await admin.save();
            console.log("admin created");
        }else{
            console.log("admin already exist");
        }
    } catch (error) {
        console.log("not able to create the admin", error.message)
    }
}

//making server
app.listen(serverConfig.PORT, async () => {
    //connecting with database
     await connectDB()
     FirstAdmin();
    console.log(`server is running on port ${serverConfig.PORT}`)


})