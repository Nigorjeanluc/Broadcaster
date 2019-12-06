import User from '../models/userModel';
import Auth from '../helpers/authenticate';

class UserController {
    static async signUp(req, res) {
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

        const {
            id,
            firstname,
            lastname,
            email,
            phone_number,
            username,
            is_admin,
            password,
            createdon
        } = await User.createUser(user);

        return res.status(201).json({
            status: 201,
            message: 'User created successfully',
            data: {
                token: Auth.generateToken(
                    email,
                    id,
                    is_admin
                ),
                firstname: firstname,
                lastname: lastname,
                email: email,
                username: username,
                phone_number,
                password,
                createdOn: createdon
            }
        });
    }

    static async signIn(req, res) {
        const doesExist = await User.emailExists(req.body.email);
        if (doesExist.rowCount === 0) {
            return res.status(401).json({
                status: 401,
                error: 'Sign up first please',
            });
        }
        const pswMatch = Auth.checkPassword(req.body.password, doesExist.rows[0].password);
        if (pswMatch) {
            const {
                id,
                firstname,
                lastname,
                email,
                phone_number,
                username,
                is_admin,
                password,
                createdon
            } = doesExist.rows[0];

            return res.status(200).json({
                status: 200,
                message: 'User is successfully logged in',
                data: {
                    token: Auth.generateToken(
                        email,
                        id,
                        is_admin),
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    username: username,
                    phone_number,
                    password,
                    createdOn: createdon
                }
            });
        }

        return res.status(401).json({
            status: 401,
            error: 'Invalid credentials',
        });
    }
};

export default UserController;
