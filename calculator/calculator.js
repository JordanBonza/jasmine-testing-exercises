window.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById("calc-form");
  if (form) {
    setupIntialValues();
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      update();
    });
  }
});

function getCurrentUIValues() {
  return {
    amount: +(document.getElementById("loan-amount").value),
    years: +(document.getElementById("loan-years").value),
    rate: +(document.getElementById("loan-rate").value),
  }
}



function setupIntialValues() {
  // Put some default values in the inputs
  const values = {amount: 12457, years: 5, rate: 6.5};

  // Get the inputs from the DOM.
  let amountUI = document.getElementById("loan-amount");
  amountUI.value = values.amount;
  let yearsUI = document.getElementById("loan-years");
  yearsUI.value = values.years;
  let rateUI = document.getElementById("loan-rate");
  rateUI.value = values.rate;

  // Call a function to calculate the current monthly payment
  update();
}


function update() {
  // Get the current values from the UI
  // values = getCurrentUIValues();
  const currentUIValues= getCurrentUIValues();
  // Update the monthly payment
  // updateMonthly(calculateMonthlyPayment(values));
  updateMonthly(calculateMonthlyPayment(currentUIValues));
}


function calculateMonthlyPayment(values) {
  // calculate the monthly payment.  The output should be a string
  const monthlyRate = (values.rate / 100) /12;
  let n = Math.floor(values.years * 12);
  // return
  // (
  //   (monthlyRate * values.amount)/
  //   (1 - Math.pow((1+monthyRate), - n))
  //   // that always has 2 decimal places.
  // ).toFixed(2);
  return (
    (monthlyRate * values.amount) /
    (1 - Math.pow((1 + monthlyRate), -n))
  ).toFixed(2);
}

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
 let monthlyUI = document.getElementById("monthly-payment");
 monthlyUI.innerText = "$" + monthly; 
}

// function updateMonthly(monthly) {
//   const monthlyUI = document.getElementById("monthly-payment");
//   monthlyUI.innerText = "$" + monthly;
// }
