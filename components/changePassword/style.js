document.getElementById('changeForm').addEventListener('submit', function (e) {
    e.preventDefault()


    const password = document.getElementById('password').value.trim()
    const repeatPassword = document.getElementById('repeatPassword').value.trim()
    const errorDiv = document.getElementById('error')


    if (!password) {
        errorDiv.style.display = "block"; // Hata mesajını göstər
        errorDiv.innerText = "Passwords do not match."; // Səhv mesajını dəyiş
        return; // Düşünməkdən vaz keçin
    }

    // Passwordlar arasında uyğunluğu yoxlayırıq
    if (password !== repeatPassword) {
        errorDiv.style.display = "block"; // Hata mesajını göstər
        errorDiv.innerText = "Passwords do not match."; // Səhv mesajını dəyiş
    } else {
        errorDiv.style.display = "none"; // Hata mesajını gizləd
        window.location.href = '/components/login/index.html'; // Burada "login" səhifəsinə yönləndiririk
    }



})

function togglePassword() {
    let passwordField = document.getElementById("password");
    if (passwordField.type === "password" ) {
        passwordField.type = "text";
    } else {
        passwordField.type = "password";
    }
}

function togglePasswordRepeat() {
    let repeatPassword = document.getElementById("repeatPassword");
    if (repeatPassword.type === "password" ) {
        repeatPassword.type = "text";
    } else {
        repeatPassword.type = "password";
    }
}