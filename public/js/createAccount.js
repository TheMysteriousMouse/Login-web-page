const createAccountBtn = document.querySelector('.createAccountBtn');
const form = document.querySelector('.createAccountForm')
createAccountBtn.addEventListener('click', (e) => {
  try{
  const payload = new FormData(form)
  const urlEnc = new URLSearchParams(payload)
  const response = await fetch('http://localhost:3000/security/createAccount',{
    method: 'POST',
    body: urlEnc
  });

  const errorMessage = await response.message
  const pTag = document.createElement('p');
  const text = document.createTextNode(errorMessage);
  pTag.appendChild(text)
  form.appendChild(pTag)
  }catch(err){
    console.log(err.message)
  }
});
