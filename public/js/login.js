const form = document.querySelector('.loginForm');

const sendFormData = async () => {
  const payload = new FormData(form);
  const urlEnc = new URLSearchParams(payload);
  const response = await fetch('http://localhost:3000/security/login', {
    method: 'POST',
    body: urlEnc,
  });
};
form.addEventListener('submit', sendFormData);
