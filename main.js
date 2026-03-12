/**
 * CYBERPUNK PORTFOLIO
 * Interactive Systems
 */

document.addEventListener('DOMContentLoaded', () => {
    initCounters();
    initTiltEffect();
    initTerminalEffect();
    initGlitchIntensity();
    initMusicPlayer();
});

// ============================================
// ANIMATED COUNTERS
// ============================================

function initCounters() {
    const counters = document.querySelectorAll('.stat-num');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toString().padStart(2, '0');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toString().padStart(2, '0');
        }
    }, 30);
}

// ============================================
// 3D TILT EFFECT
// ============================================

function initTiltEffect() {
    const cards = document.querySelectorAll('[data-tilt]');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', handleTilt);
        card.addEventListener('mouseleave', resetTilt);
    });
}

function handleTilt(e) {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
}

function resetTilt(e) {
    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
}

// ============================================
// TERMINAL TYPING EFFECT
// ============================================

function initTerminalEffect() {
    const terminal = document.getElementById('terminal');
    if (!terminal) return;
    
    const lines = terminal.querySelectorAll('.line');
    lines.forEach((line, index) => {
        line.style.opacity = '0';
        setTimeout(() => {
            line.style.opacity = '1';
            line.style.animation = 'typing 0.1s steps(20)';
        }, index * 400);
    });
}

// ============================================
// RANDOM GLITCH INTENSITY
// ============================================

function initGlitchIntensity() {
    const glitches = document.querySelectorAll('.glitch');
    
    setInterval(() => {
        const randomGlitch = glitches[Math.floor(Math.random() * glitches.length)];
        randomGlitch.style.animation = 'none';
        setTimeout(() => {
            randomGlitch.style.animation = '';
        }, 10);
    }, 3000);
}

// ============================================
// SMOOTH SCROLL
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ============================================
// MUSIC PLAYER
// ============================================

function initMusicPlayer() {
    const music = document.getElementById('bg-music');
    const toggleBtn = document.getElementById('music-toggle');
    const musicIcon = toggleBtn.querySelector('.music-icon');
    const musicStatus = toggleBtn.querySelector('.music-status');
    
    if (!music || !toggleBtn) return;
    
    // Set initial volume (will be unmuted after autoplay)
    music.volume = 0.3;
    
    // Set initial UI state to PLAY (not muted)
    updateMusicUI(false);
    
    // Try to autoplay on page load - multiple attempts
    const attemptAutoplay = () => {
        const playPromise = music.play();
        
        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    // Autoplay worked! Unmute the audio
                    music.muted = false;
                    updateMusicUI(true);
                })
                .catch(() => {
                    // Autoplay was blocked - try again after user interaction
                    console.log('Autoplay blocked - waiting for user interaction');
                    updateMusicUI(false);
                });
        }
    };
    
    // Try autoplay immediately
    attemptAutoplay();
    
    // Try again after a short delay
    setTimeout(attemptAutoplay, 1500);
    
    // Try again after another delay
    setTimeout(attemptAutoplay, 3000);
    
    // Listen for any user interaction to trigger autoplay
    const handleUserInteraction = () => {
        if (music.paused) {
            music.muted = false;
            music.play().then(() => {
                updateMusicUI(true);
            }).catch(() => {});
        }
        // Remove listeners after first interaction
        document.removeEventListener('click', handleUserInteraction);
        document.removeEventListener('keydown', handleUserInteraction);
        document.removeEventListener('scroll', handleUserInteraction);
    };
    
    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('keydown', handleUserInteraction);
    document.addEventListener('scroll', handleUserInteraction);
    
    // Toggle button click handler
    toggleBtn.addEventListener('click', () => {
        if (music.paused) {
            music.muted = false;
            music.play();
            updateMusicUI(true);
        } else {
            music.pause();
            updateMusicUI(false);
        }
    });
    
    function updateMusicUI(isPlaying) {
        if (isPlaying) {
            musicIcon.textContent = '🎵';
            musicStatus.textContent = 'SYNTHWAVE';
            toggleBtn.classList.add('playing');
        } else {
            musicIcon.textContent = '🎵';
            musicStatus.textContent = 'PLAY';
            toggleBtn.classList.remove('playing');
        }
    }
}

// ============================================
// CONSOLE EASTER EGG
// ============================================

console.log('%c⚠ WARNING: SYSTEM BREACH DETECTED', 'color: #ff006e; font-size: 20px; font-weight: bold;');
console.log('%c> AGOSTINO_SCHOLES.exe loaded', 'color: #00f5ff; font-size: 14px;');
console.log('%c> Access Level: JUNIOR_DEV', 'color: #bc13fe; font-size: 12px;');
console.log('%c> Ready for deployment', 'color: #00f5ff; font-size: 12px;');