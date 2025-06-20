const admin = require("firebase-admin");
const dotenv = require('dotenv').config();

const serviceAccount = JSON.parse(process.env.firebaseAdmin);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;
