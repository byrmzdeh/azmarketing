function animateCounter(counterElement, targetNumber, duration) {
    let startTime = null;
    let currentNumber = 0;
  
    function updateCounter(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const increment = Math.min((progress / duration) * targetNumber, targetNumber);
  
      counterElement.textContent = Math.floor(increment) + "+"; // Rəqəmin yanına "+" əlavə edirik
  
      if (increment < targetNumber) {
        requestAnimationFrame(updateCounter);
      }
    }
  
    requestAnimationFrame(updateCounter);
  }
  
  //saygac
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counterElement = entry.target;
        const targetNumber = parseInt(counterElement.getAttribute('data-target'));
        animateCounter(counterElement, targetNumber, 2000); 
        observer.unobserve(entry.target); // Artıq müşahidəni dayandırırıq
      }
    });
  }, {
    threshold: 0.5
  });
  
  // Bütün sayğacları müşahidə etmək
  const counters = document.querySelectorAll('.counter');
  counters.forEach(counter => {
    observer.observe(counter);
  });
  


  /////form
  document.getElementById('myForm').addEventListener('submit', function (e) {
    e.preventDefault();
    
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    const errorMessage = document.getElementById('errorMessage');
    const thankYouModal = document.getElementById('thankYouModal');
    const modalOverlay = document.getElementById('modalOverlay');

    let errors = [];

    if (!firstName || !lastName || !phone || !email || !message) {
        errors.push('Xahiş edirik bütün xanalari doldurun.');
    }

    if (email && !email.includes('@')) {
        errors.push('Email daxilində @ olmalıdır.');
        document.getElementById('email').classList.add('input-error');
    } else {
        document.getElementById('email').classList.remove('input-error');
    }

    if (phone && !/^\d+$/.test(phone)) {
        errors.push('Telefon nömrəsi yalnız rəqəmlərdən ibarət olmalıdır.');
        document.getElementById('phone').classList.add('input-error');
    } else {
        document.getElementById('phone').classList.remove('input-error');
    }

    if (errors.length > 0) {
        errorMessage.textContent = errors.join(' ');
    } else {
        errorMessage.textContent = '';

        console.log('Form uğurla göndərildi!');

        thankYouModal.style.display = 'block';
        modalOverlay.style.display = 'block';

        sessionStorage.setItem('formSubmitted', 'true');

        setTimeout(function () {
            window.location.href = '/pages/contact/index.html';
        }, 2000);
    }
});



    function updateInput(select) {
        document.getElementById('lastName').value = select.value; 
    }