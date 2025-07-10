const scriptURL = 'https://script.google.com/macros/s/AKfycbwD3FG3KuBLdE0vit4ltAINYrkyP95A2GbdTUOf15yDwdwi-1bGTUIhGgH5oBkCWdNvlg/exec';
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
    once: false  
  });
});
