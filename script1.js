document.getElementById("loginForm").addEventListener("submit", function(event){
    event.preventDefault(); // Prevent the form from submitting

    // Get the username and password values
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("errorMessage");

    // Predefined correct credentials
    const correctUsername = "Adarsh";
    const correctPassword = "tirkey";

    // Check if the entered credentials match
    if(username === correctUsername && password === correctPassword) {
        // Successful login
        errorMessage.style.color = "green";
        errorMessage.textContent = "Login successful!";
        // Redirect to page2.html after 1 second
        setTimeout(function() {
            window.location.href = "page2.html";
        }, 1000);
    } else {
        // Invalid credentials
        errorMessage.style.color = "red";
        errorMessage.textContent = "Invalid username or password!";
    }
});