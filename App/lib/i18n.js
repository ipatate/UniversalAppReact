import i18next from 'i18next/';

// init i18n
const initLang = function initLang() {
  return new Promise((resolve, reject) => {
    i18next
    .init({
      lngs: ['fr', 'en'],
      lng: 'fr',
      ns: ['common'],
      defaultNS: 'common',
      resources: {
        fr: {
          common: {
            header_title: 'Mon super blog',
            posts_reload: 'recharger les articles',
            back_list: 'Retour à la liste',
            read_more: 'Lire la suite',
          },
        },
        en: {
          common: {
            header_title: 'My super blog',
            posts_reload: 'reload posts',
            back_list: 'Back to list',
            read_more: 'Read more',
          },
        },
      },
      parseMissingKeyHandler: (key) => {
        console.log('missing translate for: ', key);// eslint-disable-line
        return key;
      },
    },
    (err) => {
      if (err) {
        return reject(err);
      }
      return resolve(i18next);
    });
  });
};

export default initLang;
