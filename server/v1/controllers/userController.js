import User from '../models/userModel';
import Auth from '../helpers/authenticate';

class UserController {
    static signUp(req, res) {
        const exist = User.userExists(req.body.email);

        if (exist) {
            return res.status(409).json({
                status: 409,
                error: 'The email already exists'
            });
        }

        const user = new User(req.body);

        User.userSaved(user);

        return res.status(201).json({
            status: 201,
            message: 'User created successfully',
            data: {
                token: Auth.generateToken(user.email, user.id),
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                username: user.username,
            }
        });
    }

    static signIn(req, res) {
        const hasAccount = User.userExists(req.body.email);

        if (hasAccount) {
            const pswMatch = Auth.checkPassword(
                req.body.password,
                hasAccount.password
            );

            if (pswMatch) {
                return res.status(200).json({
                    status: 200,
                    message: 'User is successfully logged in',
                    data: {
                        token: Auth.generateToken(hasAccount.email, hasAccount.id),
                        firstname: hasAccount.firstname,
                        lastname: hasAccount.lastname,
                        email: hasAccount.email,
                        username: hasAccount.username,
                    }
                });
            }

            return res.status(401).json({
                status: 401,
                error: 'Wrong password',
            });
        }

        return res.status(401).json({
            status: 401,
            error: 'Auth failed',
        });
    }
};

export default UserController;