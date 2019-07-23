# Welcome to WayFare Booking Service API

WayFarer is a public bus transportation booking service.

An API that will provide a fucntionality for WayFarer Admins to be able to
create and manage trips.

## Application features

Appart from normal authentication the app will provide the following
functionality

* Creating Trips
* Booking a Trip

An Admin user can perform the following:

* Create a trip.
* Cancel a trip.
* See all trips.
* See a specific trip.
* See all bookings.

A normal user can perform the following:

* See all trips.
* See a specific trip.
* Book a seat on a trip.
* See his/her bookings.
* Delete a booking

The following endpoints should be available to use once the API is complete:

| EndPoint                            | Functionality         |
| ----------------------------------- | --------------------- |
| POST /api/v1/auth/signup            | Create user account   |
| POST /api/v1/auth/signin            | Login a user          |
|                                     |                       |
| POST /api/v1/trips                  | Create a trip.        |
| GET /api/v1/trips/<:trip-id>        | Get a specific trip.  |
| GET /api/v1/trips                   | Get all trips         |
| PATCH /trips/<:trip-id>/cancel      | Cancel a trip         |
|                                     |                       |
| POST /api/v1/bookings               | Book a seat on a trip |
| GET /api/v1/bookings                | View all bookings.    |
| GET /api/v1//bookings/<:booking-id> | Delete a booking.     |
|                                     |                       |

### Technologies used to build the application

[Expressjs](https://expressjs.com/) Framework

[Jestjs](https://jestjs.io/) Testing Framework

#### Getting started with the application

[download](https://nodejs.org/en/download/) and install nodejs.

[install](https://yarnpkg.com/en/docs/install) Yarn version for your operating system.

Clone the repo [here](https://github.com/danielotieno/way-farer-api) to your local machine

Create a `.env` file. Copy the contents of `.env.sample` file and paste them in your `.env` file.

Install dependencies

`yarn install`

Then run the command below to run test

`yarn run test`

Then run the command below to start the application in development mode

`yarn start:dev`

### Switch to the master branch for stable/working features

`git checkout master`

The application is under constant development. The `develop` branch has the latest changes added into the app

