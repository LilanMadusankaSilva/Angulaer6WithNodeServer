
import * as mongoose from "mongoose";
import * as bcrypt from "bcryptjs";

export interface IUser extends mongoose.Document {
    name: string;
    username: string;
    password: string;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

export const UserSchema : any = new mongoose.Schema({
    name: String,
    username:  {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    salt: String
}, { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });

UserSchema.pre("save", (next) => {
    bcrypt.hash(this.password, 10, (err, hash) => {
        this.password = hash;
        next();
    });
});

UserSchema.pre("update", (next) => {
    bcrypt.hash(this.password, 10, (err, hash) => {
        this.password = hash;
        next();
    });
});

UserSchema.methods.getHashForPassword = function (plaintextPassword: string): Promise<object> {
    const saltRounds: number = 10;
    return new Promise<object>((resolve, reject) => {
        bcrypt.genSalt(saltRounds, (err: any, salt: any) => {
            if (err) {
                reject(err);
            }
            bcrypt.hash(plaintextPassword, salt, (err, hash) => {
                if (err) {
                    reject(err);
                }
                resolve({salt : salt, hash : hash});
            });
        });
    });
};

UserSchema.methods.comparePassword = function (candidatePassword: string): Promise<boolean> {
    let password: string = this.password;
    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, password, (err, success) => {
            if (err) {
                reject(err);
            }
            resolve(success);
        });
    });
};

export const model : any = mongoose.model<IUser>("User", UserSchema);

export const cleanCollection: any = () => model.remove({}).exec();

export default model;