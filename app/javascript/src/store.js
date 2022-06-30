define([
    'vue',
    'vuex',
    'vue-resource'
], function (Vue, Vuex, VueResource) {
    'use strict';
    Vue.use(Vuex);
    Vue.use(VueResource);

    return new Vuex.Store({
        state: {
            tasks: []
        },
        
        mutations: {
            setData: function(state, _ref) {
                state[_ref.type] = _ref.value;
            }
        },
        getters: {

        },
        actions: {
            getData: function(context, target) {
                var self = this;
                var targets = {
                    'tasks': '/tasks'
                };
                var url = targets[target];
                Vue.http.get(url).then( function(response){
                    self.commit('setData', { type: target, value: response.body });
                });
            }
        }
    });
    
});