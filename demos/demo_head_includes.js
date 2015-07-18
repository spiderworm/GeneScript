;(function() {

  var projectRoot = "..";

  var scripts = document.querySelectorAll('script');
  var regex = /:\/\/[^\/]+(\/.*)\/demos\/demo_head_includes\.js/;
  Array.prototype.forEach.call(scripts, function(script) {
    if(regex.test(script.src)) {
      projectRoot = script.src.match(regex)[1];
    }
  });

  document.write('\
    <script src="' + projectRoot + '/node_modules/three/three.js"></script>\
    <script src="' + projectRoot + '/lib/threejs/FirstPersonControls.js"></script>\
    <script src="' + projectRoot + '/node_modules/mocha/mocha.js"></script>\
    <script src="' + projectRoot + '/lib/mocha/WebConsole.js"></script>\
    <script>mocha.setup({ui:"bdd",reporter:WebConsole});</script>\
    <script src="' + projectRoot + '/lib/mocha/expect.js"></script>\
    <script src="' + projectRoot + '/node_modules/requirejs/require.js"></script>\
    <script>\
      requirejs.config({\
        baseUrl: "' + projectRoot + '",\
        paths: {\
          waitSeconds: 0,\
          es6: "node_modules/requirejs-babel/es6",\
          babel: "node_modules/requirejs-babel/babel-4.6.6.min"\
        }\
      });\
    </script>\
    <link rel="stylesheet" href="' + projectRoot + '/demos/demo.css">\
  ');

})();