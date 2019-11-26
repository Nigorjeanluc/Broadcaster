const entries = [{
    id: 1,
    createdOn: new Date(),
    createdBy: 1, // represents the user who created this record
    title: "Corruption in Police officers 1",
    type: "red-flag", // [red-flag, intervention]
    location: "coordinates", // Lat Long coordinates
    status: "draft", // [draft, under investigation, resolved, rejected]
    images: ['Image', 'Image'],
    videos: ['Video', 'Video'],
    comment: "A police officer who is in charge of the traffic are getting money from bad drivers. Not in our country of course"
}, {
    id: 2,
    createdOn: new Date(),
    createdBy: 1, // represents the user who created this record
    title: "Corruption in Police officers 2",
    type: "intervention", // [red-flag, intervention]
    location: "coordinates", // Lat Long coordinates
    status: "draft", // [draft, under investigation, resolved, rejected]
    images: ['Image', 'Image'],
    videos: ['Video', 'Video'],
    comment: "A police officer who is in charge of the traffic are getting money from bad drivers. Not in our country of course"
}];

export default entries;