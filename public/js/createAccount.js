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
  }catch(err){
    console.log(err.message)
  }
});
