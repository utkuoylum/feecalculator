// If the cart value is less than 10€, a small order surcharge is added to the delivery price. The surcharge is the difference between the cart value and 10€. For example if the cart value is 8.90€, the surcharge will be 1.10€.
// A delivery fee for the first 1000 meters (=1km) is 2€. If the delivery distance is longer than that, 1€ is added for every additional 500 meters that the courier needs to travel before reaching the destination. Even if the distance would be shorter than 500 meters, the minimum fee is always 1€.
// Example 1: If the delivery distance is 1499 meters, the delivery fee is: 2€ base fee + 1€ for the additional 500 m => 3€
// Example 2: If the delivery distance is 1500 meters, the delivery fee is: 2€ base fee + 1€ for the additional 500 m => 3€
// Example 3: If the delivery distance is 1501 meters, the delivery fee is: 2€ base fee + 1€ for the first 500 m + 1€ for the second 500 m => 4€
// If the number of items is five or more, an additional 50 cent surcharge is added for each item above five. An extra "bulk" fee applies for more than 12 items of 1,20€
// Example 1: If the number of items is 4, no extra surcharge
// Example 2: If the number of items is 5, 50 cents surcharge is added
// Example 3: If the number of items is 10, 3€ surcharge (6 x 50 cents) is added
// Example 4: If the number of items is 13, 5,70€ surcharge is added ((9 * 50 cents) + 1,20€)
// The delivery fee can never be more than 15€, including possible surcharges.
// The delivery is free (0€) when the cart value is equal or more than 100€.
// During the Friday rush (3 - 7 PM UTC), the delivery fee (the total fee including possible surcharges) will be multiplied by 1.2x. However, the fee still cannot be more than the max (15€).


function feeCalculator (cartValue, distance, items) {
    let fee = 0;
    let surcharge = 0;
    let deliveryFee = 0;
    if(cartValue < 10) surcharge += (10 - cartValue);
    distance <= 1000 ? fee += 2 : fee+= Math.ceil((distance-1000) / 500) + 2;
    if (items > 4)  surcharge += (items - 4) * 0.5;
    if (items > 12) surcharge += 1.2;
    let total = 0;
    new Date().getUTCDay() === 5 && new Date().getUTCHours() > 15 && new Date().getUTCHours() < 19 ? total += (fee + surcharge) * 1.2 : total += fee + surcharge;
    total < 15 ? deliveryFee += total : deliveryFee += 15;
    if(cartValue >= 100) deliveryFee = 0;
    document.getElementById('final').innerHTML = `Delivery fee is ${deliveryFee.toFixed(2)}€`;

}

function calculated (cartValue, distance, items) {
    if (cartValue !== "" && distance !== "" && items !== "" && cartValue > 0 && distance > 0 && items > 0) {
        
        feeCalculator(cartValue, distance, items);
    } else {
        document.getElementById('final').innerHTML = `Please enter all values`;
       }
}

function resetAll() {
    document.getElementById('cartValue').value = " ";
    document.getElementById('distance').value = " ";
    document.getElementById('items').value = " ";
    document.getElementById('final').innerHTML = "";


}