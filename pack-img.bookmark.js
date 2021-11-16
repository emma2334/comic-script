javascript: (function () {
  [
    'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.5.0/jszip.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/jszip-utils/0.1.0/jszip-utils.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/1.3.8/FileSaver.min.js',
  ].forEach(e => {
    document.body.appendChild(document.createElement('script')).src = e;
  });
  const $ = query => document.querySelectorAll(query);

  let fileName, imgURLs;
  switch (location.hostname) {
    /* Add your own rules */
    default:
      fileName = $('title')[0].innerText;
      imgURLs = [...$('img')].map(e => e.getAttribute('src'));
  }

  setTimeout(() => {
    const zip = new JSZip();
    Promise.all(
      imgURLs.map(async (url, i) => {
        try {
          const data = await JSZipUtils.getBinaryContent(url);
          const FILExt = getMimeType(data);
          zip.file(`${i}.${FILExt}`, data, { binary: true });
        } catch (e) {
          return Promise.reject(e);
        }
      })
    )
      .then(() => {
        zip.generateAsync({ type: 'blob' }).then(content => {
          saveAs(content, `${fileName}.zip`);
        });
      })
      .catch(e => {
        alert(e);
      });

    function getMimeType(signature) {
      const mimeType = [...new Uint8Array(signature).slice(0, 4)]
        .map(e => e.toString(16))
        .join('')
        .toUpperCase();

      switch (mimeType) {
        case '89504E47':
          return 'png';
        case '47494638':
          return 'gif';
        default:
          return 'jpg';
      }
    }
  }, 1000);
})();
