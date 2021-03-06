import Auth from '../../helpers/authenticate';


const validTokens = {
    savedUser: null,
    unsavedUser: Auth.generateToken('gakwererepacis@gmail.com', 1200, false),
    noEntryUser: null
};

const invalidToken = 'yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJvYmVydEBnbWFpbC5jb20iLCJpZCI6MSwiaWF0IjoxNTcyNjg4MzEwfQ.dNSwMfMy52oCz68W-ou3TPi88e6iy5s8kAwkzT4u0Pw';

const entriesTester = [{
    title: "Corruption in Police officers 2",
    location: "Latitude and Longitude", // Lat Long coordinates
    images: ['uploads/home3.jpg', 'uploads/home3.jpg'],
    videos: ['uploads/home3.jpg', 'uploads/home3.jpg'],
    comment: "A police officer who is in charge of the traffic are getting money from bad drivers. Not in our country of course"
}, {
    title: "Corruption in Police officers 3",
    location: "Latitude and Longitude", // Lat Long coordinates
    images: ['uploads/home3.jpg', 'uploads/home3.jpg'],
    videos: ['uploads/home3.jpg', 'uploads/home3.jpg'],
    comment: "A police officer who is in charge of the traffic are getting money from bad drivers. Not in our country of course"
}, {
    title: "",
    location: "Lat", // Lat Long coordinates
    images: ['uploads/home3.jpg', 'uploads/home3.jpg'],
    videos: ['uploads/home3.jpg', 'uploads/home3.jpg'],
    comment: "A police officer who is in charge of the traffic are getting money from bad drivers. Not in our country of course"
}];

const adminEntry = {
    id: null,
    type: null,
    status: null
};

export default {
    validTokens,
    invalidToken,
    entriesTester,
    adminEntry
}
