
import * as mongoose from "mongoose";

export const BookSchema : any = new mongoose.Schema({
    isbn: String,
    title: String,
    author: String,
    description: String,
    published_year: String,
    publisher: String,
    updated_date: { type: Date, default: Date.now }
});