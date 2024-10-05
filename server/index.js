const express = require("express")
const app = express();
const dotenv = require('dotenv');
const dbConnect = require('./dbConnect');
const authRouter = require("./routers/authRouter");
const postRouter = require("./routers/postsRouter");
const userRouter = require("./routers/userRouter");
const morgan = require('morgan');
const cookieParser = require('cookie-parser') 
const cors = require('cors')
const cloudinary = require('cloudinary').v2;
dotenv.config()

// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_SECRET
});

//middleares
app.use(express.json({limit:'10mb'}));
// app.use(express.urlencoded)
app.use(morgan('common'));
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: 'https://social-hub-pink.vercel.app/'
}));


const PORT =process.env.PORT || 4000;

app.use("/auth", authRouter)
app.use("/posts", postRouter)
app.use("/user", userRouter )

app.get('/',(req,res)=>{
    res.status(200).send("Hello world")
});



dbConnect()

app.listen(PORT, ()=>{
    console.log(`listening on port: http://localhost:${PORT}`)
})