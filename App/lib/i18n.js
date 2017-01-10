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
            hello: 'bonjour monde',
            title: 'Exemple d\'utilisation d\'i18next avec React',
          },
        },
        en: {
          translation: {
            hello: 'hello world',
            title: 'Example of use i18next with React',
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
