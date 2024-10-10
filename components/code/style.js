document.getElementById('codeForm').addEventListener('submit', function (e) {
    e.preventDefault()

    const digit1 = document.getElementById('digit1').value.trim();
    const digit2 = document.getElementById('digit2').value.trim();
    const digit3 = document.getElementById('digit3').value.trim();
    const digit4 = document.getElementById('digit4').value.trim();

    if (digit1 && digit2 && digit3 && digit4) {
        window.location.href='/components/changePassword/index.html'
        
    }

})