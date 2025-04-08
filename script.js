window.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('themeToggle');
    const lightEmbed = document.getElementById('spline-light');
    const darkEmbed = document.getElementById('spline-dark');
  
    const applyTheme = (isDark) => {
      document.body.classList.toggle('dark', isDark);
  

      if (isDark) {
        lightEmbed.classList.add('hidden');
        darkEmbed.classList.remove('hidden');
      } else {
        darkEmbed.classList.add('hidden');
        lightEmbed.innerHTML = ''; 
        const viewer = document.createElement('spline-viewer');
        viewer.setAttribute('url', 'https://prod.spline.design/I6SNY7Mc9Ck8zdti/scene.splinecode');
        lightEmbed.appendChild(viewer);
        lightEmbed.classList.remove('hidden');
      }
  
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    };
  
    const savedDark = localStorage.getItem('theme') === 'dark';
    toggle.checked = savedDark;
    applyTheme(savedDark);
  
    toggle.addEventListener('change', () => {
      applyTheme(toggle.checked);
    });
  });
  