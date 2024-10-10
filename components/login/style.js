document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Formun göndərilməsini dayandırırıq

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    let valid = true;

    // Error mesajlarını gizlədək
    document.getElementById('email').classList.remove('input-error');
    document.getElementById('password').classList.remove('input-error');

    // Email sahəsini yoxlayırıq
    if (email === "") {
        valid = false; // Email boşdursa valid false olur
        document.getElementById('email').classList.add('input-error'); // Xətalı giriş üçün çərçivə
    }

    // Şifrə sahəsini yoxlayırıq
    if (password === "") {
        valid = false; // Şifrə boşdursa valid false olur
        document.getElementById('password').classList.add('input-error'); // Xətalı giriş üçün çərçivə
    }

    // Əgər hər iki xana doludursa, dashboard səhifəsinə keçid edək
    if (valid) {
        window.location.href = "/components/dashboard/index.html"; // Burada dashboard səhifəsinə yönləndiririk
    }
});

// Şifrə sahəsinin görünməsini idarə edən funksiya
function togglePassword() {
    let passwordField = document.getElementById("password");
    if (passwordField.type === "password") {
        passwordField.type = "text";
    } else {
        passwordField.type = "password";
    }
}