import pool from '../config/dbConnect';
import User from '../models/userModel';
import queries from '../models/queries';
import Auth from '../helpers/authenticate';

class UserController {
    static async signUp(req, res) {
        try {
            const existingEmail = await pool.query(queries.findOneUser, [req.body.email]);
            if (existingEmail.rowCount === 1) {
                return res.status(409).json({
                    status: 409,
                    error: 'Email already exists!'
                });
            }

            const existingUsername = await pool.query(queries.findOneUsername, [req.body.username]);
            if (existingUsername.rowCount === 1) {
                return res.status(409).json({
                    status: 409,
                    error: 'Username already exists!'
                });
            }

            const user = new User(req.body);


            const add = await pool.query(queries.addUser, [
                user.firstname,
                user.lastname,
                user.email,
                user.phoneNumber,
                user.username,
                user.isAdmin,
                user.password,
                user.createdOn
            ]);

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
};

export default UserController;
