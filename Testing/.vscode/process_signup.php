<?php
// Check if the form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $email = $_POST["email"];
    $password = $_POST["password"];
    $studentType = $_POST["student-type"];
    
    // Validate and sanitize user input (add more validation as needed)
    $email = filter_var($email, FILTER_SANITIZE_EMAIL);
    
    // Hash the password (use a proper password hashing library in production)
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    
    // Database connection parameters
    $dbHost = "localhost";
    $dbUser = "root";
    $dbPassword = "aku12345,";
    $dbName = "";
    
    // Create a database connection
    $conn = new mysqli($dbHost, $dbUser, $dbPassword, $dbName);
    
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    
    // Insert user data into the database
    $sql = "INSERT INTO users (email, password, student_type) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sss", $email, $hashedPassword, $studentType);
    
    if ($stmt->execute()) {
        echo "Registration successful!";
    } else {
        echo "Error: " . $stmt->error;
    }
    
    // Close the database connection
    $stmt->close();
    $conn->close();
}
?>
