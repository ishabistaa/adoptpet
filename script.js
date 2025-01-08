// Sample pet data
const pets = {
    adoption: [
        {
            id: 1,
            name: 'Max',
            type: 'Dog',
            breed: 'Golden Retriever',
            age: '2 years',
            image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            description: 'Friendly and energetic Golden Retriever looking for a loving home.',
            owner: 'John Doe',
            location: 'New York, NY'
        },
        {
            id: 2,
            name: 'Luna',
            type: 'Cat',
            breed: 'Persian',
            age: '1 year',
            image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            description: 'Sweet Persian cat who loves cuddles and playtime.',
            owner: 'Jane Smith',
            location: 'Los Angeles, CA'
        }
    ],
    sales: [
        {
            id: 3,
            name: 'Rocky',
            type: 'Dog',
            breed: 'French Bulldog',
            age: '3 months',
            price: 2500,
            image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            description: 'Purebred French Bulldog puppy with great temperament.',
            owner: 'Pet Haven Store',
            location: 'Chicago, IL'
        },
        {
            id: 4,
            name: 'Milo',
            type: 'Cat',
            breed: 'Bengal',
            age: '6 months',
            price: 1800,
            image: 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            description: 'Beautiful Bengal kitten with stunning markings.',
            owner: 'Exotic Pets Co.',
            location: 'Miami, FL'
        }
    ]
};

// DOM Elements
const adoptionGrid = document.getElementById('adoptionGrid');
const salesGrid = document.getElementById('salesGrid');
const petModalAdopt = document.getElementById('petModalAdopt');
const petModalSale = document.getElementById('petModalSale');
const chatModal = document.getElementById('chatModal');
const loginModal = document.getElementById('loginModal');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

// Toggle mobile menu
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Create pet cards
function createPetCard(pet, type) {
    const card = document.createElement('div');
    card.className = 'pet-card';
    card.innerHTML = `
        <img src="${pet.image}" alt="${pet.name}" class="pet-image">
        <div class="pet-info">
            <h3>${pet.name}</h3>
            <p>${pet.breed} • ${pet.age}</p>
            ${type === 'sales' ? `<p class="pet-price">$${pet.price}</p>` : ''}
            <p>${pet.location}</p>
        </div>
    `;
    card.addEventListener('click', () => showPetDetails(pet, type));
    return card;
}

// Display pet details in modal for Adoption or Sale
function showPetDetails(pet, type) {
    const petDetailsAdopt = document.getElementById('petDetailsAdopt');
    const petDetailsSale = document.getElementById('petDetailsSale');
    const modalAdopt = document.getElementById('petModalAdopt');
    const modalSale = document.getElementById('petModalSale');
    
    if (type === 'adoption') {
        petDetailsAdopt.innerHTML = `
            <img src="${pet.image}" alt="${pet.name}" style="width: 100%; border-radius: 10px;">
            <h2>${pet.name}</h2>
            <p><strong>Type:</strong> ${pet.type}</p>
            <p><strong>Breed:</strong> ${pet.breed}</p>
            <p><strong>Age:</strong> ${pet.age}</p>
            <p><strong>Location:</strong> ${pet.location}</p>
            <p><strong>Owner:</strong> ${pet.owner}</p>
            <p><strong>Description:</strong> ${pet.description}</p>
            <button id="adoptNowButton">Adopt Now</button>
        `;
        modalAdopt.style.display = 'block';

        document.getElementById('adoptNowButton').addEventListener('click', () => {
            localStorage.setItem('selectedPet', JSON.stringify(pet));
            window.location.href = 'adoptionConfirmation.html'; // Update with the correct URL of your form
        });
    } else if (type === 'sales') {
        petDetailsSale.innerHTML = `
            <img src="${pet.image}" alt="${pet.name}" style="width: 100%; border-radius: 10px;">
            <h2>${pet.name}</h2>
            <p><strong>Type:</strong> ${pet.type}</p>
            <p><strong>Breed:</strong> ${pet.breed}</p>
            <p><strong>Age:</strong> ${pet.age}</p>
            <p><strong>Price:</strong> $${pet.price}</p>
            <p><strong>Location:</strong> ${pet.location}</p>
            <p><strong>Owner:</strong> ${pet.owner}</p>
            <p><strong>Description:</strong> ${pet.description}</p>
        `;
        modalSale.style.display = 'block';
    }
}

// Initialize pet listings
function initializePetListings() {
    pets.adoption.forEach(pet => {
        adoptionGrid.appendChild(createPetCard(pet, 'adoption'));
    });
    pets.sales.forEach(pet => {
        salesGrid.appendChild(createPetCard(pet, 'sales'));
    });
}

// Chat functionality
document.querySelectorAll('.chat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        petModalAdopt.style.display = 'none';
        petModalSale.style.display = 'none';
        chatModal.style.display = 'block';
    });
});

// Modal close buttons
document.querySelectorAll('.close').forEach(closeBtn => {
    closeBtn.addEventListener('click', (e) => {
        e.target.closest('.modal').style.display = 'none';
    });
});

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
    }
});

// Login button
document.getElementById('loginBtn').addEventListener('click', () => {
    loginModal.style.display = 'block';
});

// Initialize the website
initializePetListings();

// Send message functionality
document.getElementById('sendMessage').addEventListener('click', () => {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();
    
    if (message) {
        const chatMessages = document.getElementById('chatMessages');
        const messageElement = document.createElement('div');
        messageElement.style.marginBottom = '10px';
        messageElement.innerHTML = `<strong>You:</strong> ${message}`;
        chatMessages.appendChild(messageElement);
        messageInput.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
});

