<?php
    $servername = "#"; 
    $username = "#"; 
    $password = "#"; 
    $dbname = "#"; 
    
    $phoneNumber = $_POST['phoneNumber'];
    $conn = mysqli_connect("#", "#", "#", "#");
    
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
        
    else { 
        echo "Connected successfully!";
    }
    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        $phoneNumber = $_POST['phoneNumber'];
        $name = $_POST['name'];
        $address = $_POST['address'];

        $sql = "SELECT * FROM users WHERE phone_number = '$phoneNumber'";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            $updateQuery = "UPDATE users SET name = '$name', address = '$address' WHERE phone_number = '$phoneNumber'";
            if ($conn->query($updateQuery) === TRUE) {
                echo "Record updated successfully";
            } else {
                echo "Error updating record: " . $conn->error;
            }
        } else {
            $insertQuery = "INSERT INTO users (phone_number, name, address) VALUES ('$phoneNumber', '$name', '$address')";
            if ($conn->query($insertQuery) === TRUE) {
                echo "New record created successfully";
            } else {
                echo "Error: " . $insertQuery . "<br>" . $conn->error;
            }
        }
    }

    $conn->close();
?>