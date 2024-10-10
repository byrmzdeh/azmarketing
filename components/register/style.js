document.getElementById('registerForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form submission

    const name = document.getElementById('name').value.trim();
    const surname = document.getElementById('surname').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const repeatPassword = document.getElementById('repeat').value.trim();
    const errorDiv = document.getElementById('error');




    // Check if any field is empty
    if (!name || !surname || !phone || !email || !password || !repeatPassword) {
        errorDiv.style.display = "block";
        errorDiv.innerText = "Please fill in all fields.";
        return;
    }else{
        errorDiv.style.display = "none";
    }

    
    if (password !== repeatPassword) {
        errorDiv.style.display = "block";
        errorDiv.innerText = "Passwords do not match.";
        // window.location.href = '/components/login/index.html';

        return;
    }


    if(name && surname && phone && email && password && repeatPassword && password===repeatPassword){
        window.location.href='/components/login/index.html'
    }

    // Check if passwords match


    // If all checks pass, hide the error message and redirect to login page
   
});

function togglePasswordd() {
    let passwordField = document.getElementById("password");
    passwordField.type = (passwordField.type === "password") ? "text" : "password";
}

function togglePasswordRepeatt() {
    let repeatPassword = document.getElementById("repeat");
    repeatPassword.type = (repeatPassword.type === "password") ? "text" : "password";
}
