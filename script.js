function toggleTheme() {
  document.body.classList.toggle('dark');
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
}

window.onload = () => {
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme === 'dark' || (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.body.classList.add('dark');
  }

  // Animate sections with GSAP + ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray(".section").forEach(section => {
    gsap.from(section, {
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        toggleActions: "play none none none"
      },
      opacity: 0,
      y: 50,
      duration: 0.8
    });
  });

  // Contact form submission
  document.getElementById("contact-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(this);

    fetch("https://script.google.com/macros/s/AKfycbz99Ir9fqsqBUjRokhZxuXqPKvN8r0MQRzXohe5zqHshP1unFQw9ajxopvHd7aYZawL/exec", {
      method: "POST",
      body: formData
    })
      .then(response => alert("Message sent successfully!"))
      .catch(error => alert("Error! Message not sent."));
  });
};
