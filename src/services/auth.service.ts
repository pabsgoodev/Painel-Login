import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { AuthLog } from "../Logs/authLogs.js";
import {
    isBlocked,
    logAttemp,
    countRecentFails,
    blockUser
} from "../repositories/auth.repository.js";
import { findUserByUsername } from "../repositories/user.repository.js";
import { Request, Response } from "express";

const MAX_ATTEMPTS = 5;
const BLOCK_MINUTES = 30;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRATION ='15m';

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
}

export async function loginService(req: Request) {
    const {user, pass} = req.body;

    if (!user || !pass) {
        return { status: 400, body: "Username and password are required" };
    }

    if (user.length > 50 || pass.lenght > 50) {
        return { status: 400, body: "Invalid Input "}
    }

    const ip = 
    req.headers['x-forwarded-for'] ||
    req.socket.remoteAddress ||
    "unknown";
    const user_agent = req.headers['user-agent'] || "unknown";

    if (await isBlocked(user, ip.toString())){
        return { status: 403, body: "Blocked. " };
    }
    const dbUser = await findUserByUsername(user);
    let success = false;
    if (dbUser) {
        success = await bcrypt.compare(pass, dbUser.password)
    }
    await logAttemp(user, ip.toString(), user_agent, success);

    if (!success){
        const fails = await countRecentFails(ip.toString());
        if ( fails >= MAX_ATTEMPTS){
            await blockUser(user, ip.toString(), BLOCK_MINUTES);
            return { status: 403, body: "Blocked. "};
        }
        return { status: 401, body: "Invalid credentials. "};
    }
    const token = jwt.sign(
        { sub: dbUser.id },
        JWT_SECRET!,
        {expiresIn: JWT_EXPIRATION}
    );
    return { status: 200, body: { token } };
}