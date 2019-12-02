import Auth from '../helpers/authenticate';

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
}

export default User;
