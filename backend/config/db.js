import mongoose from 'mongoose'

const connectDB=async()=>{
    await mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log("Connected to database...!")
    }).catch((error)=>{
        console.log(error.message)
    })
}

export default connectDB