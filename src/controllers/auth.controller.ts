import { Request, Response} from "express";
import { loginService } from "../services/auth.service.js";

export async function login(req: Request, res: Response){
  try {
    const result = await loginService(req);
    return res.status(result.status).json(result.body);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
