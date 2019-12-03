import User from '../models/userModel';
import Auth from '../helpers/authenticate';

class UserController {
    static async signUp(req, res) {
        try {
            const existingEmail = await User.emailExists(req.body.email);
            if (existingEmail.rowCount === 1) {
                return res.status(409).json({
                    status: 409,
                    error: 'Email already exists!'
                });
            }

            const existingUsername = await User.usernameExists(req.body.username);
            if (existingUsername.rowCount === 1) {
                return res.status(409).json({
                    status: 409,
                    error: 'Username already exists!'
                });
            }

            const user = new User(req.body);


            const add = await User.createUser(user);

            if (add.rowCount === 1) {
                return res.status(201).json({
                    status: 201,
                    message: 'User created successfully',
                    data: {
                        token: Auth.generateToken(
                            add.rows[0].email,
                            add.rows[0].id,
                            add.rows[0].isAdmin
                        ),
                        firstname: add.rows[0].firstname,
                        lastname: add.rows[0].lastname,
                        email: add.rows[0].email,
                        username: add.rows[0].username
                    }
                });
            }
        } catch (error) {
            return res.status(500).json({
                status: 500,
                error: error.message
            });
        }
    }

    static async signIn(req, res) {
        try {
            const doesExist = await User.emailExists(req.body.email);
            if (doesExist.rowCount === 0) {
                return res.status(401).json({
                    status: 401,
                    error: 'Sign up first please',
                });
            }
            const pswMatch = Auth.checkPassword(req.body.password, doesExist.rows[0].password);
            if (pswMatch) {
                return res.status(200).json({
                    status: 200,
                    message: 'User is successfully logged in',
                    data: {
                        token: Auth.generateToken(
                            doesExist.rows[0].email,
                            doesExist.rows[0].id,
                            doesExist.rows[0].isAdmin),
                        firstname: doesExist.rows[0].firstname,
                        lastname: doesExist.rows[0].lastname,
                        email: doesExist.rows[0].email,
                        username: doesExist.rows[0].username,
                    }
                });
            }

            return res.status(401).json({
                status: 401,
                error: 'Wrong password',
            });

        } catch (error) {
            return res.status(500).json({
                status: 500,
                error: error.message
            });
        }
    }
};

export default UserController;
