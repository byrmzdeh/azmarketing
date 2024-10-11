
// JSON verilerini almak
let categoriesData = [];
let currentIndex = 8; // Başlangıçta göstereceğimiz kart sayısı

fetch('/json/category.json') // JSON faylınızı düzgün yolda yerləşdirin
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

// "See All" düyməsinə klik eventi
document.addEventListener('DOMContentLoaded', () => {
  const seeAllButton = document.getElementById('seeAllButton');
  if (seeAllButton) {
    seeAllButton.addEventListener('click', () => {
      displayCards(categoriesData); // Bütün kartları göstəririk
      seeAllButton.style.display = 'none'; // "See All" düyməsini gizlədirik
    });
  }
});

// Kategori düymələrinə klik eventini əlavə etmək
const buttons = document.querySelectorAll('.buttons button');
buttons.forEach(button => {
  button.addEventListener('click', () => {
    buttons.forEach(btn => {
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

