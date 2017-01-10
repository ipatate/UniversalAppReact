import i18next from 'i18next/';

// init i18n
const initLang = function initLang() {
  return new Promise((resolve, reject) => {
    i18next
    .init({
      lngs: ['fr', 'en'],
      lng: 'fr',
      resources: {
        fr: {
          translation: {
            lol: 'aller sur Lol',
            number_of_click: 'Nombre de click',
          },
        },
        en: {
          translation: {
            lol: 'go to Lol',
            number_of_click: 'Number of click',
          },
        },
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
