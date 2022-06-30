window.delay = function(t) {
    return new Promise(function(resolve) {
        setTimeout(resolve, t)
    });
};
require([
    'tasks',
    'vue',
    'vuex',
    'vue-resource',
    'vue-notifyjs',
    'components/taskItem',
    'expose-loader?moment!moment',
    //'lodash',
], function (app, Vue, BootstrapVue) {
    
});

