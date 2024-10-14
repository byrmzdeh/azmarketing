//Choose a course
function toggleDropdown() {
    const dropdown = document.querySelector('.custom-select');
    const dropdownIcon = document.getElementById('dropdownIcon');
  
    // Dropdown açılıbsa bağlanır, bağlıdırsa açılır
    dropdown.classList.toggle('active');
  
    // Oxun yönünü dəyiş
    if (dropdown.classList.contains('active')) {
      dropdownIcon.classList.remove('arrow-down');
      dropdownIcon.classList.add('arrow-up');
      document.querySelector('.select-options').style.display = 'block';
    } else {
      dropdownIcon.classList.remove('arrow-up');
      dropdownIcon.classList.add('arrow-down');
      document.querySelector('.select-options').style.display = 'none';
    }
  }
  // Function to select a course when a checkbox is clicked
  function selectCourse(checkbox) {
    const selectedCourseInput = document.getElementById('selectedCourse');
    const checkboxes = document.querySelectorAll('.select-options input[type="checkbox"]');
  
    // Uncheck all other checkboxes
    checkboxes.forEach(cb => {
      if (cb !== checkbox) {
        cb.checked = false;
      }
    });
  
    // Set the selected course value based on the clicked checkbox
    if (checkbox.checked) {
      selectedCourseInput.value = checkbox.value;
    } else {
      selectedCourseInput.value = '';
    }
  
    // Close the dropdown and change the icon after selection
    const dropdown = document.querySelector('.custom-select');
    const dropdownIcon = document.getElementById('dropdownIcon');
  
    dropdown.classList.remove('active');
    dropdownIcon.classList.remove('arrow-up');
    dropdownIcon.classList.add('arrow-down');
    document.querySelector('.select-options').style.display = 'none'; // Hide options after selecting
  }