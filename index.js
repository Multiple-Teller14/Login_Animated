const container = document.getElementById('container');

document.getElementById('registerBtn').addEventListener('click', () => {
  container.classList.add('active');
});

document.getElementById('loginBtn').addEventListener('click', () => {
  container.classList.remove('active');
});

document.querySelectorAll('.toggle-pw').forEach(function(toggle) {
  toggle.addEventListener('click', function() {
    var targetId = this.getAttribute('data-target');
    var input = document.getElementById(targetId);
    var icon = this.querySelector('i');
    if (input.type === 'password') {
      input.type = 'text';
      icon.classList.remove('fa-eye');
      icon.classList.add('fa-eye-slash');
    } else {
      input.type = 'password';
      icon.classList.remove('fa-eye-slash');
      icon.classList.add('fa-eye');
    }
  });
});

var regPassword = document.getElementById('reg-password');
var strengthFill = document.querySelector('.strength-fill');
var strengthText = document.querySelector('.strength-text');

regPassword.addEventListener('input', function() {
  var val = this.value;
  var score = 0;

  if (val.length >= 8) score++;
  if (/[A-Z]/.test(val)) score++;
  if (/[0-9]/.test(val)) score++;
  if (/[^A-Za-z0-9]/.test(val)) score++;

  var levels = [
    { width: '0%',   color: '#eee',    label: '',        labelColor: '' },
    { width: '25%',  color: '#e53935', label: 'Weak',    labelColor: '#e53935' },
    { width: '50%',  color: '#fb8c00', label: 'Fair',    labelColor: '#fb8c00' },
    { width: '75%',  color: '#43a047', label: 'Good',    labelColor: '#43a047' },
    { width: '100%', color: '#1b5e20', label: 'Strong',  labelColor: '#1b5e20' },
  ];

  var level = val.length === 0 ? levels[0] : levels[score] || levels[1];
  strengthFill.style.width = level.width;
  strengthFill.style.background = level.color;
  strengthText.textContent = level.label;
  strengthText.style.color = level.labelColor;
});

function addRipple(btn) {
  btn.addEventListener('click', function(e) {
    var rect = this.getBoundingClientRect();
    var ripple = document.createElement('span');
    var size = Math.max(rect.width, rect.height);
    ripple.classList.add('ripple');
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
    ripple.style.top  = (e.clientY - rect.top  - size / 2) + 'px';
    this.appendChild(ripple);
    setTimeout(function() { ripple.remove(); }, 600);
  });
}

document.querySelectorAll('button').forEach(addRipple);

function showToast(message, type) {
  var existing = document.querySelector('.toast');
  if (existing) existing.remove();

  var toast = document.createElement('div');
  toast.classList.add('toast', type || '');
  toast.textContent = message;
  document.body.appendChild(toast);

  requestAnimationFrame(function() {
    requestAnimationFrame(function() {
      toast.classList.add('show');
    });
  });

  setTimeout(function() {
    toast.classList.remove('show');
    setTimeout(function() { toast.remove(); }, 350);
  }, 3000);
}

function setLoading(btn, loading) {
  if (loading) {
    btn.classList.add('loading');
    btn.disabled = true;
  } else {
    btn.classList.remove('loading');
    btn.disabled = false;
  }
}

document.getElementById('signinBtn').addEventListener('click', function() {
  var email = document.getElementById('login-email').value.trim();
  var password = document.getElementById('login-password').value.trim();

  if (!email || !password) {
    showToast('Please fill in all fields.', 'error');
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showToast('Please enter a valid email.', 'error');
    return;
  }

  var btn = this;
  setLoading(btn, true);
  setTimeout(function() {
    setLoading(btn, false);
    showToast('Signed in successfully!', 'success');
  }, 1800);
});

document.getElementById('signupBtn').addEventListener('click', function() {
  var name     = document.getElementById('reg-name').value.trim();
  var email    = document.getElementById('reg-email').value.trim();
  var password = document.getElementById('reg-password').value.trim();

  if (!name || !email || !password) {
    showToast('Please fill in all fields.', 'error');
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showToast('Please enter a valid email.', 'error');
    return;
  }
  if (password.length < 6) {
    showToast('Password must be at least 6 characters.', 'error');
    return;
  }

  var btn = this;
  setLoading(btn, true);
  setTimeout(function() {
    setLoading(btn, false);
    showToast('Account created successfully!', 'success');
  }, 1800);
});
