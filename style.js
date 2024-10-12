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
  e.preventDefault()

  const surname = document.getElementById('firstName').value.trim()
  const email = document.getElementById('email').value.trim()
  const phone = document.getElementById('phone').value.trim()
  const message = document.getElementById('message').value.trim()
  const selectedCourse = document.getElementById('selectedCourse').value.trim()


  const modal = document.getElementById('thankYouModal')


  if (surname && email && phone && message && selectedCourse) {
    modal.style.display = 'block'


  }
  document.getElementById('close').addEventListener('click', function () {
    modal.style.display = 'none'
    // Input dəyərlərini boşaldır
    modal.style.display = 'none'; // Modalı gizlədin
    // Daxil edilən dəyərləri sıfırlayın
    document.getElementById('firstName').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('message').value = '';
    document.getElementById('selectedCourse').value = '';
    window.location.href = '/pages/contact/index.html'; // Səhifə yönləndirməsi


  })


})

function updateInput(select) {
  document.getElementById('lastName').value = select.value;
}



//api
// categoriesData verilerini almak
let categoriesData = [];
let currentCategoryIndex = 8; // Başlangıçta göstereceğimiz kart sayısı

fetch('/json/category.json') // JSON dosyasının doğru yolunu belirtin
  .then(res => res.json())
  .then(data => {
    categoriesData = data; // Verileri kaydediyoruz
    displayCategoryCards(categoriesData.slice(0, currentCategoryIndex)); // İlk 8 kartı gösteriyoruz
  })
  .catch(error => console.error('Veri alınırken hata oluştu:', error));

// Kartları ekrana yazdıran fonksiyon (kategori kartları için)
function displayCategoryCards(filteredData) {
  const cardsContainer = document.getElementById('cards');
  cardsContainer.innerHTML = ''; // Mevcut kartları temizliyoruz

  filteredData.forEach(item => {
    const cardHTML = `
      <div class="card" data-id="${item.id}">
        <button class="basket_btn"><img width="38" class="basket" src="/image/home/basket.png"
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
      const itemId = e.target.closest('.card').dataset.id;
      window.location.href = `/components/categoryDetail/index.html?id=${itemId}`;
    });
  });
}

// "See All" düğmesine tıklama olayı
document.addEventListener('DOMContentLoaded', () => {
  const seeAllButton = document.getElementById('seeAllButton');
  if (seeAllButton) {
    seeAllButton.addEventListener('click', () => {
      displayCategoryCards(categoriesData); // Tüm kartları gösteriyoruz
      seeAllButton.style.display = 'none'; // "See All" düğmesini gizliyoruz
    });
  }
});

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
      displayCategoryCards(categoriesData.slice(0, currentCategoryIndex));
      seeAllButton.style.display = 'block';
    } else {
      const filteredData = categoriesData.filter(item => item.category === category);
      displayCategoryCards(filteredData.slice(0, currentCategoryIndex));
      seeAllButton.style.display = 'none';
    }
  });
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

function selectCourse(checkbox) {
  const selectedCourseInput = document.getElementById('selectedCourse');
  const checkboxes = document.querySelectorAll('.select-options input[type="checkbox"]');

  // Bütün checkboxları deaktiv et
  checkboxes.forEach(cb => {
    if (cb !== checkbox) {
      cb.checked = false;
    }
  });

  // Seçilmiş checkboxın dəyərini input-a yaz
  if (checkbox.checked) {
    selectedCourseInput.value = checkbox.value;
  } else {
    selectedCourseInput.value = '';
  }

  // Seçim etdikdən sonra dropdown bağlanır və ox geri aşağı yönə dəyişir
  const dropdown = document.querySelector('.custom-select');
  const dropdownIcon = document.getElementById('dropdownIcon');

  dropdown.classList.remove('active');
  dropdownIcon.classList.remove('arrow-up');
  dropdownIcon.classList.add('arrow-down');
  document.querySelector('.select-options').style.display = 'none';
}

// Dropdown qutusundan kənara klik ediləndə bağlanması
document.addEventListener('click', function (event) {
  const dropdown = document.querySelector('.custom-select');
  const dropdownIcon = document.getElementById('dropdownIcon');

  if (!dropdown.contains(event.target)) {
    dropdown.classList.remove('active');
    dropdownIcon.classList.remove('arrow-up');
    dropdownIcon.classList.add('arrow-down');
    document.querySelector('.select-options').style.display = 'none';
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















/////Slider/////////
const slider = document.querySelector('.slider');
const dots = document.querySelectorAll('.dot');
let currentIndexx = 0; // Hal-hazırda görünən cardların indeksi

// Slideri çəkmək funksiyası
function updateSlider() {
    const offset = -currentIndexx * (100 / 2); // 2 nöqtə üçün hər biri 5 card
    slider.style.transform = `translateX(${offset}%)`;
    updateDots();
}

// Nöqtələri güncəlləmək funksiyası
function updateDots() {
    dots.forEach((dot, index) => {
        dot.classList.remove('active');
        if (index === currentIndexx) {
            dot.classList.add('active');
        }
    });
}




// Nöqtələrə klik edildikdə
dots.forEach(dot => {
  dot.addEventListener('click', () => {
      currentIndexx = parseInt(dot.getAttribute('data-index')); // Burada currentIndexi düzgün güncəlləyirik
      updateSlider();
  });
});

// Slider avtomatik olaraq hər 5 saniyədən bir dəyişir
setInterval(() => {
    currentIndexx = (currentIndexx + 1) % dots.length; // Dairəvi dövr
    updateSlider();
}, 5000);

// İlk dəfə göstər
updateSlider();



