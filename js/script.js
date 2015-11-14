var data;
var options = {
    responsive: true,
    animation: false,
    legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>; padding-left: 10px; padding-right: 10px; border-right-style: solid; margin-right: 10px; border-right-width: 0px;\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
}

var ctx = document.getElementById("myChart").getContext("2d");


var calcApp = angular.module('calcApp', []);

calcApp.controller('mainController', function($scope) {
    $scope.heading = 'AMC Rate Calc';
    this.amc = 4;
    this.amcinc = 7;
    this.years = 5;
    this.amt = 2900000;
    this.cost = this.amt;
    this.revise = function revise() {
        var result = [];
        var amc = this.amc / 100;
        var amt = this.amt;
        var inc = this.amcinc / 100;
        amt = amt * amc;
        result.push({
            year: 1,
            amc: Number(amc * 100).toFixed(2),
            amount: Number(amt).toFixed(0)
        });
        for (var i = 2; i <= this.years; i++) {
            amc = amc + (amc * inc);
            amt = amt + (amt * inc);
            result.push({
                year: i,
                amc: Number(amc * 100).toFixed(2),
                amount: Number(amt).toFixed(0)
            });
        };
        this.total(result);
        return result;
    }

    this.total = function total(result) {
        this.cost = parseInt(this.amt);
        for (i in result) {
            this.cost += parseInt(result[i].amount);
        }
        this.amcamt = this.cost-this.amt;
        this.initGraph(result);
    }



    this.initGraph = function initGraph(result) {
        var agg = 0;
        data = {
            labels: [],
            datasets: []
        };
        data.labels.push(0);
        var temp = {
            label: "Payment @ "+this.amc + " % AMC",
            color: "rgba(151,187,205,0.2)",
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: []
        }
        var temp_total = {
            label: "Aggregated AMC Total",
            color: "rgba(220,220,220,0.2)",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: []
        }
        temp.data.push(this.amt);
        temp_total.data.push(agg);
        for (i in result) {
            agg += parseInt(result[i].amount);
            data.labels.push(result[i].year);
            temp.data.push(result[i].amount);
            temp_total.data.push(agg);
        }
        data.datasets.push(temp);
        data.datasets.push(temp_total);
        var lineChart = new Chart(ctx).Line(data, options);
        var legend = lineChart.generateLegend();
        $(".chart-legend").html(legend);
    }
});
