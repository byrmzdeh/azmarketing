//responsiveNavbar
const menuButton = document.getElementById('menuButton');
const menu = document.getElementById('menu');
const close = document.getElementById('close');

menuButton.addEventListener('click', () => {
    menu.classList.toggle('open'); // Menü açık veya kapalı olacak şekilde sınıfı değiştir
});

close.addEventListener('click', () => {
  menu.classList.remove('open'); // Menü açık veya kapalı olacak şekilde sınıfı değiştir
});




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



/////homeForm
document.getElementById('myForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const surname = document.getElementById('firstName').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const message = document.getElementById('message').value.trim();
  const selectedCourse = document.getElementById('selectedCourse').value.trim();

  const modal = document.getElementById('thankYouModal');

  // Check if all required fields have values
  if (surname && email && phone && message && selectedCourse) {
      modal.style.display = 'block'; // Show the modal
  }

  // Close button logic
  document.getElementById('closee').addEventListener('click', function () {
      modal.style.display = 'none'; // Hide the modal

      // Reset input values after closing the modal
      document.getElementById('firstName').value = '';
      document.getElementById('email').value = '';
      document.getElementById('phone').value = '';
      document.getElementById('message').value = '';
      document.getElementById('selectedCourse').value = '';
      // No redirection to the contact page
      window.location.href='/pages/contact/index.html'
  });
});

// Function to update input field with selected value
function updateInput(select) {
  document.getElementById('lastName').value = select.value;
}



//api
let categoriesData = [];
let currentIndex = 8; // Başlangıçta göstereceğimiz kart sayısı

// JSON verilerini almak
fetch('/json/category.json') // JSON fayl yolunu düzgün qeyd edin
  .then(res => res.json())
  .then(data => {
    categoriesData = data; // Verileri kaydediyoruz
    displayCards(categoriesData.slice(0, currentIndex)); // İlk 8 kartı göstəririk
  })
  .catch(error => console.error('Veri alınırken hata oluştu:', error));

// Kartları ekrana yazdıran fonksiyon
function displayCards(filteredData) {
  const cardsContainer = document.getElementById('cards');
  cardsContainer.innerHTML = ''; // Mövcud kartları təmizləyirik

  filteredData.forEach(item => {
    const isInShop = isItemInLocalStorage(item.id); // Kart artıq localStorage-dadırmı?

    const cardHTML = `
      <div class="card" data-id="${item.id}">
        <button class="basket_btn">
          <img width="38" class="basket_image" src="${isInShop ? '/image/home/shopBasket.png' : '/image/home/basket.png'}">
        </button>
        <img class="card_img" src="${item.src}" alt="${item.name}">
        <p>${item.name}</p>
        <h5>${item.title}</h5>
        <div class="price">
          <h6>${item.price}.00$</h6>
          <button class="buy_btn" data-bought="${isInShop}">
            <span>${isInShop ? 'Remove' : 'Buy Now'}</span>
            <img width="10" src="/image/home/buyVector.png" alt="err">
          </button>
        </div>
      </div>
    `;
    cardsContainer.innerHTML += cardHTML;
  });

  // "Buy Now" düyməsinə klik edəndə işə düşən funksionallıq
  document.querySelectorAll('.buy_btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const buyButton = e.target.closest('.buy_btn');
      const cardElement = buyButton.closest('.card');
      const cardId = cardElement.dataset.id;

      if (buyButton.getAttribute('data-bought') === 'false') {
        // Kartı shop-a əlavə et
        const selectedItem = categoriesData.find(item => item.id === cardId);
        saveToLocalStorage(selectedItem);

        // İkonu anında dəyişdir
        const basketImage = cardElement.querySelector('.basket_image');
        basketImage.src = '/image/home/shopBasket.png';

        // Düyməni dəyişdir
        buyButton.innerHTML = '<span>Remove</span>'; // Düzgün yazı
        buyButton.setAttribute('data-bought', 'true');
      } else {
        // Kartı shop-dan sil
        removeFromLocalStorage(cardId);

        // İkonu anında dəyişdir
        const basketImage = cardElement.querySelector('.basket_image');
        basketImage.src = '/image/home/basket.png';

        // Düyməni geri "Buy Now" olaraq dəyişdir
        buyButton.innerHTML = '<span>Buy Now</span>'; // Düzgün yazı
        buyButton.setAttribute('data-bought', 'false');
      }
    });
  });

  // Kartları tıklayınca detay sayfasına yönlendirme
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', (e) => {
      const itemId = e.target.closest('.card').dataset.id;
      window.location.href = `/components/categoryDetail/index.html?id=${itemId}`;
    });
  });
}

