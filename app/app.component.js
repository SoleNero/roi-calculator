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

      function onInit(){
        vm.itemsRev =[
          {
            name: "item 1",
            oneTime: 550,
            monthly: 2450,
          },
          {
            name: "item 2",
            oneTime: 120,
            monthly: 1230,
          },
          {
            name: "item 3",
            oneTime: 400,
            monthly: 5300,
          }
        ]
        vm.itemsExp =[
          {
            name: "item a",
            oneTime: 45,
            monthly: 350
          },
          {
            name: "item b",
            oneTime: 200,
            monthly: 3500
          },
          {
            name: "item c",
            oneTime: 10,
            monthly: 210
          }
        ]
        vm.newItemRev = {};
        vm.newItemExp = {};
      }

      function addNewItem(arr, newItem){
        if(newItem === vm.newItemRev){
          vm.itemsRev.push({
            name: vm.newItem.name,
            oneTime: vm.newItem.oneTime,
            monthly: vm.newItem.monthly
          });
        }
        else if(newItem === vm.newItemExp){
          vm.itemsExp.push({
            name: vm.newItem.name,
            oneTime: vm.newItem.oneTime,
            monthly: vm.newItem.monthly
          });
        }
        vm.newItem.name ="";
        vm.newItem.oneTime ="";
        vm.newItem.monthly="";
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
    }
})();

//TODO:
// - One-Time Revenue = Sum of the one-time column of all revenue items
// - Monthly Revenue = Sum of the monthly column of all revenue items

// - One-Time Expense = Sum of the one-time column of all expense items
// - Monthly Expense = Sum of the monthly column of all expense items

// - Total Revenue = One-Time Revenue + Monthly Revenue * 12
// - Total Expenses = One-Time Expense + Monthly Expenses * 12
// - Monthly Contribution Profit = Monthly Revenue – Monthly Expenses
// - Total Contribution Profit = Total Revenue – Total Expenses
// - Contribution Margin = Total Contribution Profit / Total Revenue
// - Capital ROI (Months) = (One-Time Expenses – One-Time Revenue) / Monthly Contribution Profit