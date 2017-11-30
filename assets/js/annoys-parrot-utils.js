var annoysParrot = {

    updateInputHeader: function() {
    	inputBox = document.getElementById('header-input');
		inputBox.value = 'KNOWLEDGE IS FUTILE'
    },

    setActiveNavItem: function() {
    	currentUrl = window.location.href;
    	navItems = document.getElementsByClassName('nav-item');
		for (i = 0; i < navItems.length; i++) {
   			link = navItems[i].firstElementChild.href;
   			if (currentUrl == link) {
				navItems[i].classList.add("active")
   			}
		}
    }

};