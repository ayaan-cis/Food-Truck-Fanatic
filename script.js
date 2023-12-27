// Assignment-11 – COSC 2328 – Professor McCurry
// Implemented by - Ayaan Syed

function displayTacoOrderForm() {  // Function to display the taco order form
    document.getElementById('orderForm').style.display = 'block';
}

let enteredPhoneNumber = '';  // Global variable to check if the phone number has been entered

function checkPhoneNumber() {
    const phoneNumber = document.getElementById('phoneNumber').value;
    const phoneNumberExists = phoneNumber.length === 10;

    if (!phoneNumberExists || phoneNumber !== enteredPhoneNumber) {
        enteredPhoneNumber = phoneNumber; // Update the entered phone number

        // If the phone number does not exist or is different, prompt for name and address
        promptForNameAndAddress();
    } else {
        showUserInfoSection();
        // Populate user info (dummy data for now)
        document.getElementById('userName').innerText = "John Doe";
        document.getElementById('userAddress').innerText = "3585 Example Address Ave.";
        displayTacoOrderForm();
    }
}

function promptForNameAndAddress() {
    document.getElementById('addInfo').style.display = 'block'; // Show the form to input name and address
    document.getElementById('userInfo').style.display = 'none'; // Hide user info section

    // Clear previously entered user info
    document.getElementById('userName').innerText = '';
    document.getElementById('userAddress').innerText = '';

    // Optionally, you can reset other form fields here
}

function submitUserInfo() {
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    console.log('Submitted user info:', name, address);

    document.getElementById('userName').innerText = name; // Display submitted name
    document.getElementById('userAddress').innerText = address; // Display submitted address

    showUserInfoSection();
    displayTacoOrderForm();
}


function showUserInfoSection() {  // Function to show the user info section and hide the add info section
    document.getElementById('userInfo').style.display = 'block';
    document.getElementById('addInfo').style.display = 'none';  
}


function addToOrder() {  // Function to add the order to the order summary list and calculate the total price
    const tacoType = document.getElementById('tacoType').value;
    const quantity = document.getElementById('quantity').value;
    const price = calculatePrice(tacoType);
    const drink = document.getElementById('drink').value;
    const drinkPrice = calculateDrinkPrice(drink);
    const totalPrice = price * quantity + drinkPrice; 

    if (tacoType === '' && drink === '') {
        alert("Please select a taco or a drink."); // Alert the user if neither taco nor drink is selected
        return;
    }

    console.log(`Taco: ${tacoType}, Quantity: ${quantity}, Total Price: $${totalPrice}, Drink: ${drink}, Drink Price: $${drinkPrice}`);

    const orderSummary = document.getElementById('orderSummary');
    if (orderSummary) {
        const listItem = document.createElement('li');
        listItem.textContent = `${quantity} ${tacoType} - $${price * quantity} + $${drinkPrice} ${drink}`;
        orderSummary.appendChild(listItem);  // Add the order to the order summary list as a list item
    }
}

function calculatePrice(tacoType) {  // Prices for each taco on the menu
    let price = 0;

    if (tacoType === "Al Pastor") {
        return 5.99;
    } 
    
    else if (tacoType === "Barbacoa") { 
        return 6.49;
    }

    else if (tacoType === "Birria") {
        return 6.99;
    }
    
    else if (tacoType === "Carne Asada") {
        return 9.99;
    }

    else if (tacoType === "Mahi Mahi") {
        return 7.99;
    }
    
    else if (tacoType === "Shrimp"){
        return 4.99;
    }

    return price;
}

function calculateDrinkPrice(drink) {  // Prices for each drink on the menu
    let drinkprice = 0;

    if (drink === "Coke" || drink === "Dr. Pepper" || drink === "Sunkist") {
        return 1.99;
    } 

    else if (drink === "Tea") {
        return 14.99;
    }
    
    else if (drink === "Water"){
        return 0.99;
    }

    return drinkprice;


}

function completeOrder() {  // For Button 'complete order' to calculate the total price of the order and display it
    const orderSummary = document.getElementById('orderSummary');
    const totalBox = document.querySelector('.orderTotal');

    if (totalBox) {
        totalBox.remove(); // Removes the existing total box if currently displayed
    }

    let totalTacoPrice = 0;
    let totalDrinkPrice = 0;

    orderSummary.childNodes.forEach(item => {  // Loop through each item in the order summary list
        const itemText = item.textContent;
        const tacoPriceIndex = itemText.indexOf('$');
        const drinkPriceIndex = itemText.lastIndexOf('$');
        const tacoPrice = parseFloat(itemText.substring(tacoPriceIndex + 1, drinkPriceIndex - 2)); // Extract taco price
        const drinkPrice = parseFloat(itemText.substring(drinkPriceIndex + 1)); // Extract drink price

        totalTacoPrice += tacoPrice;
        totalDrinkPrice += drinkPrice;
    });

    const totalPrice = totalTacoPrice + totalDrinkPrice; // Calculate total price for both tacos and drinks
    const newTotalBox = document.createElement('div');  // Create a new div to display the total price

    const totalAmount = document.createElement('h3');
    totalAmount.textContent = `Total: $${totalPrice.toFixed(2)}`;
    newTotalBox.appendChild(totalAmount);
    newTotalBox.classList.add('orderTotal');
    document.body.appendChild(newTotalBox);  // Add the total price to the body of the page
}

function clearOrder() {  // Function to clear the order summary list and the total price box
    const orderSummary = document.getElementById('orderSummary');  // Clear the order summary list
    orderSummary.innerHTML = '';
    const orderTotalBox = document.querySelector('.orderTotal');  // Clear the total price box if it exists
    if (orderTotalBox) {
        orderTotalBox.remove();  
    }
}

function submitPhoneNumber(event) {
    event.preventDefault(); // Prevent form submission
    
    const phoneNumber = document.getElementById('phoneNumber').value;
    
    const xhr = new XMLHttpRequest();  // Create new AJAX request
    xhr.open('POST', 'php/dbd.inc.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                handlePhoneNumberResponse(xhr.responseText);  // Handle the response
            } 
            
            else {
                console.error('AJAX request failed'); // Log error if AJAX request fails
            }
        }
    };
    
    // Send the request with the phone number data
    xhr.send('phoneNumber=' + encodeURIComponent(phoneNumber));
}

function handlePhoneNumberResponse(response) {
    const userInfoDisplay = document.getElementById('userInfoDisplay');
    
    const data = JSON.parse(response);  // Parse the JSON response
    
    if (data.name && data.address) {
        userInfoDisplay.innerHTML = `
            <p>Name: ${data.name}</p>
            <p>Address: ${data.address}</p>
        `;  // Display user info if available
    } else {
        userInfoDisplay.innerHTML = 'Phone number not found. Please provide your name and address.'; // Display error message if user info is not available
    }

}
