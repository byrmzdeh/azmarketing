document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault()
  
    const name=document.getElementById('name').value.trim()
    const surname=document.getElementById('surname').value.trim()
    const email=document.getElementById('email').value.trim()
    const phone=document.getElementById('phone').value.trim()
    const message=document.getElementById('message').value.trim()
  
    const modal = document.getElementById('thankYouModal')
  
  
    if (name && surname && email && phone && message) {
      modal.style.display='block'
    
  
    }
    document.getElementById('closee').addEventListener('click',function () {
      modal.style.display='none'
            // Input dəyərlərini boşaldır
            document.getElementById('name').value = '';
            document.getElementById('surname').value = '';
            document.getElementById('email').value = '';
            document.getElementById('phone').value = '';
            document.getElementById('message').value=''
            window.location.href='/index.html'
    
      
    })
  
    
  })
  

  document.getElementById('footerForm').addEventListener('submit', function (e) {
    e.preventDefault()
  
    const mail = document.getElementById('emaill').value.trim()
  
    if (mail) {
      window,location.href='/pages/contact/index.html'
      
    }
  })
  
  
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
