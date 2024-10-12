const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');


fetch('/json/instructor.json') // JSON fayl yolunu düzgün təyin edin
    .then(res => res.json())
    .then(data => {
        const item = data.find(item => item.id === id); // Seçilen kartı tapırıq
        const detailContainer = document.getElementById('idetail');

        // Eğer kart varsa, detayları gösteririk
        if (item) {
            detailContainer.innerHTML = `
             <div class="link">
                <img class='person' src=${item.src} alt="err">
                <div class="linkedin">
                    <a href="https://www.linkedin.com/home"> <img src="/image/instructor/in.png" alt="err">
                    </a>
                    <div class="link_text">
                        <h6>LinkedIn</h6>
                        <a href="https://www.linkedin.com/home">/in/name-surname/</a>
                    </div>
                    <a href="https://www.linkedin.com/home"> <img class="vector" src="/image/instructor/arrow.png" alt="err">
                    </a>
                    
                    
                </div>
            </div>
            <div class="iabout">
                <h4>${item.name}</h4>
                <h6 class="adobe">${item.title}</h6>
                <h6>About</h6>
                <p>${item.about}</p>
                <h6>Experience and Education</h6>
                <div class="ipsum">
                    <img src="/image/instructor/point.png" alt="err">
<div class='ipsum_texts'>

<div class="ipsum_text">
<p class="dummy">${item.text} text</p>
<p>${item.lorem}</p>
</div>

<div class="ipsum_text">
<p class="dummy">${item.text} text</p>
<p>${item.lorem}</p>
</div>

<div class="ipsum_text">
<p class="dummy">${item.text} text</p>
<p>${item.lorem}</p>
</div></div>
                </div>

            </div>
            `;


        } else {
            detailContainer.textContent = 'Item not found';
        }
    })
    .catch(error => console.error('Veri alınırken hata oluştu:', error));






//footerForm
document.getElementById('footerForm').addEventListener('submit', function (e) {
    e.preventDefault()

    const mail = document.getElementById('emaill').value.trim()

    if (mail) {
        window.location.href = '/pages/contact/index.html'

    }
})