const scriptURL = 'https://script.google.com/macros/s/AKfycby3uCwBlZeBs6eVXo8lJnJF-SwMF_Ujjc_YsxnJWTHT13nt9i3S-ywQGSlig26g4qr57A/exec';

const form = document.getElementById('contact-form');
const response = document.getElementById('response');

form.addEventListener('submit', e => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());
  fetch(scriptURL, {
    method: 'POST',
    body: JSON.stringify(data)
  })
  .then(res => {
    response.innerText = "Message sent successfully!";
    form.reset();
  })
  .catch(err => {
    response.innerText = "Something went wrong!";
    console.error(err);
  });
});
document.addEventListener('DOMContentLoaded', () => {
  AOS.init({
    duration: 1000,
    once: false,     // animate again on scroll up
    mirror: true,    // animate out while scrolling up
    anchorPlacement: 'top-bottom',
    easing: 'ease-in-out',
  });
});
