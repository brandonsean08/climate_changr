const admin = require('firebase-admin');

const firebaseConfig = require('../config/firebaseConfig');

admin.initializeApp({
credential: admin.credential.cert(firebaseConfig)
});

const database = admin.firestore();

module.exports = database;