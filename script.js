var totalPages = 8;
var currentPage = 1;

// ----- NAVIGATION -----
function goToPage(num) {
  if (num < 1 || num > totalPages) return;
  document.querySelectorAll('.page').forEach(function(p) {
    p.classList.remove('active');
  });
  document.getElementById('page' + num).classList.add('active');
  currentPage = num;
  updateDots();
  createHearts(6);
  window.scrollTo(0, 0);
}

// ----- NAV DOTS -----
function buildDots() {
  var container = document.getElementById('navDots');
  container.innerHTML = '';
  for (var i = 1; i <= totalPages; i++) {
    var dot = document.createElement('div');
    dot.className = 'nav-dot' + (i === 1 ? ' active' : '');
    dot.dataset.page = i;
    dot.addEventListener('click', function() {
      goToPage(parseInt(this.dataset.page));
    });
    dot.addEventListener('touchend', function(e) {
      e.preventDefault();
      goToPage(parseInt(this.dataset.page));
    });
    container.appendChild(dot);
  }
}

function updateDots() {
  document.querySelectorAll('.nav-dot').forEach(function(dot, idx) {
    dot.classList.toggle('active', idx + 1 === currentPage);
  });
}

// ----- SECRET MESSAGE -----
function showMessage() {
  var msg = document.getElementById('message');
  var btn = document.getElementById('secretBtn');
  msg.classList.toggle('show');
  if (msg.classList.contains('show')) {
    btn.innerHTML = '❤️ Hide My Message';
    createHearts(25);
  } else {
    btn.innerHTML = '💌 Read My Message';
  }
}

// ----- HEART CREATOR -----
function createHearts(number) {
  var container = document.getElementById('hearts');
  var types = ['❤️', '💗', '💖', '💕', '💘', '💝'];
  for (var i = 0; i < number; i++) {
    var heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = types[Math.floor(Math.random() * types.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.fontSize = (12 + Math.random() * 22) + 'px';
    heart.style.animationDuration = (4 + Math.random() * 4) + 's';
    heart.style.animationDelay = Math.random() * 2 + 's';
    container.appendChild(heart);
    setTimeout(function() {
      heart.remove();
    }, 8000);
  }
}

// ----- AUTOMATIC HEARTS -----
setInterval(function() {
  createHearts(1);
}, 1000);

// ----- AUTO PLAY MUSIC -----
function autoPlayMusic() {
  var music = document.getElementById('bgMusic');
  var indicator = document.getElementById('musicIndicator');
  
  music.play().then(function() {
    indicator.innerHTML = '🎵';
  }).catch(function() {
    indicator.innerHTML = '🔇';
    document.addEventListener('click', function playOnClick() {
      music.play().then(function() {
        indicator.innerHTML = '🎵';
        document.removeEventListener('click', playOnClick);
      }).catch(function() {});
    });
  });
}

// ----- SWIPE NAVIGATION -----
var touchX = 0;
document.addEventListener('touchstart', function(e) {
  touchX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(e) {
  var diff = touchX - e.changedTouches[0].screenX;
  if (Math.abs(diff) > 30) {
    if (diff > 0 && currentPage < totalPages) {
      goToPage(currentPage + 1);
    } else if (diff < 0 && currentPage > 1) {
      goToPage(currentPage - 1);
    }
  }
});

// ----- KEYBOARD NAVIGATION -----
document.addEventListener('keydown', function(e) {
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
    if (currentPage < totalPages) goToPage(currentPage + 1);
  } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
    if (currentPage > 1) goToPage(currentPage - 1);
  }
});

// ----- INIT -----
buildDots();
window.addEventListener('load', function() {
  setTimeout(function() {
    createHearts(8);
    autoPlayMusic();
  }, 300);
});