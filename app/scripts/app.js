'use strict';

/**
 * @ngdoc overview
 * @name webImageboardApp
 * @description
 * # webImageboardApp
 *
 * Main module of the application.
 */
var app = angular
  .module('app', [
    'ngCookies',
    'ngSanitize',
    'ui.router',
    'restmod',
    'ui.bootstrap',
    'wiz.validation',
    'file-model',
    'angularPromiseButtons',
    'ngImgur'
  ]);

app.constant('Options', {
  //baseUrl: 'http://192.168.1.5:9000',
  baseUrl: 'http://localhost:9000',
  //apiUrl : 'http://localhost:3000',
  apiUrl : 'https://neivacomentapi.herokuapp.com/',
});

// Restmod
app.config(function(restmodProvider) {
  restmodProvider.rebase('AMSApi')
})
