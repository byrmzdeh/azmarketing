let allData = [];
let icurrentIndex = 8;

// JSON faylını yükləmək
fetch('/json/instructor.json')
    .then((res) => res.json())
    .then(data => {
        allData = data;
        displayCards(allData.slice(0, icurrentIndex)); // İlk 8 elementi göstəririk
    })
    .catch(error => console.error('api gelmedi', error));

// Kartları göstərən funksiyanı yazırıq
function displayCards(idata) {
    const cardsContainer = document.getElementById("icards");
    cardsContainer.innerHTML = ''; // Kartları təmizləyirik

    idata.forEach(item => {
        const card = `
         <div class="card" data-id="${item.id}">
             <div class="img">
                 <img src='${item.src}' alt="err">
             </div>
             <span>${item.title}</span>
             <h6>${item.name}</h6>
         </div>
        `;
        cardsContainer.innerHTML += card;
    });

    // Hər bir karta klik hadisəsi bağlayırıq
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', function (e) {
            const itemId = e.currentTarget.dataset.id; // Klik edilən kartın id-sini alırıq
            // window.location.href = `/components/instructorDetail.index.html?id=${itemId}`; // Detail səhifəsinə yönləndirilir
            window.location.href = `/components/instructorDetail/index.html?id=${itemId}`;

        });
    });
}

// "Load More" düyməsinin funksiyası
document.addEventListener('DOMContentLoaded', () => {
    const load = document.getElementById('load');
    if (load) {
        load.addEventListener('click', function () {
            displayCards(allData); // Bütün kartları göstəririk
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


