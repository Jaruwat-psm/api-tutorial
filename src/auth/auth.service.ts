import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) {}


    private saltRounds: number = 10;
    async validateUser(username: string, password: string): Promise<any> {
    
     const payload = {
            username: username,
            role: 'admin',
            message: 'psm-thammasatt'
        };

    const defaultPassword: string = "P@ssw0rd#psm";
       if(username !== "admin@psm.tu"){
        return {Status: 0, Message: "Invalid Username"}
       }
       const isMatch = await bcrypt.compare(defaultPassword, password);
       if(isMatch){
        return {Message: "Login Successfully", Status: 112,  access_token: this.jwtService.sign(payload)};
       }else{
        return {Message: "error Authorization"}
       }
    }

    async checkToken(authtoken: string): Promise<any> {
        const token = authtoken.split(' ')[1];
        const decoded = jwt.verify(token, process.env.SECRETKEY);
        try {
            if (!authtoken || !authtoken.startsWith('Bearer ')) {
                return { message: 'Unauthorized' };
              }

            if (typeof decoded === 'object' && decoded !== null && 'role' in decoded && decoded.role !== 'admin') {
                return { message: "แก ไม่มีสิทธิ์เข้าถึงข้อมูลนี้" }
            }

            if (typeof decoded === 'object' && decoded !== null && 'message' in decoded) {
                if (decoded.message !== 'psm-thammasatt') {
                    return { message: 'Forbidden: Invalid message in token' };
                }
            } else {
                return { message: 'Invalid token structure' };
            }
            return { status: 200, role: decoded.role, message: 'Token is valid' };
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                return { message: 'Token has expired' };
            }
            if (error.name === 'JsonWebTokenError') {
                return { message: 'Invalid token' };
            }
            return { message: 'Internal server error' };
        }
    }

}
