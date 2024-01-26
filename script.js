// Function to update quantity, subtotal, and total price
function updateQuantityAndTotal(row, action) {
    // Get the current quantity
    var quantityElement = row.querySelector('.quantity-buttons span');
    var currentQuantity = parseInt(quantityElement.textContent) || 1; // Default to 1 if not a valid number

    // Update the quantity based on the action (increase or decrease)
    if (action === 'increase') {
        currentQuantity++;
    } else if (action === 'decrease' && currentQuantity > 1) {
        currentQuantity--;
    }

    // Update the quantity cell
    quantityElement.textContent = currentQuantity;

    // Update the subtotal cell
    var priceElement = row.querySelector('.product-info .price');
    var subtotalElement = row.cells[2];
    var price = parseFloat(priceElement.textContent.replace('₹', '')) || 0; // Default to 0 if not a valid number
    var subtotal = currentQuantity * price;
    subtotalElement.textContent = '₹' + subtotal.toFixed(2);

    // Update the total price
    updateTotalPrice();
}

// Function to update total price
function updateTotalPrice() {
    var tableRows = document.querySelectorAll('.cart-table tbody tr');
    var totalPriceElement = document.getElementById('discounted-total');
    var totalPrice = 0;

    tableRows.forEach(function (row) {
        var subtotalElement = row.cells[2];
        totalPrice += parseFloat(subtotalElement.textContent.replace('₹', '')) || 0; // Default to 0 if not a valid number
    });

    totalPriceElement.textContent = '₹' + totalPrice.toFixed(2);
}

// Attach event listeners to the buttons outside the loop
document.querySelectorAll('.cart-table tbody tr').forEach(function (row) {
    var increaseButton = row.querySelector('.increase-button');
    var decreaseButton = row.querySelector('.decrease-button');

    increaseButton.addEventListener('click', function () {
        updateQuantityAndTotal(row, 'increase');
    });

    decreaseButton.addEventListener('click', function () {
        updateQuantityAndTotal(row, 'decrease');
    });
});

// Call the function to apply discount and update total
applyDiscountAndUpdateTotal();

function applyDiscountAndUpdateTotal() {
    // Step 1: Extract Discount Percentage from the message in localStorage
    var discountMessage = localStorage.getItem('discount') || '';
    console.log('Discount message:', discountMessage);
    var discountPercentage = extractDiscountPercentage(discountMessage);

    // Step 2: Update Total Price with Discount
    if (discountPercentage !== null) {
        updateTotalWithDiscount(discountPercentage);
    }
}

// Function to extract discount percentage from a string
function extractDiscountPercentage(message) {
    var regex = /(\d+)%/; // Match one or more digits followed by '%'
    var match = message.match(regex);
    return match ? parseFloat(match[1]) : null; // Extract the numeric value or return null
}

// Function to update total price with a given discount percentage
function updateTotalWithDiscount(discountPercentage) {
    var tableRows = document.querySelectorAll('.cart-table tbody tr');
    var totalPriceElement = document.getElementById('discounted-total');
    var totalPrice = 0;

    tableRows.forEach(function (row) {
        var subtotalElement = row.cells[2];
        var price = parseFloat(subtotalElement.textContent.replace('₹', '')) || 0; // Default to 0 if not a valid number
        var discountedSubtotal = applyDiscount(price, discountPercentage);
        totalPrice += parseFloat(discountedSubtotal);
        subtotalElement.textContent = '₹' + discountedSubtotal.toFixed(2);
    });

    totalPriceElement.textContent = '₹' + totalPrice.toFixed(2);
}

// Function to apply discount to a given price
function applyDiscount(price, discountPercentage) {
    var discountFactor = 1 - (discountPercentage / 100);
    return price * discountFactor;
}
