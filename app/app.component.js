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

      function onInit(){
        console.log("you're in the component");
      }
    }
})();