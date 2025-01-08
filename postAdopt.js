// Import the necessary Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4l9MAjo0nwg8svNH2nCe1amzsRnu11Lk",
  authDomain: "adopet-9b45a.firebaseapp.com",
  databaseURL: "https://adopet-9b45a-default-rtdb.firebaseio.com",
  projectId: "adopet-9b45a",
  storageBucket: "adopet-9b45a.firebaseapp.com",
  messagingSenderId: "528567839616",
  appId: "1:528567839616:web:def598f1423ef83ab6f65",
  measurementId: "G-GK1YF97X41"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Function to get input values
const getElementVal = (id) => {
  return document.getElementById(id).value;
};

// Function to handle form submission
const postPet = (e) => {
  e.preventDefault();

  // Collect form data
  const petPhoto = document.getElementById('petPhoto').files[0]?.name || "No photo uploaded";
  const petName = getElementVal('petName');
  const breed = getElementVal('breed');
  const age = getElementVal('age');
  const sex = getElementVal('sex');
  const weight = getElementVal('weight');
  const vaccinationDate = getElementVal('vaccinationDate');
  const totalVaccinations = getElementVal('totalVaccinations');
  const vetDocuments = document.getElementById('vetDocuments').files[0]?.name || "No documents uploaded";
  const description = getElementVal('description');
  const location = getElementVal('location');

  // Push data to Firebase
  const petRef = ref(database, "petForm");
  const newPetRef = push(petRef);

  set(newPetRef, {
    petPhoto: petPhoto,
    petName: petName,
    breed: breed,
    age: age,
    sex: sex,
    weight: weight,
    vaccinationDate: vaccinationDate,
    totalVaccinations: totalVaccinations,
    vetDocuments: vetDocuments,
    description: description,
    location: location
  })
    .then(() => {
      alert("Pet posted successfully!");
      window.location.href = "./project/index.html";

      // Reset the form
      document.getElementById('petForm').reset();
    })
    .catch((error) => {
      console.error("Error posting pet:", error);
      alert("Failed to post pet. Please try again.");
    });
};

// Add event listener to the form
document.getElementById('petForm').addEventListener('submit', postPet);
