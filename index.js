const express = require('express');
const app = express();
const PORT = 8000;
const firebase = require('firebase');
require('firebase/database');

// Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyD4l9MAjo0nwg8svNH2nCe1amzsRnu11Lk",
    authDomain: "adopet-9b45a.firebaseapp.com",
    databaseURL: "https://adopet-9b45a-default-rtdb.firebaseio.com",
    projectId: "adopet-9b45a",
    storageBucket: "adopet-9b45a.appspot.com",
    messagingSenderId: "528567839616",
    appId: "1:528567839616:web:4def598f1423ef83ab6f65",
    measurementId: "G-GK1YF97X41"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const cors = require('cors');
app.use(cors());
app.use(express.json());

// Fetch posts for adoption
app.get('/adoption-posts', (req, res) => {
  const database = firebase.database();
  const petFormRef = database.ref('petForm');

  petFormRef.once('value')
    .then((snapshot) => {
      const petPosts = snapshot.val();
      const formattedPosts = [];

      // Format the data to a usable structure
      for (let postId in petPosts) {
        // Filter for adoption category
        if (petPosts[postId].category === 'adoption') {
          formattedPosts.push({
            id: postId, // Unique ID for the post
            name: petPosts[postId].name, // Pet's name
            breed: petPosts[postId].breed, // Pet's breed
            age: petPosts[postId].age, // Pet's age
            sex: petPosts[postId].sex, // Pet's sex
            weight: petPosts[postId].weight, // Pet's weight
            vaccinationDate: petPosts[postId].vaccinationDate, // Vaccination date
            totalVaccinations: petPosts[postId].totalVaccinations, // Total vaccinations
            vetDocuments: petPosts[postId].vetDocuments, // Documents related to vaccinations
            description: petPosts[postId].description, // Additional description about the pet
            location: petPosts[postId].location, // Location of the pet
            photo: petPosts[postId].photo, // URL of pet photo (assumed to be stored in Firebase Storage)
            category: petPosts[postId].category, // Owner of the pet
          });
        }
      }

      return res.status(200).json({ posts: formattedPosts });
    })
    .catch((error) => {
      return res.status(500).json({ error: 'Error retrieving adoption posts' });
    });
});



// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
