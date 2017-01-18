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
            page_not_exist: 'Oups ! La page n\'existe pas !!',
            back_to_home: 'Retourner à la page d\'accueil',
            404: '404',
          },
        },
        en: {
          common: {
            header_title: 'My super blog',
            posts_reload: 'reload posts',
            back_list: 'Back to list',
            read_more: 'Read more',
            page_not_exist: 'Oups ! The page not exist !!',
            back_to_home: 'Back to home page',
            404: '404',
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
