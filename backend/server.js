import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import userRoute from './routes/userRoute.js';


const app=express();
const port=process.env.PORT || 4000;
connectDB();
connectCloudinary()

//middlewares
app.use(express.json());

app.use(cors());


//api endpoints
app.use('/api/admin',adminRouter) //localhost:4000/api/admin/add-doctor
app.use('/api/doctor',doctorRouter)
app.use('/api/user',userRoute)


app.get('/',(req,res)=>{
    res.send('API Working')
})



app.listen(port,(req,res)=>{
    console.log('Listening on port 4000');
})