import users from './users.db';
import Auth from '../helpers/authenticate';

class User {
    constructor({ firstname, lastname, email, phoneNumber, username, password }) {
        this.id = users.length + 1;
        this.createdOn = new Date();
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.username = username;
        this.isAdmin = false;
        this.password = Auth.hashPassword(password);
    }

    static userExists(email) {
        return users.find(user => user.email === email);
    }

    static userSaved(user) {
        return users.push(user);
    }
}

export default User;