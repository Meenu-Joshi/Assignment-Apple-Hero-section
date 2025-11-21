document.addEventListener('DOMContentLoaded', () => {

    const navLinks = document.querySelectorAll('#main-nav-links .nav-item a');
    const megaMenu = document.getElementById('mega-menu-overlay');
    const mainContent = document.getElementById('main-content-container');
    const menuContentInner = document.querySelector('.mega-menu-content-inner');

    let menuTimeout;

  
    const showMenu = (menuTargetId) => {
    
        const activeMenu = menuContentInner.querySelector('.row.active');
        if (activeMenu) {
            activeMenu.classList.remove('active');
        }

        const targetMenu = document.getElementById(`menu-${menuTargetId}`);
        if (targetMenu) {
            targetMenu.classList.add('active');
        }
        

        megaMenu.classList.add('active');
        mainContent.classList.add('menu-active');
    };

  
    const hideMenu = () => {
       
        megaMenu.classList.remove('active');
        mainContent.classList.remove('menu-active');

       
        const activeMenu = menuContentInner.querySelector('.row.active');
        if (activeMenu) {
          
            setTimeout(() => {
                activeMenu.classList.remove('active');
            }, 300); 
        }
    };

  
    navLinks.forEach(link => {
      
        const menuTargetId = link.getAttribute('data-menu-target');

        link.addEventListener('mouseenter', () => {
           
            clearTimeout(menuTimeout); 
            showMenu(menuTargetId);
        });
        
      
        link.addEventListener('mouseleave', () => {
            menuTimeout = setTimeout(hideMenu, 150); // Small delay before hiding
        });
    });

    megaMenu.addEventListener('mouseenter', () => {
        clearTimeout(menuTimeout); // Clear the hide timer if the mouse enters the menu
    });

   
    megaMenu.addEventListener('mouseleave', () => {
        menuTimeout = setTimeout(hideMenu, 150); // Start timer to hide menu
    });
});
