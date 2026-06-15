const container = document.getElementById('container');

document.getElementById('registerBtn').addEventListener('click', () => {
  container.classList.add('active');
});

document.getElementById('loginBtn').addEventListener('click', () => {
  container.classList.remove('active');
});
