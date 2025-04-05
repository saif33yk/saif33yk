const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');

// Initialize Firebase Admin with your service account
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://YOUR_PROJECT.firebaseio.com"
});

const app = express();
app.use(cors({ origin: true }));

// Admin API Endpoints
app.get('/admin/announcements', async (req, res) => {
  try {
    const snapshot = await admin.database().ref('announcements').once('value');
    res.json(snapshot.val());
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post('/admin/announcements', async (req, res) => {
  try {
    const { title, content } = req.body;
    const newAnnouncement = {
      title,
      content,
      timestamp: admin.database.ServerValue.TIMESTAMP
    };
    
    const ref = await admin.database().ref('announcements').push(newAnnouncement);
    res.json({ id: ref.key, ...newAnnouncement });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

exports.api = functions.https.onRequest(app);
