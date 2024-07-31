document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('petitionForm');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const dateInput = document.getElementById('date');
  const signatureList = document.getElementById('signatures');
  const thankYouModal = document.getElementById('thankYouModal');
  const closeModal = document.getElementById('closeModal');
  const modalContent = thankYouModal.querySelector('.modal-content p');

  let totalSignatures = 0;

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validateForm = (event) => {
    event.preventDefault();

    let isValid = true;

    nameInput.classList.remove('invalid');
    emailInput.classList.remove('invalid');
    dateInput.classList.remove('invalid');

    if (nameInput.value.trim() === '') {
      nameInput.classList.add('invalid');
      isValid = false;
    }

    if (!validateEmail(emailInput.value.trim())) {
      emailInput.classList.add('invalid');
      isValid = false;
    }

    if (dateInput.value.trim() === '') {
      dateInput.classList.add('invalid');
      isValid = false;
    }

    if (isValid) {
      addSignature(nameInput.value.trim(), emailInput.value.trim(), dateInput.value.trim());
      showModal(nameInput.value.trim());
      nameInput.value = '';
      emailInput.value = '';
      dateInput.value = '';
    }
  };

  const addSignature = (name, email, date) => {
    const li = document.createElement('li');
    li.textContent = `${name} - ${email} - ${date}`;
    signatureList.appendChild(li);
  };

  const showModal = (name) => {
    modalContent.textContent = `Thank you ${name} for signing the petition!`;
    thankYouModal.style.display = 'flex';
    setTimeout(() => {
      thankYouModal.style.display = 'none';
    }, 3000);
  };

  form.addEventListener('submit', validateForm);
  closeModal.addEventListener('click', () => {
    thankYouModal.style.display = 'none';
  });

  const sections = document.querySelectorAll('.section');

  const observerOptions = {
    threshold: 0.1
  };

  const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  sections.forEach(section => {
    observer.observe(section);
  });

  let themeButton = document.getElementById("theme-button");

  const toggleDarkMode = () => {
    document.body.classList.toggle("dark-mode");
  };

  themeButton.addEventListener("click", toggleDarkMode);
});