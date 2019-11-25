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
};

export default UserController;