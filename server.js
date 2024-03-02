const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

/*mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true });
const reservationSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: String,
  fromLocation: String,
  toLocation: String,
  dateOfJourney: String,
  age: Number,
  gender: String,
});

const Reservation = mongoose.model('Reservation', reservationSchema);*/

/*const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/test';
 
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB connected');
  // Once connected, you can start querying and displaying data from MongoDB
  Reservation.find({})
    .then(reservations => {
      console.log('Reservations:', reservations);
    })
    .catch(err => {
      console.error('Error fetching reservation:', err);
    });
})
.catch(err => {
  console.error('Error connecting to MongoDB:', err);
});
 
// MongoDB Schema
const reservationSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: String,
  fromLocation: String,
  toLocation: String,
  dateOfJourney: String,
  age: Number,
  gender: String,
});
 
const Reservation = mongoose.model('Reservation', reservationSchema);
*/

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ticket';

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('MongoDB connected');
    Reservation.find({})
      .then(reservations => {
        console.log('Reservations:', reservations);
      })
      .catch(err => {
        console.error('Error fetching reservations:', err);
      });
    });

    
const reservationSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: String,
  fromLocation: String,
  toLocation: String,
  dateOfJourney: String,
  age: Number,
  gender: String,
});

const Reservation = mongoose.model('Reservation', reservationSchema);


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/', (req, res) => {
  const { firstName, lastName, email, phoneNumber, fromLocation, toLocation, dateOfJourney, age, gender } = req.body;

  const newReservation = new Reservation({
    firstName,
    lastName,
    email,
    phoneNumber,
    fromLocation,
    toLocation,
    dateOfJourney,
    age,
    gender,
  });

  newReservation.save()
    .then((savedReservation) => {
      console.log('Reservation saved:', savedReservation);
      res.send(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Ticket Reservation Application</title>
            <style>
              body {
                margin: 0;
                padding: 0;
                background: url('https://think360studio-media.s3.ap-south-1.amazonaws.com/portfolio-new/ttb-app-header-banner.jpg');
                background-size: cover;
                display: flex; 
                align-items: center;
                justify-content: center;
                height: 100vh;
              }

              .container {
                background-color: #fff;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              }

              h1 {
                color: #1e88e5;
              }

              .info-box {
                border: 1px solid #ccc;
                border-radius: 5px;
                padding: 15px;
                margin-top: 20px;
              }

              .info-box p {
                margin: 10px 0;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>Thank you for providing your information</h1>
              <div class="info-box">
                <p><strong>First Name:</strong> ${firstName}</p>
                <p><strong>Last Name:</strong> ${lastName}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone Number:</strong> ${phoneNumber}</p>
                <p><strong>From Location:</strong> ${fromLocation}</p>
                <p><strong>To Location:</strong> ${toLocation}</p>
                <p><strong>Date of Journey:</strong> ${dateOfJourney}</p>
                <p><strong>Age:</strong> ${age}</p>
                <p><strong>Gender:</strong> ${gender}</p>
              </div>
            </div>
          </body>
        </html>
      `);
    })
    .catch((error) => {
      console.error('Error saving reservation:', error);
      res.status(500).send('Internal Server Error');
    });
});

const PORT = 7000;
app.listen(PORT, () => {
  console.log(`Ticket Reservation Application listening on port ${PORT}`);
}); 