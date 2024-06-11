<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect form data
    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $email = $_POST['email'];

    // Validate form data
    if (empty($name) || empty($phone) || empty($email)) {
        echo "<div style='color: red; font-weight: bold;'>Please fill all the fields.</div>";
        die();
    }

    // Database connection
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "floatus";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("<div style='color: red; font-weight: bold;'>Connection failed: " . $conn->connect_error . "</div>");
    }

    // Insert data into database
    $sql = "INSERT INTO contacts (name, phone, email) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sss", $name, $phone, $email);

    if ($stmt->execute()) {
        echo "<div style='color: green; font-weight: bold;'>New record created successfully</div>";
    } else {
        echo "<div style='color: red; font-weight: bold;'>Error: " . $sql . "<br>" . $conn->error . "</div>";
    }

    // Close connection
    $stmt->close();
    $conn->close();

    // Send email using PHPMailer
    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->SMTPDebug = 0; // Disable verbose debug output
        $mail->isSMTP(); // Set mailer to use SMTP
        $mail->Host = 'smtp.gmail.com'; // Specify main and backup SMTP servers
        $mail->SMTPAuth = true; // Enable SMTP authentication
        $mail->Username = 'test@gmail'; // SMTP username
        $mail->Password = 'test@123'; // SMTP password
        $mail->SMTPSecure = 'tls'; // Enable TLS encryption, `ssl` also accepted
        $mail->Port = 587; // TCP port to connect to

        // Recipients
        $mail->setFrom('test@gmail.com', 'Mailer');
        $mail->addAddress('sundarmanikandan2711@gmail.com'); // Add a recipient

        // Content
        $mail->isHTML(true); // Set email format to HTML
        $mail->Subject = 'Contact Form Submission';
        $mail->Body    = "Name: $name<br>Phone: $phone<br>Email: $email";
        $mail->AltBody = "Name: $name\nPhone: $phone\nEmail: $email";

        $mail->send();
        echo "<div style='color: green; font-weight: bold; margin-top: 10px;'>Email sent successfully.</div>";
    } catch (Exception $e) {
        echo "<div style='color: red; font-weight: bold; margin-top: 10px;'>Email could not be sent. Mailer Error: {$mail->ErrorInfo}</div>";
    }
}
?>
