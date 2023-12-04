import autoprefixer from 'autoprefixer';
import combineSelectors from 'postcss-combine-duplicated-selectors';
// import combineMediaQueries from 'postcss-combine-media-query';
// import compress from 'vite-plugin-compression';
// import imageMin from 'vite-plugin-imagemin';

const isProd = process.env.NODE_ENV === 'production';

export default {
    css: {
        postcss: {
            plugins: [
                combineSelectors({ removeDuplicatedValues: true }),
                autoprefixer(),
            ],
        },
    },
    build: {
        minify: isProd,
    },

};