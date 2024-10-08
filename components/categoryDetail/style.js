
// URL'den id parametresini al
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

// JSON verisini almak
fetch('/json/category.json')
    .then(res => res.json())
    .then(data => {
        const item = data.find(item => item.id === id); // Seçilen öğeyi bul
        const detailContainer = document.getElementById('detail');

        // Eğer öğe bulunduysa, detayları göster
        if (item) {
            // innerHTML ile HTML yapısını yazmak
            detailContainer.innerHTML = `
                <div class="title">
                    <h4>${item.title}</h4>
                    <div class="category">
                        <button>${item.category}</button>
                        <div class="view">
                            <img width="17" src="/image/home/detailUser.png" alt="">
                            <p>${item.view} students enrolled</p>
                        </div>
                    </div>
                    <img src="${item.src}" alt="">
                    <div class="desc">
                        <h5>Course Description</h5>
                        <p>${item.description}</p>
                        <div class="desc_time">
                            <div class="time_one">
                                <div class="time">
                                    <img width="17" src="/image/home/detailVector.png" alt="">
                                    <p>${item.video}</p>
                                </div>
                                <div class="time">
                                    <img width="17" src="/image/home/detailVector.png" alt="">
                                    <p>${item.resources}</p>
                                </div>
                                <div class="time">
                                    <img width="17" src="/image/home/detailVector.png" alt="">
                                    <p>${item.access}</p>
                                </div>
                                <div class="time">
                                    <img width="17" src="/image/home/detailVector.png" alt="">
                                    <p>${item.accessTwo}</p>
                                </div>
                                <div class="time">
                                    <img width="17" src="/image/home/detailVector.png" alt="">
                                    <p>${item.certificate}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="instructor">
                        <img width="60" src="/image/home/instructor.png" alt="Instructor">
                        <div class="name">
                            <h5>Name Surname</h5>
                            <p>Instructor</p>
                        </div>
                    </div>
                    <div class="includes">
                        <h5>Includes</h5>
                        <div class="time_one">
                            <div class="time">
                                <img width="17" src="/image/home/detailVector.png" alt="">
                                <p>${item.video}</p>
                            </div>
                            <div class="time">
                                <img width="17" src="/image/home/detailVector.png" alt="">
                                <p>${item.resources}</p>
                            </div>
                            <div class="time">
                                <img width="17" src="/image/home/detailVector.png" alt="">
                                <p>${item.access}</p>
                            </div>
                            <div class="time">
                                <img width="17" src="/image/home/detailVector.png" alt="">
                                <p>${item.accessTwo}</p>
                            </div>
                            <div class="time">
                                <img width="17" src="/image/home/detailVector.png" alt="">
                                <p>${item.certificate}</p>
                            </div>
                        </div>
                    </div>
                    <div class="buy">
                        <div class="price">
                            <p>Price</p>
                            <h5>${item.price}</h5>
                        </div>
                        <div class="details">
                            <h6>Card details</h6>
                            <form id="paymentForm">
                                <label for="email">Email:</label>
                                <input type="email" id="email" name="email" placeholder="Emailinizi daxil edin" required>
                                
                                <label for="cardNumber">Kart Nömrəsi:</label>
                                <input type="text" id="cardNumber" name="cardNumber" placeholder="16 rəqəmdən ibarət kart nömrəsi" required>
                                
                                <label for="cvv">CVV:</label>
                                <input type="text" id="cvv" name="cvv" placeholder="3 rəqəmdən ibarət CVV" required>
                                
                                <label for="discountCode">İndirim Kodu:</label>
                                <input type="text" id="discountCode" name="discountCode" placeholder="9 rəqəmdən ibarət kod" required>
                                
                                <button type="submit">Ödənişi Təsdiqlə</button>
                                <div class="message" id="message"></div>
                            </form>
                        </div>
                    </div>
                </div>
            `;
        } else {
            detailContainer.textContent = 'Item not found';
        }
    })
    .catch(error => console.error('Veri alınırken hata oluştu:', error));

// Ödeme formunun kontrolü
document.getElementById('paymentForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const email = document.getElementById('email');
    const cardNumber = document.getElementById('cardNumber');
    const cvv = document.getElementById('cvv');
    const discountCode = document.getElementById('discountCode');
    const message = document.getElementById('message');

    let valid = true;

    // Email kontrolü
    if (!email.value.includes('@') || email.value.length < 5) {
        email.classList.add('error');
        valid = false;
    } else {
        email.classList.remove('error');
        email.classList.add('success');
    }

    // Kart Nömrəsi kontrolü
    if (!/^\d{16}$/.test(cardNumber.value)) {
        cardNumber.classList.add('error');
        valid = false;
    } else {
        cardNumber.classList.remove('error');
        cardNumber.classList.add('success');
    }

    // CVV kontrolü
    if (!/^\d{3}$/.test(cvv.value)) {
        cvv.classList.add('error');
        valid = false;
    } else {
        cvv.classList.remove('error');
        cvv.classList.add('success');
    }

    // İndirim Kodu kontrolü
    if (!/^\d{9}$/.test(discountCode.value)) {
        discountCode.classList.add('error');
        valid = false;
    } else {
        discountCode.classList.remove('error');
        discountCode.classList.add('success');
    }

    // Form geçerli ise
    if (valid) {
        message.innerText = "Ödəniş Təsdiq edildi!";
        setTimeout(() => {
            window.location.href = "/index.html"; // Anasayfa yönlendirmesi
        }, 1000);
    } else {
        message.innerText = "Zəhmət olmasa, bütün xanaları düzgün doldurun!";
    }
});