function animateCounter(counterElement, targetNumber, duration) {
  let startTime = null;
  let currentNumber = 0;

  function updateCounter(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = timestamp - startTime;
    const increment = Math.min((progress / duration) * targetNumber, targetNumber);

    counterElement.textContent = Math.floor(increment) + "+"; // Rəqəmin yanına "+" əlavə edirik

    if (increment < targetNumber) {
      requestAnimationFrame(updateCounter);
    }
  }

  requestAnimationFrame(updateCounter);
}

//saygac
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counterElement = entry.target;
      const targetNumber = parseInt(counterElement.getAttribute('data-target'));
      animateCounter(counterElement, targetNumber, 2000);
      observer.unobserve(entry.target); // Artıq müşahidəni dayandırırıq
    }
  });
}, {
  threshold: 0.5
});

// Bütün sayğacları müşahidə etmək
const counters = document.querySelectorAll('.counter');
counters.forEach(counter => {
  observer.observe(counter);
});



/////form
document.getElementById('myForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const firstName = document.getElementById('firstName').value.trim();
  const lastName = document.getElementById('lastName').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  const errorMessage = document.getElementById('errorMessage');
  const thankYouModal = document.getElementById('thankYouModal');
  const modalOverlay = document.getElementById('modalOverlay');

  let errors = [];

  if (!firstName || !lastName || !phone || !email || !message) {
    errors.push('Xahiş edirik bütün xanalari doldurun.');
  }

  if (email && !email.includes('@')) {
    errors.push('Email daxilində @ olmalıdır.');
    document.getElementById('email').classList.add('input-error');
  } else {
    document.getElementById('email').classList.remove('input-error');
  }

  if (phone && !/^\d+$/.test(phone)) {
    errors.push('Telefon nömrəsi yalnız rəqəmlərdən ibarət olmalıdır.');
    document.getElementById('phone').classList.add('input-error');
  } else {
    document.getElementById('phone').classList.remove('input-error');
  }

  if (errors.length > 0) {
    errorMessage.textContent = errors.join(' ');
  } else {
    errorMessage.textContent = '';

    console.log('Form uğurla göndərildi!');

    thankYouModal.style.display = 'block';
    modalOverlay.style.display = 'block';

    sessionStorage.setItem('formSubmitted', 'true');

    setTimeout(function () {
      window.location.href = '/pages/contact/index.html';
    }, 2000);
  }
});



function updateInput(select) {
  document.getElementById('lastName').value = select.value;
}



//api

let categoriesData = []; // To store all the data
let currentIndex = 12; // Number of cards to show initially

// Fetch JSON data
fetch('/json/category.json')
  .then(res => {
    if (!res.ok) {
      throw new Error('Network response was not ok ' + res.statusText);
    }
    return res.json();
  })
  .then(data => {
    categoriesData = data; // Save the data
    displayCards(categoriesData.slice(0, currentIndex)); // Display the first 12 cards
  })
  .catch(error => console.error('Error fetching data:', error));

// Function to display cards
function displayCards(filteredData) {
  const cardsContainer = document.getElementById('cards'); // Select the container
  cardsContainer.innerHTML = ''; // Clear the existing content

  // Loop through the filtered data and create card HTML for each item
  filteredData.forEach(item => {
    const cardHTML = `
      <div class="card">
        <button><img class="basket" src="/image/home/categoryBasket.png" alt="Basket"></button>
        <img class="card_img" src="${item.src}" alt="${item.name}">
        <p>${item.name}</p>
        <h5>${item.title}</h5>
        <div class="price">
          <h6>${item.price}</h6>
        </div>
      </div>
    `;

    cardsContainer.innerHTML += cardHTML; // Append the card HTML
  });

  // Add click event listeners to each card
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', (e) => {
      const itemName = e.target.closest('.card').querySelector('p').textContent;
      const itemId = categoriesData.find(item => item.name === itemName).id;
      window.location.href = `/components/categoryDetail/index.html?id=${itemId}`; // Redirect to the detail page
    });
  });
}

// Add click events to category buttons for filtering
const buttons = document.querySelectorAll('.buttons button');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    buttons.forEach(btn => {
      btn.style.backgroundColor = ''; // default rəngə qaytar
      btn.style.color = '';
      btn.style.border='' // default yazı rənginə qaytar
    });

    // Kliklənən butonun rəngini qırmızı edirik
    button.style.backgroundColor = 'rgba(91, 88, 235, 1)'; 
    button.style.color='white';
    button.style.border='none'

    const category = button.textContent; // Get the button text
    
    if (category === 'All categories') {
      // If 'All categories' is selected, display all items
      displayCards(categoriesData.slice(0, currentIndex));
    } else {
      // Filter the items based on the selected category
      const filteredData = categoriesData.filter(item => item.category === category);
      displayCards(filteredData.slice(0, currentIndex)); // Display the filtered items
    }
  });
});
