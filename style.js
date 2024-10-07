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

// JSON verilerini almak
let categoriesData = [];
let currentIndex = 8; // Başlangıçta göstereceğimiz kart sayısı

fetch('/json/category.json')
  .then(res => res.json())
  .then(data => {
    categoriesData = data; // Verileri kaydediyoruz
    displayCards(categoriesData.slice(0, currentIndex)); // İlk 8 kartı göstəririk
  })
  .catch(error => console.error('Veri alınırken hata oluştu:', error));

// Kartları ekrana yazdıran fonksiyon
function displayCards(filteredData) {
  const cardsContainer = document.getElementById('cards'); 
  cardsContainer.innerHTML = ''; // Mevcut kartları temizliyoruz

  filteredData.forEach(item => {
    const cardHTML = `
                 <div class="card">
                <button class="basket_btn"><img width="38" class="basket" src="/image/home/categoryBasket.png"
                        alt="Basket"></button>
                <img class="card_img" src="${item.src}" alt="${item.name}">
                <p>${item.name}</p>
                <h5>${item.title}</h5>
                <div class="price">
                    <h6>${item.price}.00$</h6>
                    <button class="buy_btn">
                        <span>Buy Now</span>
                        <img width="10" src="/image/home/buyVector.png" alt="err">
                    </button>
                </div>
            </div>
    `;
    cardsContainer.innerHTML += cardHTML;
  });

  // Kartlara tıklanma olayı ekliyoruz
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', (e) => {
      const itemName = e.target.closest('.card').querySelector('p').textContent;
      const itemId = categoriesData.find(item => item.name === itemName).id;
      window.location.href = `/components/categoryDetail/index.html?id=${itemId}`;
    });
  });
}

// "See All" butonuna tıklanma olayı
const seeAllButton = document.getElementById('seeAllButton');
seeAllButton.addEventListener('click', () => {
  displayCards(categoriesData); // Bütün kartları gösteriyoruz
  seeAllButton.style.display = 'none'; // "See All" butonunu gizləyirik
});

// Kategori butonlarına click event eklemek
const buttons = document.querySelectorAll('.buttons button');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    // Bütün butonların rəngini təmizləyirik
    buttons.forEach(btn => {
      btn.style.backgroundColor = ''; 
      btn.style.color = ''; 
    });

    // Kliklənən butonun rəngini qırmızı edirik
    button.style.backgroundColor = 'rgba(91, 88, 235, 1)';
    button.style.color = 'white'; 

    const category = button.textContent; 
    
    if (category === 'All categories') {
      // "All categories" seçildiyse tüm kartları gösteriyoruz
      displayCards(categoriesData.slice(0, currentIndex));
      seeAllButton.style.display = 'block'; // "See All" butonunu geri getiririk
    } else {
      // Seçilen kategoriye göre filtreleme yapıyoruz
      const filteredData = categoriesData.filter(item => item.category === category);
      displayCards(filteredData.slice(0, currentIndex)); // Filtrelenmiş veriyi gösteririk
      seeAllButton.style.display = 'none'; // Filtrede "See All" gizlənir
    }
  });
});
