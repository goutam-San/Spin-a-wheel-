const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");
//object that stores values of minimum and maximum angle for a value
const rotationValues = [
    { minDegree: 0, maxDegree: 60, value: 1 },
    { minDegree: 61, maxDegree: 120, value: 2 },
    { minDegree: 121, maxDegree: 180, value: 3 },
    { minDegree: 181, maxDegree: 240, value: 4 },
    { minDegree: 241, maxDegree: 300, value: 5 },
    { minDegree: 301, maxDegree: 360, value: 6 },

];
//Size of each piece
const data = [16, 16, 16, 16, 16, 16];

//background color for each piece
var pieColors = [
    "#CBD18F",
    "#E3B448",
    "#CBD18F",
    "#E3B448",
    "#CBD18F",
    "#E3B448",
];

let myChart = new Chart(wheel, {
    plugins: [ChartDataLabels],
    type: "pie",

    data: {
        labels: ["No Luck", "10%", "5%", "15%", "10%", "5%"],

        datasets: [
            {
                backgroundColor: pieColors,
                data: data,
            },
        ],
    },

    options: {
        responsive: true,
        animation: { duration: 0 },
        plugins: {
            tooltip: false,
            legend: {
                display: false,
            },
            datalabels: {
                color: "#202020",
                shadow: "#ff6e40",
                formatter: (_, context) => context.chart.data.labels[context.dataIndex],
                font: { size: 20 },
            },
        },
    },
})

const valueGenerator = (angleValue) => {
    for (let i of rotationValues) {

        if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
            let discountMessage;

            switch (i.value) {
                case 1:
                    discountMessage = 'you won 5% discount';
                    break;
                case 2:
                    discountMessage = 'you won 10% discount';
                    break;
                case 3:
                    discountMessage = 'you won 15% discount';
                    break;
                case 4:
                    discountMessage = 'you won 5% discount';
                    break;
                case 5:
                    discountMessage = 'you won 10% discount';
                    break;
                case 6:
                    discountMessage = 'Sorry! Better Luck Next Time';
                    break;
                default:
                    discountMessage = '';
            }
            finalValue.innerHTML = `<p>${discountMessage}</p>`;
            showCelebrationAlert(discountMessage);
            spinBtn.disabled = false;
            break;
        }
    }
};

let count = 0;
let resultValue = 101;

//Start spinning
spinBtn.addEventListener("click", () => {
    spinBtn.disabled = true;
    finalValue.innerHTML = '<p>Good Luck!</p>';
    //Generate random degrees to stop at
    let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
    //Interval for rotation animation
    let rotationInterval = window.setInterval(() => {
        myChart.options.rotation = myChart.options.rotation + resultValue;
        myChart.update();
        if(myChart.options.rotation >= 360){
            count += 1;
            resultValue -= 5;
            myChart.options.rotation = 0;
        }
        else if(count > 15 && myChart.options.rotation == randomDegree){
            valueGenerator(randomDegree);
            clearInterval(rotationInterval);
            count = 0;
            resultValue = 101;
        }
    }, 10);
});

function showCelebrationAlert(message) {
    const celebrateAlert = document.getElementById("celebrate-alert");
    const closeBtn = document.getElementById("close-btn");
    const messageContainer = document.getElementById("message-container");

    messageContainer.innerHTML = `<p>${message}</p>`;
    celebrateAlert.style.display = "block";

    closeBtn.addEventListener("click", () => {
        var count = 1;
        celebrateAlert.style.display = "none";
        localStorage.setItem('discount', message);
        localStorage.setItem('clickCount', count );
        window.location.href='cart.html';
        //window.history.pushState({}, '', 'cart.html');
    });
}

// function showCelebrationAlert(message) {
//     const celebrateAlert = document.getElementById("celebrate-alert");
//     const closeBtn = document.getElementById("close-btn");
//     const messageContainer = document.getElementById("message-container");

//     messageContainer.innerHTML = `<p>${message}</p>`;
//     celebrateAlert.style.display = "block";

//     closeBtn.addEventListener("click", () => {
//         celebrateAlert.style.display = "none";
//         localStorage.setItem('discount', message);

//         // Check if the opener window exists
//         if (window.opener && !window.opener.closed) {
//             // Go back to the opener window
//             window.opener.location.reload(); // You can also use other methods as needed
//         }

//         // Close the current window
//         window.close();
//     });
// }
