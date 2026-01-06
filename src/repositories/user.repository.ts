import { getDBConnection } from "../database/db.js";

export async function findUserByUsername(username: string) {
    const db = await getDBConnection();
    const [rows]: any = await db.query(
        "SELECT * FROM users WHERE username = ?",
        [username]
    );
    return rows[0];
}