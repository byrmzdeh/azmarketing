// URL'den id parametresini al
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

// JSON verisini almaq
fetch('/json/category.json') // JSON fayl yolunu düzgün təyin edin
    .then(res => res.json())
    .then(data => {
        const item = data.find(item => item.id === id); // Seçilen kartı tapırıq
        const detailContainer = document.getElementById('detaill');

        // Eğer kart varsa, detayları göstəririk
        if (item) {
            detailContainer.innerHTML = `
                <div class="title">
                    <h4>Introduction Web Design with HTML</h4>
                    <div class="categoryy">
                        <button>${item.category}</button>
                        <div class="students">
                            <img width="17" src="/image/home/detailUser.png" alt="">
                            <span>${item.view} students enrolled</span>
                        </div>
                    </div>
                    <img class='detail_img' src="${item.imgDetail}" alt="">
                    <div class="desc">
                        <h5>Course Description</h5>
                        <p>${item.description}</p>
                        <div class="desc_time">
                            <div class="time_one">
                                <div class="time">
                                    <img width="17" src="/image/home/detailVector.png" alt="">
                                    <span>${item.video}</span>
                                </div>
                                <div class="time">
                                    <img width="17" src="/image/home/detailVector.png" alt="">
                                    <span>${item.resources}</span>
                                </div>
                                <div class="time">
                                    <img width="17" src="/image/home/detailVector.png" alt="">
                                    <span>${item.access}</span>
                                </div>
                                <div class="time">
                                    <img width="17" src="/image/home/detailVector.png" alt="">
                                    <span>${item.accessTwo}</span>
                                </div>
                                <div class="time">
                                    <img width="17" src="/image/home/detailVector.png" alt="">
                                    <span>${item.certificate}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="cards_detail">
                    <div class="instructorr">
                        <img width="60" src="/image/home/instructor.png" alt="err">
                        <div class="name">
                            <h5>Name Surname</h5>
                            <span>Instructor</span>
                        </div>
                    </div>
                    <div class="includes">
                        <h5>Includes</h5>
                        <div class="time_one">
                            <div class="time">
                                <img width="17" src="/image/home/detailVector.png" alt="">
                                <span>${item.video}</span>
                            </div>
                            <div class="time">
                                <img width="17" src="/image/home/detailVector.png" alt="">
                                <span>${item.resources}</span>
                            </div>
                            <div class="time">
                                <img width="17" src="/image/home/detailVector.png" alt="">
                                <span>${item.access}</span>
                            </div>
                            <div class="time">
                                <img width="17" src="/image/home/detailVector.png" alt="">
                                <span>${item.accessTwo}</span>
                            </div>
                            <div class="time">
                                <img width="17" src="/image/home/detailVector.png" alt="">
                                <span>${item.certificate}</span>
                            </div>
                        </div>
                        <div class="buy">
                            <div class="price">
                                <p>Price</p>
                                <h5>${item.price}$</h5>
                            </div>
                            <div class="buy_btn">
                                <button  id="buyNowBtn">
                                    <span>Buy now</span>
                                    <img src="/image/home/arrow.png" alt="">
                                </button>
                               <img id='detailShopp' class='shopBasket' src="/image/home/categoryBasket.png" alt="">
                            </div>
                        </div>
<div id="formContainer" class="form-container" style="display: none;">
  <form id="buyForm">
    <h6>Card Details</h6>
    <div class="mail">
      <label for="email">E-MAIL</label>
      <input type="email" id="email" name="email" placeholder='E-mail' required>
    </div>
    <div class="card_detail">
      <div class="card_name">
        <label for="cardName">CARD NAME</label>
        <input type="text" id="cardName" name="cardName" placeholder="Name Surname" required>
      </div>
      <div class="card_number">
        <label for="cardNumber">CARD NUMBER</label>
        <input type="text" id="cardNumber" name="cardNumber" placeholder="000" maxlength="3" required>
      </div>
      <div class="card_name">
        <label for="cardNumber2">CARD NUMBER</label>
        <input type="text" id="cardNumber2" name="cardNumber2" placeholder="0000 0000 0000 0000"  maxlength="16" required>
      </div>
      <div class="card_number">
        <label for="cardCvv">CVV</label>
        <input type="text" id="cardCvv" name="cardCVV" placeholder="000"  maxlength="3" required>
      </div>
    </div>
    <div class="code">
      <label for="code">DISCOUNT CODE</label>
<input type="text" id="code" name="code" placeholder="0000 0000 0000" maxlength="9"  required>
    </div>
    <button id='submitButton' type="submit">Confirm Payment</button>
  </form>

  <div id="thankModalDetail" style="display:none;">
    <p id="closeDetail">X</p>
    <h5>Payment confirmed</h5>
    <p>Thank you for your purchase. All the <br> information about your purchase has been sent <br> to your e-mail address.</p>
    <div class="modalButtons">
      <button class='detailHome'><a href="/index.html">Home Page</a></button>
      <button class='detailDash'><a href="/components/dashboard/index.html">Go Profile</a></button>
    </div>
  </div>
</div>

                    </div>
                </div>
            `;

            document.getElementById('buyNowBtn').addEventListener('click', function (e) {
                e.stopPropagation(); // Klik olayını dayandır
                const formContainer = document.getElementById('formContainer');
                formContainer.style.display = 'block'; // Formu göstər

                // "active" sinfini əlavə edərək CSS animasiyasını işə sal
                setTimeout(() => {
                    formContainer.classList.add('active');
                }, 10); // Sinfi əlavə edərkən qısa gecikmə
            });

            // Click event for the category basket icon to prevent navigation
            const categoryBasketIcon = document.querySelector('.shopBasket');
            categoryBasketIcon.addEventListener('click', function (e) {
                e.preventDefault(); // Prevent default anchor behavior
                // Perform any other logic you want when the basket icon is clicked
            });

            // Form göndərmək üçün event listener
            document.getElementById('buyForm').addEventListener('submit', function (e) {
                e.preventDefault(); // Formun göndərilməsini əngəlləyin

                const formContainer = document.getElementById('formContainer');
                const thankModalDetail = document.getElementById('thankModalDetail');
                const cardName = document.getElementById('cardName').value.trim();
                const email = document.getElementById('email').value.trim();
                const closeButton = document.getElementById('closeDetail');


                // Bütün girişlərin düzgünlüyünü və cardName, email dəyərlərinin boş olmadığını yoxlayırıq
                if (checkInputValidity() && cardName && email) {
                    thankModalDetail.style.display = 'block'; // Təşəkkür modalını göstər

                    // (İstəyə bağlı) Formu təmizləyə bilərsiniz
                    document.getElementById('buyForm').reset(); // Formu sıfırlamaq

                }

                closeButton.addEventListener('click', function () {
                    thankModalDetail.style.display = 'none'
                })
            });

            // Inputların daxilində yalnız rəqəm qəbul etməsi
            const numericInputs = ['cardNumber', 'cardNumber2', 'cardCvv', 'code'];
            const submitButton = document.getElementById('submitButton');

            // Hər bir input üçün event listener əlavə edin
            numericInputs.forEach(id => {
                const input = document.getElementById(id);
                input.addEventListener('input', function () {
                    // Yalnız rəqəmləri qəbul et
                    this.value = this.value.replace(/\D/g, '');

                    // Minimum və maksimum uzunluğu yoxlayın
                    const minLength = parseInt(this.getAttribute('data-min'));
                    const maxLength = parseInt(this.getAttribute('data-max'));
                    if (this.value.length < minLength) {
                        submitButton.disabled = true; // İkinci sahə uyğunlaşmayana qədər düyməni bağlayın
                    } else {
                        submitButton.disabled = false; // Düzgün olduqda düyməni aktiv edin
                    }
                });
            });

            // Formdan istifadə etmədən düyməni aktivləşdir
            function checkInputValidity() {
                return Array.from(document.querySelectorAll('#buyForm input')).every(input => input.checkValidity());
            }


            // Shop düyməsinə klik edəndə
            const shopPageButton = document.getElementById('detailShopp'); // Shop düyməsinin seçicisini düzgün təyin edin

            shopPageButton.addEventListener('click', function () {
                const cardId = id; // ID-nı `urlParams`-dan aldığımız id ilə bərabərləşdir

                if (cardId) {
                    fetch('/json/category.json') // JSON faylını yenidən al
                        .then(res => res.json())
                        .then(data => {
                            const selectedItem = data.find(item => item.id === cardId); // ID-yə görə kartı tap
                            if (selectedItem) {
                                saveToLocalStorage(selectedItem); // Kartı localStorage-a əlavə et
                            }

                            // Shop səhifəsinə yönləndir
                            window.location.href = '/pages/shop/index.html';
                        })
                        .catch(error => console.error('Veri alınırken hata oluştu:', error));
                }
            });





        }
    })
    .catch(error => console.error('Veri alınırken hata oluştu:', error));





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
      window,location.href='/pages/contact/index.html'
      
    }
  })
  
  
  