import Auth from '../helpers/authenticate';
import User from '../models/userModel';

export default (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = Auth.verifyToken(token);
        req.userData = decoded;
        if (!User.userExists(req.userData.email)) {
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
