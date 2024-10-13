// footerForm
document.getElementById('footerForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const mail = document.getElementById('emaill').value.trim();

  if (mail) {
    window.location.href = '/pages/contact/index.html';
  }
});



document.addEventListener('DOMContentLoaded', () => {
  const shopContainer = document.getElementById('shop-items');
  let shopItems = JSON.parse(localStorage.getItem('shopItems')) || [];

  // Shop səhifəsində saxlanılan kartları göstərmək
  function renderShopItems() {
    shopContainer.innerHTML = ''; // Mövcud kartları təmizləyirik

    if (shopItems.length > 0) {
      shopItems.forEach(item => {
        const cardHTML = `
          <div class="card" data-id="${item.id}">
            <button class="basket_btn">
              <img width="38" class="basket_image" src="/image/home/shopBasket.png">
            </button>
            <img width='100' class="card_img" src="${item.src}" alt="${item.name}">
            <p>${item.name}</p>
            <h5>${item.title}</h5>
            <div class="price">
              <h6>${item.price}.00$</h6>
              <button class="remove_btn" data-id="${item.id}">
                <span>Remove</span>
              </button>
            </div>
          </div>
        `;
        shopContainer.innerHTML += cardHTML; // Yalnız bir dəfə kart əlavə edirik
      });

      // "Remove" düyməsinə klik etdikdə kartı silən funksiya
      document.querySelectorAll('.remove_btn').forEach(button => {
        button.addEventListener('click', (e) => {
          e.stopPropagation(); // Hadisənin yayılmasını dayandırır

          const cardId = e.target.closest('.remove_btn').dataset.id; // Kartın ID-sini götürürük
          removeFromLocalStorage(cardId);
          renderShopItems(); // Kartı siləndən sonra yenidən render etmək
        });
      });
    } else {
      // Kartlar yoxdursa, "Shopping Cart Empty" mesajını göstər
      shopContainer.innerHTML = `
        <div class="empty">
          <div class="shopping_card">
            <h4>Shopping Cart</h4>
          </div>
          <div class="empty_png">
            <img src="/image/home/empty.png" alt="err">
            <h4>Shopping Cart Empty</h4>
          </div>
        </div>
      `;
    }

    // Kartların şəkilinə klik edəndə detal səhifəsinə yönləndirmə
    document.querySelectorAll('.card').forEach(card => {
      card.addEventListener('click', (e) => {
        const itemId = e.currentTarget.dataset.id; // Kartın ID-sini alırıq
        window.location.href = `/components/categoryDetail/index.html?id=${itemId}`; // Detail səhifəsinə yönlendiririk
      });
    });
  }

  // `localStorage`-dan kartı silən funksiya
  function removeFromLocalStorage(id) {
    shopItems = shopItems.filter(item => item.id !== id); // ID ilə kartı filter edərək silirik
    localStorage.setItem('shopItems', JSON.stringify(shopItems)); // Dəyişiklikləri `localStorage`-a qeyd edirik
  }

  renderShopItems(); // Kartları render edirik
});
