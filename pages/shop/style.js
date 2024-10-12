//footerForm
document.getElementById('footerForm').addEventListener('submit', function (e) {
    e.preventDefault()
  
    const mail = document.getElementById('emaill').value.trim()
  
    if (mail) {
      window.location.href='/pages/contact/index.html'
      
    }
  })