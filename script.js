let loanAmountInput = document.querySelector("#amount");
let interestRateInput = document.querySelector("#interest-rate");
let tenureInput = document.querySelector("#tenure");
let emiAmount = document.querySelector(".payable-emi-amount");
let interestAmount = document.querySelector(".payable-emi-interest");
let totalAmountPayable = document.querySelector(".payable-total-amount");
let calculateButton = document.querySelector(".calculate");

let loanAmount = Number(loanAmountInput.value);
let interestRate = Number(interestRateInput.value) / 12 / 100;
let tenure = Number(tenureInput.value) * 12;

const calculateEMI = (loanAmount, interestRate, tenure) => {
  return (
    (loanAmount * interestRate * Math.pow(1 + interestRate, tenure)) /
    (Math.pow(1 + interestRate, tenure) - 1)
  );
};

let emiPayable = calculateEMI(loanAmount, interestRate, tenure);
let TotalAmount = Math.round(emiPayable * tenure);
let interestPayable = (interest = Math.round(TotalAmount - loanAmount));

let myChart;
const displayChart = (loanAmountValue, interestValue) => {
  const ctx = document.getElementById("myChart").getContext("2d");
  myChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Loan Amount", "Total Interest"],
      datasets: [
        {
          data: [loanAmountValue, interestValue],
          backgroundColor: ["#e63946", "#14213d"],
          borderWidth: 0,
        },
      ],
    },
  });
};

const updateChart = (loanAmountValue, interestValue) => {
  myChart.data.datasets[0].data[0] = loanAmountValue;
  myChart.data.datasets[0].data[1] = interestValue;
  myChart.update();
};

displayChart(loanAmount, interestPayable);

calculateButton.addEventListener("click", function (e) {
  loanAmount = Number(loanAmountInput.value);
  interestRate = Number(interestRateInput.value) / 12 / 100;
  tenure = Number(tenureInput.value) * 12;
  let emi = calculateEMI(loanAmount, interestRate, tenure);
  let totalAmount = Math.round(emi * tenure);
  let interest = Math.round(totalAmount - loanAmount);
  emi = Math.round(emi);
  emiAmount.textContent = "₹ " + emi;
  interestAmount.textContent = "₹ " + interest;
  totalAmountPayable.textContent = "₹ " + totalAmount;
  updateChart(loanAmount, interest);
});
