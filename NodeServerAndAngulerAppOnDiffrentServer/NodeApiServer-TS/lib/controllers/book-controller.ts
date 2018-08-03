import * as mongoose from "mongoose";
import { BookSchema } from "../models/book-model";
import { Request, Response } from "express";

const Book: any = mongoose.model("Book", BookSchema);

export class BookController {

    public getBooks (req: Request, res: Response): void {
        Book.find({}, (err, book) => {
            if(err) {
                res.send(err);
            }
            res.json(book);
        });
    }

    public addNewBook (req: Request, res: Response): void {
        let newBook: any = new Book(req.body);

        newBook.save((err, book) => {
            if(err) {
                res.send(err);
            }
            res.json(book);
        });
    }

    public getBookWithId (req: Request, res: Response): void {
        Book.findById(req.params.id, (err, book) => {
            if(err) {
                res.send(err);
            }
            res.json(book);
        });
    }

    public updateBook (req: Request, res: Response): void {
        Book.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, book) => {
            if(err) {
                res.send(err);
            }
            res.json(book);
        });
    }

    public deleteBook (req: Request, res: Response): void {
        Book.remove({ _id: req.params.id }, (err, book) => {
            if(err) {
                res.send(err);
            }
            res.json({ message: "Successfully deleted book!"});
        });
    }
}