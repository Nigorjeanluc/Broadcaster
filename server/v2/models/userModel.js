import Auth from '../helpers/authenticate';
import pool from '../config/dbConnect';
import queries from './queries';

class User {
    constructor({ firstname, lastname, email, phoneNumber, username, password }) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.username = username;
        this.isAdmin = false;
        this.password = Auth.hashPassword(password);
        this.createdOn = new Date();
    }

    static emailExists(email) {
        return pool.query(queries.findOneUser, [email]);
    }

    static usernameExists(username) {
        return pool.query(queries.findOneUsername, [username]);
    }

    static createUser(user) {
        return pool.query(queries.addUser, [
            user.firstname,
            user.lastname,
            user.email,
            user.phoneNumber,
            user.username,
            user.isAdmin,
            user.password,
            user.createdOn
        ]);
    }
}

export default User;