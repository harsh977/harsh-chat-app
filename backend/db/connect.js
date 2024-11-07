import mongoose from 'mongoose';

const connect = async () => {
    try{
        await mongoose.connect("mongodb+srv://harshdaftari2:postgres123@cluster0.pgqed.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log("CONNECTED SUCCESS");
    }catch(error){
        console.log("error connecting")
    }
}

export default connect;