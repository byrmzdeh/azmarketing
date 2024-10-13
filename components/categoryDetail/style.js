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

                <div class="card">
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
                                <button id="buyNowBtn">
                                    <span>Buy now</span>
            <a href="/pages/shop/index.html"><img src="/image/home/arrow.png" alt=""></a>
                                </button>
                                <img class='shopBasket' src="/image/home/categoryBasket.png" alt="">
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
                                        <input type="number" id="cardNumber" name="cardNumber" placeholder="__ /__ /__" required>
                                    </div>
                                    <div class="card_name">
                                        <label for="cardNumber2">CARD NUMBER</label>
                                        <input type="text" id="cardNumber2" name="cardNumber2" placeholder="0000 0000 0000 0000" required>
                                    </div>
                                    <div class="card_number">
                                        <label for="cardCvv">CVV</label>
                                        <input type="text" id="cardCvv" name="cardCVV" placeholder="__ /__ /__" required>
                                    </div>
                                </div>
                                <div class="code">
                                    <label for="code">DISCOUNT CODE</label>
                                    <input type="text" id="code" name="code" placeholder="000 000 000" required>
                                </div>
                                <button type="submit">Confirm Payment</button>
                            </form>
                        </div>
                    </div>
                </div>
            `;

            // Buy now düyməsinə klik edəndə formu göstərmək və səhifənin yenidən yüklənməsinin qarşısını almaq

// Buy now düyməsinə klik edəndə formu göstərmək və səhifənin yenidən yüklənməsinin qarşısını almaq
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
categoryBasketIcon.addEventListener('click', function(e) {
    e.preventDefault(); // Prevent default anchor behavior
    // Perform any other logic you want when the basket icon is clicked
});

            document.getElementById('buyForm').addEventListener('submit', function (e) {
                e.preventDefault(); // Formun göndərilməsini əngəlləyin
                document.getElementById('formContainer').style.display = 'none'; // Formu gizləyin
                window.location.href = '/index.html'; // Home page URL
            });
        }
    })
    .catch(error => console.error('Veri alınırken hata oluştu:', error));
