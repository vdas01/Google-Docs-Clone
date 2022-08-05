import mongoose from 'mongoose';

const Connection =async (username='vdas02',password='Y99iOwwI8c386an9')=>{
    const url = `mongodb+srv://vdas02:${password}@cluster0.0xoyw.mongodb.net/?retryWrites=true&w=majority`;
    try{
         await mongoose.connect(url);
         console.log('Databse connected');
    }
    catch(error){
        console.log('Error while connecting with the database',error);
    }
}

export default Connection;