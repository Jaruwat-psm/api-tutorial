import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
    constructor( private readonly jwtService: JwtService) {}

    async validateUser(username: string, password: string): Promise<any>{
        if(username === 'jaruwat' && password === '1234567'){
            return { username };
        }
        return null;
    }

    async login(user: any) {
        const payload = { 
            username: user.username, 
            role: 'admin',
            message: 'psm-thammasatt'
        };
        return{
            access_token: this.jwtService.sign(payload)
        }
    }
}
