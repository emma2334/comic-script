javascript: (function () {
  let query;
  switch (window.location.hostname) {
    case 'www.kuaikanmanhua.com':
      query = '.TopicItem .title span';
      break;
    case 'www.webtoons.com':
      query = '#_listUl .subj span';
      break;
    case 'tw.kakaowebtoon.com':
      query = '.is-current a > div > p';
      break;
  }
  const list = [...document.querySelectorAll(query)]
    .reverse()
    .map(e => e.innerText.trim())
    .join('\n\n');

  navigator.clipboard.writeText(list).then(
    () => console.log('Copy success!'),
    () => console.log(list)
  );
})();
