export interface AuthLog {
    id?: number;
    username: string;
    ip: string | string[];
    user_agent: string;
    success: boolean;
    created_at?: Date;
}