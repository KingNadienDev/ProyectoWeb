document.addEventListener('DOMContentLoaded', () => {
  const openLink = document.getElementById('openModalLink');
  const overlay  = document.getElementById('modalOverlay');
  const closeBtn = document.getElementById('closeModalBtn');

  openLink.addEventListener('click', e => {
    e.preventDefault();
    overlay.classList.add('visible');
  });

  closeBtn.addEventListener('click', () => {
    overlay.classList.remove('visible');
  });

  overlay.addEventListener('click', e => {
    if (e.target === overlay) {
      overlay.classList.remove('visible');
    }
  });


  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && overlay.classList.contains('visible')) {
      overlay.classList.remove('visible');
    }
  });
});