// `localStorage`-dan məlumatları almaq və yoxlamaq
function isItemInLocalStorage(id) {
  const shopItems = JSON.parse(localStorage.getItem('shopItems')) || [];
  return shopItems.some(item => item.id === id); // Kartın `id`-si `localStorage`-da varmı?
}

// Kartı `localStorage`-a yazan funksiya
function saveToLocalStorage(item) {
  let shopItems = JSON.parse(localStorage.getItem('shopItems')) || [];
  shopItems.push(item);
  localStorage.setItem('shopItems', JSON.stringify(shopItems));
}

// Kartı `localStorage`-dan silən funksiya
function removeFromLocalStorage(id) {
  let shopItems = JSON.parse(localStorage.getItem('shopItems')) || [];
  shopItems = shopItems.filter(item => item.id !== id);
  localStorage.setItem('shopItems', JSON.stringify(shopItems));
}

// "See All" düğmesine tıklama olayı
document.addEventListener('DOMContentLoaded', () => {
  const seeAllButton = document.getElementById('seeAllButton');
  if (seeAllButton) {
    seeAllButton.addEventListener('click', () => {
      displayCards(categoriesData); // Tüm kartları gösteriyoruz
      seeAllButton.style.display = 'none'; // "See All" düğmesini gizliyoruz
    });
  }

  // Kategori düğmelerine tıklama olayını eklemek
  const categoryButtons = document.querySelectorAll('.buttons button');
  categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
      categoryButtons.forEach(btn => {
        btn.style.backgroundColor = '';
        btn.style.color = '';
      });

      button.style.backgroundColor = 'rgba(91, 88, 235, 1)';
      button.style.color = 'white';

      const category = button.textContent;

      if (category === 'All categories') {
        displayCards(categoriesData.slice(0, currentIndex));
        seeAllButton.style.display = 'block';
      } else {
        const filteredData = categoriesData.filter(item => item.category === category);
        displayCards(filteredData.slice(0, currentIndex));
        seeAllButton.style.display = 'none';
      }
    });
  });

  window.onload = () => {
    const allCategoriesButton = document.querySelector('.all');
    allCategoriesButton.style.backgroundColor = 'rgba(91, 88, 235, 1)';
    allCategoriesButton.style.color = 'white';
  };
  
});


// Instructor verilerini almak
let instructorData = [];
let currentInstructorIndex = 3; // Başlangıçta göstereceğimiz kart sayısı

fetch('/json/instructor.json')
  .then(res => res.json())
  .then(data => {
    instructorData = data;
    displayInstructorCards(instructorData.slice(0, currentInstructorIndex)); // İlk 3 kartı gösteriyoruz
  })
  .catch(error => console.error('Veri alınırken hata oluştu:', error));

// Kartları ekrana yazdıran fonksiyon (eğitmen kartları için)
function displayInstructorCards(filteredData) {
  const cardsContainer = document.getElementById("icardss");
  cardsContainer.innerHTML = ''; // Mevcut kartları temizliyoruz

  filteredData.forEach(item => {
    const cardHTML = `
      <div class="icard" data-id="${item.id}">
        <div class="img">
          <img src="${item.src}" alt="err">
        </div>
        <span>${item.title}</span>
        <h6>${item.name}</h6>
      </div>
    `;
    cardsContainer.innerHTML += cardHTML;
  });

  // Kartlara tıklanma olayı ekliyoruz
  document.querySelectorAll('.icard').forEach(card => {
    card.addEventListener('click', function (e) {
      const itemId = e.currentTarget.dataset.id; // Tıklanan kartın id'sini alıyoruz
      window.location.href = `/components/instructorDetail/index.html?id=${itemId}`; // Detay sayfasına yönlendiriyoruz
    });
  });
}





