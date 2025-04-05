require('dotenv').config();
const express = require('express');
const admin = require('firebase-admin');
const app = express();
const PORT = process.env.PORT || 3000;

// 1. Initialize Firebase
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
  }),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

// 2. Create API endpoint
app.post('/post-announcement', async (req, res) => {
  const { title, content, secret } = req.body;
  
  if (secret !== process.env.ADMIN_SECRET) {
    return res.status(401).send("Invalid secret key!");
  }

  const ref = await admin.database().ref('announcements').push({
    title, 
    content,
    timestamp: Date.now()
  });
  
  res.send({ id: ref.key });
});

// 3. Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
