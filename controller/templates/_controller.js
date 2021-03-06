<% if (passFunc) { %>(function () {
  <% } %>'use strict';<% if (passFunc) { %>

  /**
   * @ngdoc object
   * @name <% if (parentModuleName) { %><%= parentModuleName %>.<% } %><%= moduleName %>.controller:<%= ctrlName %><% if(!controllerAs) { %>
   * @requires $scope <% } %>
   * @function
   * 
   * @description
   * 
   *
   * @ngInject
   *
   */
  function <%= ctrlName %>(<% if (!controllerAs) { %>$scope<% } %>) {
    <% if (controllerAs) { %>var vm = this;
    vm.ctrlName = '<%= ctrlName %>';<% } else { %>$scope.ctrlName = '<%= ctrlName %>';<% } %>
  }<% } %>

<% if (!passFunc) { %>/**
 * @ngdoc object
 * @name <% if (parentModuleName) { %><%= parentModuleName %>.<% } %><%= moduleName %>.controller:<%= ctrlName %><% if(!controllerAs) { %>
 * @requires $scope <% } %>
 * 
 * @description
 * 
 *
 */
<% } %><% if (passFunc) { %>  <% } %>angular
<% if (passFunc) { %>  <% } %>  .module('<% if (parentModuleName) { %><%= parentModuleName %>.<% } %><%= moduleName %>')<% if (passFunc) { %>
<% if (passFunc) { %>  <% } %>  .controller('<%= ctrlName %>', <%= ctrlName %>);<% } else { %>
<% if (passFunc) { %>  <% } %>  .controller('<%= ctrlName %>', function <% if (namedFunc) { %><%= ctrlName %><% } %>(<% if (!controllerAs) { %>$scope<% } %>) {
<% if (passFunc) { %>  <% } %>    <% if (controllerAs) { %>var vm = this;
<% if (passFunc) { %>  <% } %>    vm.ctrlName = '<%= ctrlName %>';<% } else { %>$scope.ctrlName = '<%= ctrlName %>';<% } %>
<% if (passFunc) { %>  <% } %>  });<% } %>
<% if (passFunc) { %>
})();<% } %>
