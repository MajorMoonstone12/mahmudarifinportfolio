const menuButton = document.querySelector('.menu-button');
const menuPanel = document.querySelector('.menu-panel');
const menuLinks = document.querySelectorAll('.menu-panel a');
const dialog = document.querySelector('#reel-modal');
const playButton = document.querySelector('.play-button');
const closeButton = document.querySelector('.modal-close');

function toggleMenu(force) {
  const open = typeof force === 'boolean' ? force : !menuPanel.classList.contains('open');
  menuPanel.classList.toggle('open', open);
  menuButton.setAttribute('aria-expanded', open);
  menuButton.querySelector('span').textContent = open ? 'CLOSE' : 'MENU';
  document.body.style.overflow = open ? 'hidden' : '';
}

menuButton.addEventListener('click', () => toggleMenu());
menuLinks.forEach(link => link.addEventListener('click', () => toggleMenu(false)));
playButton.addEventListener('click', () => dialog.showModal());
closeButton.addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
document.querySelector('#year').textContent = new Date().getFullYear();

const glow = document.querySelector('.cursor-glow');
window.addEventListener('pointermove', event => {
  glow.style.transform = `translate(${event.clientX - 170}px, ${event.clientY - 170}px)`;
});

const items = document.querySelectorAll('.image-card, .project, .section-heading, .intro-text, .film-content, .contact > *');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('in-view'); observer.unobserve(entry.target); } });
}, { threshold: .12 });
items.forEach(item => { item.style.transition = 'opacity .75s ease, transform .75s ease'; item.style.opacity = '0'; item.style.transform = 'translateY(24px)'; observer.observe(item); });

const style = document.createElement('style');
style.textContent = '.in-view{opacity:1!important;transform:translateY(0)!important}';
document.head.append(style);
