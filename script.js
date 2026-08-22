document.addEventListener('DOMContentLoaded', () => {
  // 1. SUB-NAVIGATION PAGE VIEW SWITCHER
  const subNavTabs = document.querySelectorAll('.sub-nav-tab');
  const subViews = document.querySelectorAll('.sub-view');
  const mobileNavSelect = document.getElementById('mobile-nav-select');

  function switchView(targetViewId) {
    // Update active state on sub-nav tabs
    subNavTabs.forEach(t => {
      if (t.getAttribute('data-view') === targetViewId) {
        t.classList.add('active');
      } else {
        t.classList.remove('active');
      }
    });

    // Sync mobile dropdown select
    if (mobileNavSelect) {
      mobileNavSelect.value = targetViewId;
    }

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
  }

  // Desktop Tabs Click Event
  subNavTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetViewId = tab.getAttribute('data-view');
      switchView(targetViewId);
    });
  });

  // Mobile Dropdown Select Change Event
  if (mobileNavSelect) {
    mobileNavSelect.addEventListener('change', (e) => {
      const targetViewId = e.target.value;
      switchView(targetViewId);
    });
  }

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
