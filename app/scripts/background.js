/**
 * Listens for the app launching then creates the window
 *
 * @see http://developer.chrome.com/trunk/apps/app.runtime.html
 * @see http://developer.chrome.com/trunk/apps/app.window.html
 */
if (window.chrome) {
  window.chrome.app.runtime.onLaunched.addListener(function () {
    window.chrome.app.window.create('index.html',
      {
        id: 'radioplayer',
        bounds: {
          width: 350,
          height: 600
        }
      });
  });
}
