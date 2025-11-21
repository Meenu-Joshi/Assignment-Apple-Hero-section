document.addEventListener('DOMContentLoaded', () => {
    // 1. Get main elements
    const navLinks = document.querySelectorAll('#main-nav-links .nav-item a');
    const megaMenu = document.getElementById('mega-menu-overlay');
    const mainContent = document.getElementById('main-content-container');
    const menuContentInner = document.querySelector('.mega-menu-content-inner');

    let menuTimeout;

    // Function to show a specific menu
    const showMenu = (menuTargetId) => {
        // Clear any existing menu content that is active
        const activeMenu = menuContentInner.querySelector('.row.active');
        if (activeMenu) {
            activeMenu.classList.remove('active');
        }

        // Activate the new menu content
        const targetMenu = document.getElementById(`menu-${menuTargetId}`);
        if (targetMenu) {
            targetMenu.classList.add('active');
        }
        
        // Show the mega-menu overlay and apply blur/disable to main content
        megaMenu.classList.add('active');
        mainContent.classList.add('menu-active');
    };

    // Function to hide the menu
    const hideMenu = () => {
        // Hide the overlay and remove the main content blur
        megaMenu.classList.remove('active');
        mainContent.classList.remove('menu-active');

        // Optional: Immediately hide the inner menu content after the transition starts
        const activeMenu = menuContentInner.querySelector('.row.active');
        if (activeMenu) {
            // A slight delay ensures the fade-out effect looks better
            setTimeout(() => {
                activeMenu.classList.remove('active');
            }, 300); // Wait for the opacity transition (0.3s) to finish
        }
    };

    // 2. Attach hover event listeners to main navigation links
    navLinks.forEach(link => {
        // Get the target ID from the 'data-menu-target' attribute (e.g., 'store', 'mac', 'iphone')
        const menuTargetId = link.getAttribute('data-menu-target');

        link.addEventListener('mouseenter', () => {
            // Clear any pending hide actions
            clearTimeout(menuTimeout); 
            showMenu(menuTargetId);
        });
        
        // Use mouseleave for the links to start the timer to hide the menu
        link.addEventListener('mouseleave', () => {
            menuTimeout = setTimeout(hideMenu, 150); // Small delay before hiding
        });
    });

    // 3. Keep the menu open when hovering over the menu overlay itself
    megaMenu.addEventListener('mouseenter', () => {
        clearTimeout(menuTimeout); // Clear the hide timer if the mouse enters the menu
    });

    // 4. Hide the menu when the mouse leaves the entire mega-menu area
    megaMenu.addEventListener('mouseleave', () => {
        menuTimeout = setTimeout(hideMenu, 150); // Start timer to hide menu
    });
});