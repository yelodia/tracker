window.delay = function(t) {
    return new Promise(function(resolve) {
        setTimeout(resolve, t)
    });
};
require([
    'app',
    'vue',
    'bootstrap-vue',
    'vuex',
    'vue-router',
    'vue-resource',
    'vue-notifyjs',
    'components/worksActions',
    'components/worksGallery',
    'expose-loader?moment!moment',
    'expose-loader?jQuery!expose-loader?$!jquery', // access to global
    //'lodash',
], function (app, Vue, BootstrapVue) {
    
});

