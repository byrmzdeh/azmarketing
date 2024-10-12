//footerForm
document.getElementById('footerForm').addEventListener('submit', function (e) {
    e.preventDefault()
  
    const mail = document.getElementById('emaill').value.trim()
  
    if (mail) {
      window.location.href='/pages/contact/index.html'
      
    }
  })

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
