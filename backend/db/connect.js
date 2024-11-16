import mongoose from 'mongoose';

const connect = async () => {
    try{
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log("CONNECTED SUCCESS");
    }catch(error){
        console.log("error connecting")
    }
}

export default connect;