import * as mongoose from 'mongoose';


export const heroShema: mongoose.Schema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    }
})