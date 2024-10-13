
// // JSON verilerini almak
// let categoriesData = [];
// let currentIndex = 8; // Başlangıçta göstereceğimiz kart sayısı

// fetch('/json/category.json') // JSON faylınızı düzgün yolda yerləşdirin
//   .then(res => res.json())
//   .then(data => {
//     categoriesData = data; // Verileri kaydediyoruz
//     displayCards(categoriesData.slice(0, currentIndex)); // İlk 8 kartı göstəririk
//   })
//   .catch(error => console.error('Veri alınırken hata oluştu:', error));

// // Kartları ekrana yazdıran fonksiyon
// function displayCards(filteredData) {
//   const cardsContainer = document.getElementById('cards');
//   cardsContainer.innerHTML = ''; // Mevcut kartları temizliyoruz

//   filteredData.forEach(item => {
//     const cardHTML = `
//       <div class="card" data-id="${item.id}">
//         <button class="basket_btn"><img width="38" class="basket" src="/image/home/basket.png"
//             alt="Basket"></button>
//         <img class="card_img" src="${item.src}" alt="${item.name}">
//         <p>${item.name}</p>
//         <h5>${item.title}</h5>
//         <div class="price">
//             <h6>${item.price}.00$</h6>
//             <button class="buy_btn">
//                 <span>Buy Now</span>
//                 <img width="10" src="/image/home/buyVector.png" alt="err">
//             </button>
//         </div>
//       </div>
//     `;
//     cardsContainer.innerHTML += cardHTML;
//   });

  
//   // Kartlara tıklanma olayı ekliyoruz
//   document.querySelectorAll('.card').forEach(card => {
//     card.addEventListener('click', (e) => {
//       const itemId = e.target.closest('.card').dataset.id;
//       window.location.href = `/components/categoryDetail/index.html?id=${itemId}`;
//     });
//   });
// }

// // "See All" düyməsinə klik eventi
// document.addEventListener('DOMContentLoaded', () => {
//   const seeAllButton = document.getElementById('seeAllButton');
//   if (seeAllButton) {
//     seeAllButton.addEventListener('click', () => {
//       displayCards(categoriesData); // Bütün kartları göstəririk
//       seeAllButton.style.display = 'none'; // "See All" düyməsini gizlədirik
//     });
//   }
// });

// // Kategori düymələrinə klik eventini əlavə etmək
// const buttons = document.querySelectorAll('.buttons button');
// buttons.forEach(button => {
//   button.addEventListener('click', () => {
//     buttons.forEach(btn => {
//       btn.style.backgroundColor = '';
//       btn.style.color = '';
//     });

//     button.style.backgroundColor = 'rgba(91, 88, 235, 1)';
//     button.style.color = 'white';

//     const category = button.textContent;

//     if (category === 'All categories') {
//       displayCards(categoriesData.slice(0, currentIndex));
//       seeAllButton.style.display = 'block';
//     } else {
//       const filteredData = categoriesData.filter(item => item.category === category);
//       displayCards(filteredData.slice(0, currentIndex));
//       seeAllButton.style.display = 'none';
//     }
//   });
// });


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



//footerForm
document.getElementById('footerForm').addEventListener('submit', function (e) {
  e.preventDefault()

  const mail = document.getElementById('emaill').value.trim()

  if (mail) {
    window.location.href='/pages/contact/index.html'
    
  }
})




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

// Sayfa yüklənəndə məlumatları yükləyin
document.addEventListener('DOMContentLoaded', () => {
  fetch('/json/category.json') // JSON fayl yolunu düzgün qeyd edin
    .then(res => res.json())
    .then(data => {
      categoriesData = data; // Verileri kaydediyoruz
      displayCards(categoriesData.slice(0, currentIndex)); // İlk 8 kartı göstəririk
    })
    .catch(error => console.error('Veri alınırken hata oluştu:', error));

  // "See All" düğmesine tıklama olayı
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
        displayCards(categoriesData.slice(0, currentIndex)); // İlk 8 kartı gösteriyoruz
        seeAllButton.style.display = 'block'; // "See All" düğmesini gösteriyoruz
      } else {
        const filteredData = categoriesData.filter(item => item.category === category);
        displayCards(filteredData.slice(0, currentIndex)); // Filtrelenmiş kartları gösteriyoruz
        seeAllButton.style.display = 'none'; // "See All" düğmesini gizliyoruz
      }
    });
  });
});
