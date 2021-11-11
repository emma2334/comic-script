javascript: (function () {
  [
    'https://code.jquery.com/jquery-2.1.4.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.5.0/jszip.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/jszip-utils/0.1.0/jszip-utils.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/1.3.8/FileSaver.min.js',
  ].forEach(e => {
    document.body.appendChild(document.createElement('script')).src = e;
  });

  setTimeout(() => {
    const zip = new JSZip();
    let fileName, img;
    switch (location.hostname) {
      default:
        fileName = $('title')[0].innerText;
        img = [...$('img')].map(e => e.getAttribute('src'));
    }
    img.forEach((e, i) => {
      zip.file(`${i}.jpg`, urlToPromise(e), { binary: true });
    });
    zip.generateAsync({ type: 'blob' }).then(
      function (content) {
        saveAs(content, `${fileName}.zip`);
      },
      function (error) {
        alert(error);
      }
    );
    function urlToPromise(url) {
      return new Promise(function (resolve, reject) {
        JSZipUtils.getBinaryContent(url, function (err, data) {
          err ? reject(err) : resolve(data);
        });
      });
    }
  }, 1000);
})();
