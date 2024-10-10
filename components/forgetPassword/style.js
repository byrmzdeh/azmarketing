document.getElementById("registerForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Formun göndərilməsini dayandırırıq

    const email = document.getElementById('email').value.trim();

    // Email boşdursa yönləndirmə baş vermir
    if (email) {
        // Email doludursa "code" səhifəsinə yönləndiririk
        window.location.href = "/components/code/index.html"; // Burada "code" səhifəsinə yönləndirilir
    }
});