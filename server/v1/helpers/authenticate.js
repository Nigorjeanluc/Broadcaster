import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

class Auth {
    static generateToken(email, id) {
        return jwt.sign({ email, id },
            process.env.KEY
        );
    }

    static verifyToken(token) {
        return jwt.verify(token, process.env.KEY);
    }

    static hashPassword(password) {
        return bcrypt.hashSync(password, 10);
    }

    static checkPassword(plainPassword, hashedPassword) {
        return bcrypt.compareSync(plainPassword, hashedPassword);
    }
}

export default Auth;