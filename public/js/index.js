const form = document.querySelector('.loginForm');

form.addEventListener('click', (e) => {
  const payload = new FormData(form);
  const urlEnc = new URLSearchParams(payload);
  const response = fetch('http://localhost:3000/security/login', {
    method: 'POST',
    body: urlEnc,
  });
});
