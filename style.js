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
let categoriesData = []; // Tüm verileri saklamak için
let currentIndex = 12; // Başlangıçta göstereceğimiz kart sayısı

// JSON verilerini almak
fetch('/json/category.json')
  .then(res => res.json())
  .then(data => {
    categoriesData = data; // Verileri kaydediyoruz
    displayCards(categoriesData.slice(0, currentIndex)); // İlk 8 kartı gösteriyoruz
  })
  .catch(error => console.error('Veri alınırken hata oluştu:', error));

// Kartları ekrana yazdıran fonksiyon
function displayCards(filteredData) {
  const cardsContainer = document.getElementById('cards'); // Container'i seçiyoruz
  cardsContainer.innerHTML = ''; // Önce mevcut içerikleri temizliyoruz

  filteredData.forEach(item => {
    // Her veri için yeni bir card elementi oluşturuyoruz
    const card = document.createElement('div');
    card.classList.add('card');

    // Görsel oluşturma
    const image = document.createElement('img');
    image.src = item.src; // JSON dosyasındaki src alanı
    image.alt = item.name;

    // Açıklama oluşturma
    const description = document.createElement('p');
    description.textContent = item.name;

    // Başlık oluşturma
    const name = document.createElement('h5');
    name.textContent = item.title;

    
    // Başlık oluşturma
    const price = document.createElement('h6');
    price.textContent = item.price;

    // Kartın tıklanma olayını ekliyoruz
    card.addEventListener('click', () => {
      window.location.href = `/components/categoryDetail/index.html?id=${item.id}`; // Detail sayfasına yönlendiriyoruz
    });

    // Elemanları karta ekliyoruz
    card.appendChild(image);
    card.appendChild(description);
    card.appendChild(name);
    card.appendChild(price);

    // Kartı ana container'a ekliyoruz
    cardsContainer.appendChild(card);
  });
}

// Kategori butonlarına click event eklemek
const buttons = document.querySelectorAll('.buttons button');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const category = button.textContent; // Butonun içindeki yazıyı alıyoruz
    
    if (category === 'All categories') {
      // Eğer 'All categories' seçildiyse tüm verileri göster
      displayCards(categoriesData.slice(0, currentIndex));
    } else {
      // Seçilen kategoriye göre filtreleme
      const filteredData = categoriesData.filter(item => item.category === category);
      displayCards(filteredData.slice(0, currentIndex)); // Filtrelenen veriyi gösteriyoruz
    }
  });
});
