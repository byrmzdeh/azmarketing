// Instructor verilerini almak
let instructorData = [];
let currentInstructorIndex = 12; // Başlangıçta göstereceğimiz kart sayısı

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


// "Load More" düyməsinin funksiyası
document.addEventListener('DOMContentLoaded', () => {
    const load = document.getElementById('load');
    if (load) {
        load.addEventListener('click', function () {
            displayInstructorCards(instructorData); // Bütün kartları göstəririk
            load.style.display = 'none'; // Düyməni gizləyirik
        });
    }
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




// footerForm hadisəsi
document.getElementById('footerForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Formun göndərilməsinin qarşısını alırıq

    const mail = document.getElementById('emaill').value.trim(); // Emaili yoxlayırıq

    if (mail) {
        window.location.href = '/pages/contact/index.html'; // Əlaqə səhifəsinə yönləndiririk
    }
});


