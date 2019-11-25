import Auth from '../helpers/authenticate';

const users = [{
    id: 1,
    firstname: 'Robert',
    lastname: 'Ndiramiye',
    email: 'robert@gmail.com',
    phoneNumber: '0789660036',
    username: 'KingRob',
    isAdmin: false,
    password: Auth.hashPassword('123456789')
}, {
    id: 2,
    firstname: "JayJay ",
    lastname: "Okocha",
    email: "robertrt@gmail.com",
    phoneNumber: "0789660036",
    username: 'KingJay',
    isAdmin: false,
    password: Auth.hashPassword('123456789')
}];

export default users;