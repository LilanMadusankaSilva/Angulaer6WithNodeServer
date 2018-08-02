
import { Request, Response } from "express";

class AppStatus {
    public getSession(req: Request, key: string): any {
        return req.session.key;
    }

    public setSession(req: Request, key: string, value: any): void {
        req.session.key = value;
    }
}

export default new AppStatus();