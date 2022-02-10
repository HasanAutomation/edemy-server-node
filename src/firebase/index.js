const admin = require('firebase-admin');

const serviceAccount = require('../util/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
