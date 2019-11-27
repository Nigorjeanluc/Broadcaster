import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

class Auth {
    static generateToken(email, id, isAdmin) {
        return jwt.sign({ email, id, isAdmin },
            process.env.KEY, { expiresIn: '3h' }
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