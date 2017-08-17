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

      vm.totalSumColumn = totalSumColumn;
      vm.totalAmount = totalAmount;
      
      vm.countMonthlyContribution = countMonthlyContribution;
      vm.countTotalContribution = countTotalContribution;
      vm.countContributionMargin = countContributionMargin;
      vm.countCapitalROI = countCapitalROI;

      vm.newItemRev = {};
      vm.newItemExp = {};

      function onInit(){
        // initialize default data
        vm.itemsRev =[
          {
            name: "item 1",
            once: 100,
            monthly: 50,
          },
          {
            name: "item 2",
            once: 50,
            monthly: 25,
          },
          {
            name: "item 3",
            once: 25,
            monthly: 85,
          }
        ]
        vm.itemsExp =[
          {
            name: "item a",
            once: 500,
            monthly: 20
          },
          {
            name: "item b",
            once: 200,
            monthly: 40
          }
        ]

        // initialize calculations for default data
        recalc();
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
        recalc();
      }

      function deleteItem (arr, item){
        var idx = 0;
        for(let i=0; i<arr.length; i++){
          if(arr[i].name === item.name){
            idx =i;
          }
        }
        arr.splice(idx,1);
        recalc();
      }

      // Sum of the one-time/monthly column of all revenue/expense items
      function totalSumColumn(arr, frequency){
        var sum = 0;
        for(var i=0; i< arr.length; i++){        
          sum += arr[i][frequency];
        }
        return sum;
      }

      // One-Time Revenue/Expense + Monthly Revenue/Expence * 12
      function totalAmount(num1, num2){
        return num1 + (num2 * 12);
      }

      // Monthly Contribution Profit = Monthly Revenue – Monthly Expenses
      function countMonthlyContribution(){
        return vm.monthlySumRev - vm.monthlySumExp;
      }

      // Total Contribution Profit = Total Revenue – Total Expenses
      function countTotalContribution(){
        return vm.totalRev - vm.totalExp;
      }
      // Contribution Margin = Total Contribution Profit / Total Revenue
      function countContributionMargin(){
        if(vm.totalRev == 0) {
          return 0;
        }
        return (vm.totalContributionProfit/ vm.totalRev * 100).toFixed(0);
      }

      // Capital ROI (Months) = (One-Time Expenses – One-Time Revenue) / Monthly Contribution Profit
      function countCapitalROI(){
        if(vm.monthlyContributionProfit == 0){
          return 0;
        }
        return ((vm.onceSumExp - vm.onceSumRev) / vm.monthlyContributionProfit).toFixed(1);
      }

      function recalc(){
        vm.onceSumRev = vm.totalSumColumn(vm.itemsRev, 'once');
        vm.monthlySumRev = vm.totalSumColumn(vm.itemsRev, 'monthly');
        vm.totalRev = vm.totalAmount(vm.onceSumRev, vm.monthlySumRev);

        vm.onceSumExp = vm.totalSumColumn(vm.itemsExp, 'once');
        vm.monthlySumExp = vm.totalSumColumn(vm.itemsExp, 'monthly');
        vm.totalExp = vm.totalAmount(vm.onceSumExp, vm.monthlySumExp);
        
        vm.monthlyContributionProfit = vm.countMonthlyContribution();
        vm.totalContributionProfit = vm.countTotalContribution();
        vm.contributionMargin = vm.countContributionMargin();
        vm.capitalROI = vm.countCapitalROI();
      }
  }
})();