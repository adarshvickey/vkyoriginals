function navigateToPage(page) {
    // Add 'clicked' class to trigger animation
    const button = event.target;
    button.classList.add('clicked');
    
    // Determine the redirect URL based on the button clicked
    let redirectUrl = '';
    if (page === 'school') {
        redirectUrl = 'page3a.html';
    } else if (page === 'personal') {
        redirectUrl = 'page3b.html';
    }
    
    // Redirect after animation ends
    setTimeout(() => {
        window.location.href = redirectUrl;
    }, 2000); // Match the duration of the animation
}