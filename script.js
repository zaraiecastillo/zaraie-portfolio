document.addEventListener('DOMContentLoaded', () => {
  // 1. SUB-NAVIGATION PAGE VIEW SWITCHER
  const subNavTabs = document.querySelectorAll('.sub-nav-tab');
  const subViews = document.querySelectorAll('.sub-view');

  subNavTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetViewId = tab.getAttribute('data-view');

      // Update active state on sub-nav tabs
      subNavTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Hide all sub-views and show only the selected view
      subViews.forEach(view => {
        if (view.id === targetViewId) {
          view.classList.add('active-view');
        } else {
          view.classList.remove('active-view');
        }
      });

      // Scroll smoothly to top sub-nav wrapper
      const subNavTopWrapper = document.querySelector('.sub-nav-top-wrapper');
      if (subNavTopWrapper) {
        const offset = subNavTopWrapper.offsetTop;
        window.scrollTo({
          top: offset,
          behavior: 'smooth'
        });
      }
    });
  });

  // 2. COPY EMAIL TO CLIPBOARD
  const copyEmailBtn = document.getElementById('copy-email-btn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = 'Zaraienylah@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        const originalText = copyEmailBtn.innerHTML;
        copyEmailBtn.innerHTML = `<span>Copied! Zaraienylah@gmail.com</span>`;
        setTimeout(() => {
          copyEmailBtn.innerHTML = originalText;
        }, 2500);
      });
    });
  }
});
