import pool from '../config/dbConnect';
import queries from '../models/queries';
import Auth from '../helpers/authenticate';

export default async(req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = Auth.verifyToken(token);
        req.userData = decoded;
        const user = await pool.query(queries.findOneUser, [req.userData.email]);
        if (user.rowCount === 0) {
            return res.status(401).send({
                status: 401,
                error: 'Sign up first please',
            });
        }
        return next();
    } catch (error) {
        return res.status(401).json({
            status: 401,
            error: 'Auth failed',
        });
    }
};
