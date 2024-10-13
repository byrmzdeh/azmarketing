
    ///////fourCards
  

    let categoriesData = [];
    let currentIndex = 4; // Başlangıçta göstereceğimiz kart sayısı
    
    // JSON verilerini almak
    fetch('/json/category.json') // JSON fayl yolunu düzgün qeyd edin
      .then(res => res.json())
      .then(datas => {
        categoriesData = datas; // Verileri kaydediyoruz
        displayCards(categoriesData.slice(0, currentIndex)); // İlk 8 kartı göstəririk
      })
      .catch(error => console.error('Veri alınırken hata oluştu:', error));
    
    // Kartları ekrana yazdıran fonksiyon
    function displayCards(filteredData) {
      const cardsContainer = document.getElementById('categoryCourse');
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
        .then(datas => {
          categoriesData = datas; // Verileri kaydediyoruz
          displayCards(categoriesData.slice(0, currentIndex)); // İlk 8 kartı göstəririk
        })
        .catch(error => console.error('Veri alınırken hata oluştu:', error));
    
    
    
    
    });
    