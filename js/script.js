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

    }

});
