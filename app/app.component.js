(function(){
'use strict';

angular.module("app")
.component('app', {
      controller: controller,
      templateUrl: 'app/app.template.html'
    })

    function controller(){
      const vm = this;

      vm.$onInit = onInit;
      vm.addNewItem = addNewItem;
      vm.deleteItem = deleteItem;
      vm.onceSum = onceSum;
      vm.monthlySum = monthlySum;
      vm.totalAmount = totalAmount;
      vm.monthlyContributionProfit = monthlyContributionProfit;
      vm.totalContributionProfit = totalContributionProfit;

      vm.newItemRev = {};
      vm.newItemExp = {};

      function onInit(){
        // initialize default data
        vm.itemsRev =[
          {
            name: "item 1",
            once: 550,
            monthly: 2450,
          },
          {
            name: "item 2",
            once: 120,
            monthly: 1230,
          },
          {
            name: "item 3",
            once: 400,
            monthly: 5300,
          }
        ]
        vm.itemsExp =[
          {
            name: "item a",
            once: 45,
            monthly: 350
          },
          {
            name: "item b",
            once: 200,
            monthly: 3500
          },
          {
            name: "item c",
            once: 10,
            monthly: 210
          }
        ]

        // initialize calculations for default data
        vm.onceSumRev = vm.onceSum(vm.itemsRev);
        vm.monthlySumRev = vm.monthlySum(vm.itemsRev);
        vm.totalRev = vm.totalAmount(vm.onceSumRev, vm.monthlySumRev);

        vm.onceSumExp = vm.onceSum(vm.itemsExp);
        vm.monthlySumExp = vm.monthlySum(vm.itemsExp);
        vm.totalExp = vm.totalAmount(vm.onceSumExp, vm.monthlySumExp);

        vm.monthlyContributionProfit(vm.monthlySumRev, vm.monthlySumExp);
        vm.totalContributionProfit(vm.totalRev, vm.totalExp);

      }

      function addNewItem(arr, newItem){
        if(newItem === vm.newItemRev){
          vm.itemsRev.push(vm.newItemRev);
        }
        else if(newItem === vm.newItemExp){
          vm.itemsExp.push(vm.newItemExp);
        }
        delete vm.newItemRev;
        delete vm.newItemExp;
      }

      function deleteItem (arr, item){
        var idx = 0;
        for(let i=0; i<arr.length; i++){
          if(arr[i].name === item.name){
            idx =i;
          }
        }
        arr.splice(idx,1);
      }

      function onceSum(arr){
        var sum = 0;
        for(var i=0; i< arr.length; i++){        
          sum += arr[i].once;
        }
        return sum;
      }

      function monthlySum(arr){
        var sum = 0;
        for(var i=0; i< arr.length; i++){        
          sum += arr[i].monthly;
        }
        return sum;
      }

      function totalAmount(num1, num2){
        return (num1 + num2) *12;
      }

      function monthlyContributionProfit(num1, num2){
        return num1 - num2;
      }

      function totalContributionProfit(num1, num2){
        return num1 - num2;
      }



  }

})();

//TODO:
// - done One-Time Revenue = Sum of the one-time column of all revenue items
// - done Monthly Revenue = Sum of the monthly column of all revenue items

// - done One-Time Expense = Sum of the one-time column of all expense items
// - done Monthly Expense = Sum of the monthly column of all expense items

// - done Total Revenue = One-Time Revenue + Monthly Revenue * 12
// - done Total Expenses = One-Time Expense + Monthly Expenses * 12
// - done Monthly Contribution Profit = Monthly Revenue – Monthly Expenses
// - done Total Contribution Profit = Total Revenue – Total Expenses
// - Contribution Margin = Total Contribution Profit / Total Revenue
// - Capital ROI (Months) = (One-Time Expenses – One-Time Revenue) / Monthly Contribution Profit