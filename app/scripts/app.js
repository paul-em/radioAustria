/*
 Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
 This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 Code distributed by Google as part of the polymer project is also
 subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

(function (document) {
  'use strict';

  // Grab a reference to our auto-binding templateGorillaz just releas
  // and give it some initial binding values
  // Learn more about auto-binding templates at http://goo.gl/Dx1u2g
  var manifest;
  var app = document.querySelector('#app');
  app.displayInstalledToast = function () {
    document.querySelector('#caching-complete').show();
  };

  // Listen for template bound event to know when bindings
  // have resolved and content has been stamped to the page
  app.addEventListener('dom-change', function () {
    var $ajaxManifest = document.querySelector('#ajax-manifest');
    var $version = document.querySelector('#version');
    var $playButton = document.querySelector('#play-button');
    var $volumeControl = document.querySelector('#volume-control');
    var $stationName = document.querySelector('#station-name');
    var $stationProgram = document.querySelector('#station-program');
    var $trackLoader = document.querySelector('#track-loader');
    var $programLoader = document.querySelector('#program-loader');
    var $trackList = document.querySelector('#track-list');
    var $stationList = document.querySelector('#station-list');
    var $settings = document.querySelector('#settings');
    var $songNotification = document.querySelector('#song-notification');
    var $programNotification = document.querySelector('#program-notification');
    var $menuLogo = document.querySelector('#menu-logo');
    var $stationLink = document.querySelectorAll('.station-link');

    $programNotification.clear('program');
    $songNotification.clear('song');

    $ajaxManifest.addEventListener('error', function (e) {
      console.error('ajaxManifest error', e);
      $ajaxManifest.url = '/manifests/manifest.json';
    });
    $ajaxManifest.addEventListener('response', function (e) {
      manifest = e.detail.response;
      if (!manifest) {
        throw new Error('no manifest found');
      }
      $trackLoader.url = manifest.app.tracklist;
      $programLoader.url = manifest.app.curProgram;
      $playButton.url = manifest.app.streamurl;
      $stationList.selected = manifest.short_name; // jshint ignore:line
      $stationName.textContent = manifest.name;
      $version.textContent = manifest.version;
      $menuLogo.src = 'images/logos/' + manifest.short_name + '-128-round.png'; // jshint ignore:line
      $programNotification.icon = __dirname + '/images/logos/' + manifest.short_name + '-128-round.png'; // jshint ignore:line
      $songNotification.icon = __dirname + '/images/logos/' + manifest.short_name + '-128-round.png'; // jshint ignore:line

      for (var i = 0; i < $stationLink.length; i++) {
        $stationLink[i].href = manifest.app.website;
      }

      var link = document.createElement('link');
      link.rel = 'import';
      link.href = './styles/' + manifest.short_name + '.html?t=' + Math.random(); // jshint ignore:line
      //link.href = '../styles/oe3.html';
      document.head.appendChild(link);
      link = document.createElement('link');
      link.rel = 'import';
      link.href = './styles/applyTheme.html?t=' + Math.random();
      document.head.appendChild(link);
      document.title = manifest.name;
      document.querySelector('link[rel=icon]').href = 'images/logos/' + manifest.short_name + '-16.png'; // jshint ignore:line
      document.querySelector('meta[name="theme-color"]').content = manifest.app.color;
      document.querySelector('meta[name="msapplication-TileColor"]').content = manifest.app.color;
      document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]').content = manifest.app.color;

    });

    $trackLoader.addEventListener('update', function (e) {
      $trackList.tracks = e.detail;
      if ($trackList.tracks[0]) {
        $songNotification.show({
          id: 'song',
          title: manifest.name, // jshint ignore:line
          message: ($trackList.tracks[0].song || '') + ($trackList.tracks[0].artist ? ' - ' + $trackList.tracks[0].artist : '')
        });
      }
    });
    $programLoader.addEventListener('update', function (e) {
      var response = e.detail;
      $stationProgram.textContent = response.currentBroadcast || '';
      if (response && response.currentBroadcast) {
        $programNotification.show({
          id: 'program',
          title: manifest.name + ' - program', // jshint ignore:line
          message: response.currentBroadcast + ' ( ' + response.currentBroadcastTime + ' - ' + response.nextBroadcastTime + ' )'
        });
      }
    });
    $volumeControl.addEventListener('update', function (e) {
      $playButton.volume = e.detail;
    });
    $stationList.addEventListener('update', function (e) {
      $ajaxManifest.url = '/manifests/manifest-' + e.detail + '.json';
    });
    if (document.location.search.indexOf('station') !== -1) {
      $ajaxManifest.url = '/manifests/manifest-' + document.location.search.substr(-3) + '.json';
    }
    $settings.addEventListener('update', function (e) {
      $programNotification.enabled = e.detail.programNotify;
      $songNotification.enabled = e.detail.songNotify;
      if (window.chrome && window.chrome.app && window.chrome.app.window) {
        var currentWindow = (window.chrome.app.window && window.chrome.app.window.current());
        currentWindow.setAlwaysOnTop(!!e.detail.foreground);
      }
    });

    //page.show('/');
  });


  // See https://github.com/Polymer/polymer/issues/1381
  window.addEventListener('WebComponentsReady', function () {

    // We use Page.js for routing. This is a Micro
    // client-side router inspired by the Express router
    // More info: https://visionmedia.github.io/page.js/
    if (window.chrome && window.chrome.app && window.chrome.app.window) {
      try {
        //window.history = window.history || {};
        window.history.pushState = function () {
        };
        window.history.replaceState = function () {
          page.show('/');
        };
        window.history.back = function () {
        };
      } catch (e) {
        console.log('failed to overwrite window history');
      }
    }

    page('/', function () {
      app.route = 'home';
    });

    page('/settings', function () {
      app.route = 'settings';
    });

    page('/info', function () {
      app.route = 'info';
    });

    page('/stations', function () {
      app.route = 'stations';
    });

    // add #! before urls
    page({
      hashbang: true
    });

    page.show('/');

  });

  // Close drawer after menu item is selected if drawerPanel is narrow
  app.onMenuSelect = function () {
    var drawerPanel = document.querySelector('#paperDrawerPanel');
    if (drawerPanel.narrow) {
      drawerPanel.closeDrawer();
    }
  };


})(document);
