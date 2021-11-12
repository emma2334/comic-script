// ==UserScript==
// @name         快看打包
// @namespace    https://emma2334.github.io
// @version      0.1
// @description  連續打包快看漫畫成 zip 檔
// @author       Emma (emma2334)
// @homepage     https://emma2334.github.io
// @match        https://www.kuaikanmanhua.com/web/*
// @require      https://code.jquery.com/jquery-2.1.4.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/jszip/3.5.0/jszip.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/jszip-utils/0.1.0/jszip-utils.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/1.3.8/FileSaver.min.js
// @icon         https://www.google.com/s2/favicons?domain=kuaikanmanhua.com
// @grant        none
// @downloadURL  https://github.com/emma2334/comic-script/raw/master/kuaikan/kuaikan-packing.user.js
// ==/UserScript==

document.onreadystatechange = function() {
  'use strict';
  if(document.readyState !== 'complete') return

  if(window.location.pathname.match('topic/')) {
    $('.TopicItem:has(.lockedIcon)').css({
      'background-color': '#eaeaea',
      opacity: 0.3
    })
    return
  }

  function urlToPromise(url) {
    return new Promise(function(resolve, reject) {
      JSZipUtils.getBinaryContent(url, function (err, data) {
        err ? reject(err) : resolve(data);
      });
    });
  }
  var img = $('.imgList img').toArray().map(e => $(e).attr('data-src'));

  if(!img.length) return

  var zip = new JSZip();

  img.forEach((e, i) => {
    zip.file(`${i}.jpg`, urlToPromise(e), {binary:true});
  });
  zip.generateAsync({type:"blob"})
  .then(function(content) {
    const title = $('.listBox li[style] a').text()
    const index = $('.listBox li:not(.title) a').toArray().reverse().map((e, i) => $(e).text()).indexOf(title) + 1
    saveAs(content, `${$('.listBox li.title a').text()} - #${index} ${title}.zip`);

    if($('.AdjacentChapters.topNav .btn a')){
      setTimeout(() => {
        window.location.href = $('.AdjacentChapters.topNav .btn a').eq(1).attr('href')
      }, 1000)
    }
  }, function(error) {
    alert(error);
  });
}