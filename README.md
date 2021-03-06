[![Coverage Status](https://coveralls.io/repos/github/Nigorjeanluc/Broadcaster/badge.svg?branch=develop)](https://coveralls.io/github/Nigorjeanluc/Broadcaster?branch=develop)
[![Build Status](https://travis-ci.org/Nigorjeanluc/Broadcaster.svg?branch=develop)](https://travis-ci.org/Nigorjeanluc/Broadcaster)
[![Maintainability](https://api.codeclimate.com/v1/badges/a9d517a56bd45d5c59b0/maintainability)](https://codeclimate.com/github/Nigorjeanluc/Broadcaster/maintainability)
# Broadcaster
Broadcaster is a social network application that enables any/every citizen to bring any form of corruption to the notice of appropriate authorities and the general public. Users can also report on things that need government intervention

## Homepage
The frontend part of the project, [here](https://nigorjeanluc.github.io/Broadcaster/UI/html/signin.html).

## User Interface(UI)
- HTML
- CSS
- Vanilla JS

## Required Features
1. Users can create an account and log in.
2. Users can create a ​red-flag ​record
3. Users can create an ​intervention​ record
4. Users can edit their ​red-flag ​or ​intervention ​records
5. Users can delete their ​red-flag ​or ​intervention ​records
6. Users can add geolocation (Lat Long Coordinates) to their ​red-flag ​or ​intervention records
7. Users can change the geolocation (Lat Long Coordinates) attached to their ​red-flag ​orintervention ​records
8. Admin can change the ​status​ of a record to either ​under investigation, rejected or resolved

## Optional Features
- Users can add images to their ​red-flag ​or​ intervention ​records, to support their claims
- Users can add videos to their ​red-flag ​or​ intervention ​records, to support their claims
- Users can add label tags when creating  ​red-flags​ or ​interventions ​to sub-group claims
- The application should display a Google Map with Marker showing the red-flag or intervention location
- Users can add label tags when creating  ​red-flags​ or ​interventions ​to sub-group claims

## Api Endpoints
| Request Routes                       | Methods | Description                      |
| --------------                       | ------- | -----------                      |
| /api/v1/auth/signup                  | POST    | users can sign up                |
| /api/v1/auth/signin                  | POST    | users can sign in                |
| /api/v1/:type                        | POST    | users can add entry              |
| /api/v1/:type                        | GET     | users can view all entries       |
| /api/v1/:type/:id                    | GET     | users can view a specific entry  |
| /api/v1/:type/:id/location           | PATCH   | users can modify entry's location|
| /api/v1/:type/:id/comment            | PATCH   | users can modify entry's location|
| /api/v1/:type/:id/status             | PATCH   | admin can modify entry's status  |
| /api/v1/:type/:id                    | DELETE  | users can delete an entry        |
| /api/v2/auth/signup                  | POST    | users can sign up                |
| /api/v2/auth/signin                  | POST    | users can sign in                |
| /api/v2/:type                        | POST    | users can add entry              |
| /api/v2/:type                        | GET     | users can view all entries       |
| /api/v2/:type/:id                    | GET     | users can view a specific entry  |
| /api/v2/:type/:id/location           | PATCH   | users can modify entry's location|
| /api/v2/:type/:id/comment            | PATCH   | users can modify entry's location|
| /api/v2/:type/:id/status             | PATCH   | admin can modify entry's status  |
| /api/v2/:type/:id                    | DELETE  | users can delete an entry        |


## API Documentation
[All API documentation](https://documenter.getpostman.com/view/9048923/SWE3eL4G)

## Pivotal Tracker Stories
[Project Stories](https://www.pivotaltracker.com/n/projects/2410710)


## Heroku link
[Click Me](https://broadcaster-application.herokuapp.com/)

## Backend, Frameworks and other tools used
- Node js
- Express
- Mocha and Chai(for testing)
- babel

## Installation Guide
- To use this project locally you must install node js, then clone the project using
```
> git clone https://github.com/Nigorjeanluc/Broadcaster.git
```
- after cloning the project, you must install all the project dependencies using
```
> npm i
```
- after installing the project dependencies, you need to create a .env file to the project root and specify which port the project will run on and the JWT key
```
> touch .env
```
- copy the content of the file .env.sapmle and paste it in this file and after that you are good to go, now you can run the project using
```
> npm start
```
- to test endpoints you will use a tool called postman.
- and finally to run tests you can use
```
> npm test
```
## Contributor
Igor J.Luc Ndiramiye nigorjeanluc@gmail.com

## Copyright
Copyright (c) Igor J.Luc Ndiramiye
