getData("Portugal"); //starts the page with the Portugal graph

function getCountries(){
    $.getJSON("https://raw.githubusercontent.com/samayo/country-json/master/src/country-by-name.json", function(data){
        $.each(data, function(i, field){
            console.log(data);
            let country = [];
            for (var i = 0; i < data.length; i++) {
              country.push(data[i].country);
              $("#listCountries").append(
                "<p class='country'>" + data[i].country + "</p>"
              );
            }
        })
    }) //get JSON data
}

function getData(country){
    $.getJSON("https://pomber.github.io/covid19/timeseries.json", function(data){
        $.each(data, function(i, field){
            console.log(data); //logs into some arrays the values of the JSON data
            let dates = [];
            let confirmed = [];
            let deaths = [];
            let recovered = [];
            for (var i = 0; i < data[country].length; i++) {
                if (data[country][i].confirmed != 0) {
                    dates.push(data[country][i].date);
                    confirmed.push(data[country][i].confirmed);
                    deaths.push(data[country][i].deaths);
                    recovered.push(data[country][i].recovered);
                }}
        console.log(confirmed); //confirm down texts were well placed
        $("#confirmed").text(confirmed[confirmed.length - 1]); 
        $("#deaths").text(deaths[deaths.length - 1]);
        $("#recovered").text(recovered[recovered.length - 1]);
        createChart(country, dates, confirmed, deaths, recovered); //calls the function to create a graph
    })}) //gets the JSON data
    setTimeout(getData, 3600000); //Updates every hour
}

var TheChart;
function createChart (country, dates, confirmed, deaths, recovered){ //creates the graph
var info = {
    type: "line",
    animationEnabled: true,
    data:{
        labels: dates,
        datasets:[
            {
            label: country + " Confirmed Cases",
            fill: false,
            data: confirmed,
            borderColor: "rgba(248, 235, 0)",
            backgroundColor: "rgba(255, 248, 0)",
            borderWidth: "2",
            radius: "3",
            },
            {
            label: country + " Deaths",
            fill: false,
            data: deaths,  
            borderColor: "rgba(205, 18, 0)",
            backgroundColor:"rgba(252, 11, 0)",
            borderWidth: "2",
            radius: "3",
            },
            {
            label: country + " Recovers",
            fill: false,
            data: recovered,
            borderColor: "rgba(49, 173, 0)",
            backgroundColor:"rgba(80, 204, 31)",
            borderWidth: "2",
            radius: "3",
            },
        ],
    },
    options: {
        legend: {
            labels: {
                fontColor: "black",
                fontSize: 20,
                fontFamily: 'Courier New',
                fontStyle: 'italic',
            },
            position: 'bottom',
        },
        scales: {
            gridLines: {
                display: true,
            },
            xAxes: [
            {
                ticks: {
                    fontColor: "black",
                    fontSize: 12,
                    interval: 1,
                    fontFamily: 'Courier New',
                    beginAtZero: true,
                },
            },
            ],
            yAxes: [
            {
                ticks: {
                    fontColor: "black",
                    fontSize: 12,
                    fontFamily: 'Courier New',
                    fontStyle: 'bold',
                    beginAtZero: true,
                },
            },
            ],
            
        },
    },
};
    var ctx = document.getElementById("theChart").getContext("2d");
    TheChart = new Chart(ctx, info);
}

function updateChartLables(Chart, text) { //update the lables of a Chart when this is changedx
      Chart.data.datasets[0].label = text;
      Chart.update();
  }

$(".country").click(function () { //Everytime a person chooses a country, get the info of the one and destroy the previous chart
    let name = $(this).html();
    TheChart.destroy();
    $(".countryName").text(name);
  
    getData(name);
  
    updateChartLables(TheChart, name);
    console.log(name.length);
  });

  var resetCanvas = function () {
    $("#TheChart").remove(); // this is my <canvas> element
    $("#chartContainer").append('<canvas id="TheChart"><canvas>');
    canvas = document.querySelector("#TheChart");
    ctx = canvas.getContext("2d");
    ctx.canvas.width = $("#TheChart").width(); // resize to parent width
    ctx.canvas.height = $("#TheChart").height(); // resize to parent height
  
    var x = canvas.width / 2;
    var y = canvas.height / 2;
    ctx.font = "10pt Verdana";
    ctx.textAlign = "center";
    ctx.fillText("This text is centered on the canvas", x, y);
  };

function openNav() {
    document.getElementById("sideBar").style.width = "250px";
}

function closeNav() {
    document.getElementById("sideBar").style.width = "0";
}

function search() {
    $(document).ready(function () {
        $("#search").on("keyup", function () {
            var value = $(this).val().toLowerCase();
            $("#listCountries p").filter(function () {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
            });
        });
    });
}