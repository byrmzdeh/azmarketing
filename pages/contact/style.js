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
    document.getElementById('close').addEventListener('click',function () {
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
  