//footerForm
document.getElementById('footerForm').addEventListener('submit', function (e) {
  e.preventDefault()

  const mail = document.getElementById('emaill').value.trim()

  if (mail) {
    window,location.href='/pages/contact/index.html'
    
  }
})








//Choose a course
function toggleDropdown() {
  const dropdown = document.querySelector('.custom-select');
  const dropdownIcon = document.getElementById('dropdownIcon');

  // Dropdown açılıbsa bağlanır, bağlıdırsa açılır
  dropdown.classList.toggle('active');

  // Oxun yönünü dəyiş
  if (dropdown.classList.contains('active')) {
    dropdownIcon.classList.remove('arrow-down');
    dropdownIcon.classList.add('arrow-up');
    document.querySelector('.select-options').style.display = 'block';
  } else {
    dropdownIcon.classList.remove('arrow-up');
    dropdownIcon.classList.add('arrow-down');
    document.querySelector('.select-options').style.display = 'none';
  }
}
// Function to select a course when a checkbox is clicked
function selectCourse(checkbox) {
  const selectedCourseInput = document.getElementById('selectedCourse');
  const checkboxes = document.querySelectorAll('.select-options input[type="checkbox"]');

  // Uncheck all other checkboxes
  checkboxes.forEach(cb => {
    if (cb !== checkbox) {
      cb.checked = false;
    }
  });

  // Set the selected course value based on the clicked checkbox
  if (checkbox.checked) {
    selectedCourseInput.value = checkbox.value;
  } else {
    selectedCourseInput.value = '';
  }

  // Close the dropdown and change the icon after selection
  const dropdown = document.querySelector('.custom-select');
  const dropdownIcon = document.getElementById('dropdownIcon');

  dropdown.classList.remove('active');
  dropdownIcon.classList.remove('arrow-up');
  dropdownIcon.classList.add('arrow-down');
  document.querySelector('.select-options').style.display = 'none'; // Hide options after selecting
}

// Dropdown click to toggle the visibility of checkboxes
document.querySelector('.custom-select').addEventListener('click', function () {
  const dropdown = this;
  const dropdownIcon = document.getElementById('dropdownIcon');
  const selectOptions = document.querySelector('.select-options');

  // Toggle visibility of the dropdown
  if (selectOptions.style.display === 'none') {
    selectOptions.style.display = 'block'; // Show options
    dropdownIcon.classList.remove('arrow-down');
    dropdownIcon.classList.add('arrow-up');
  } else {
    selectOptions.style.display = 'none'; // Hide options
    dropdownIcon.classList.remove('arrow-up');
    dropdownIcon.classList.add('arrow-down');
  }
});

// Close the dropdown if clicking outside
document.addEventListener('click', function (event) {
  const dropdown = document.querySelector('.custom-select');
  const dropdownIcon = document.getElementById('dropdownIcon');

  if (!dropdown.contains(event.target)) {
    dropdown.classList.remove('active');
    dropdownIcon.classList.remove('arrow-up');
    dropdownIcon.classList.add('arrow-down');
    document.querySelector('.select-options').style.display = 'none'; // Hide options if clicking outside
  }
});








//faq
function toggleAnswer(element) {
  const answer = element.nextElementSibling;
  const icon = element.querySelector(".faq-icon");

  if (answer.style.display === "block") {
    answer.style.display = "none";
    icon.textContent = "+";
  } else {
    answer.style.display = "block";
    icon.textContent = "-";
  }
}







