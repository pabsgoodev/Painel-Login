import { getDBConnection } from "../database/db.js";

export async function isBlocked(username: string, ip: string) {
    const db = await getDBConnection();
    const [rows]: any = await db.query(
        `SELECT 1 FROM login_blocks
        WHERE (ip = ? OR username = ?)
        AND blocked_until > NOW()
        LIMIT 1`, 
        [ip, username]
    );
    return rows.length > 0;
}

export async function logAttemp(
    username: string, 
    ip: string, 
    user_agent: string, 
    success: boolean
) {
    const db = await getDBConnection();
    await db.query(
        `INSERT INTO login_logs (username, ip, user_agent, success)
        VALUES (?, ?, ?, ?)`,
        [username, ip, user_agent, success ? 1 : 0]
    );
}

export async function countRecentFails(ip: string){
    const db = await getDBConnection();
    const [rows]: any = await db.query(
        `SELECT COUNT(*) AS total FROM login_logs
        WHERE ip = ? 
        AND success = 0 
        AND created_at > (NOW() - INTERVAL 15 MINUTE)    `,
        [ip]
    );
    return rows[0].total;
}
export async function blockUser(
    username: string, 
    ip: string, 
    minutes: number
) {
    const db = await getDBConnection();
    await db.query(
        `INSERT INTO login_blocks (username, ip, reason, blocked_until)
        VALUES (?,?, 'Too many attemps',
        DATE_ADD(NOW(), INTERVAL ? MINUTE))`,
        [username, ip, minutes]
    );
}