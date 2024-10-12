function navigateToPage(page) {
    // Add 'clicked' class to trigger animation
    const button = event.target;
    button.classList.add('clicked');
    
    // Determine the redirect URL based on the button clicked
    let redirectUrl = '';
    if (page === 'games') {
        redirectUrl = 'encrypt2.html';
    } else if (page === 'propose') {
        redirectUrl = 'anjyan.html';
    } else if (page === 'upcomming') {
        redirectUrl = 'webHTML.html';
    } else if (page === 'love') {
        redirectUrl = 'propose.html';
    }  
    
    // Redirect after animation ends
    setTimeout(() => {
        window.location.href = redirectUrl;
    }, 2000); // Match the duration of the animation
}

