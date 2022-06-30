define([
    'vue',
    'bootstrap-vue',
    'store',
    'router',
    'html/app.html',
    'vue-notifyjs'
], function (Vue, BootstrapVue, Store, Router, Tpl, Notify) {
    'use strict';
    Vue.use(BootstrapVue);
    Vue.use(Notify);
    
    var app = new Vue({
        el: '#app',
        template: Tpl,
        data: {
            routerPath: []
        },
        computed: {
            showEditorMenu: function(){
                return this.$data.routerPath[0] == 'editor' && 
                    ( this.$store.state.editorial.length > 0 || this.$store.state.similars.length > 0)
            },
            showInspectorMenu: function(){
                return this.$data.routerPath[0] == 'inspector' && this.$store.state.technical.length > 0
            },
            countWorks: function() {
                return function (type, workState) {
                    return _.sumBy(this.$store.state[type], function (em) {
                        return !workState || em.state == workState ? 1 : 0;
                    });
                }
            },
            
            navUser: function() {
                switch (this.$data.routerPath[0] ) {
                    case 'editor' : return 'Editor'; break;
                    case 'inspector': return 'Inspector'; break;
                    default: return 'User'; break;
                }
            }
        },
        router: Router,
        store: Store,
        created: function(){
            this.$store.dispatch('getData', 'user');
            this.$store.dispatch('getData', 'pending');
            this.$store.dispatch('getData', 'editorial');
            this.$store.dispatch('getData', 'similars');

            this.$store.dispatch('getData', 'accepted');
            this.$store.dispatch('getData', 'technical');
        },
        methods: {
            toggleFull: function(){
                this.$store.commit('set', { type: 'editorFull', value: !this.$store.state.editorFull });
            },

            selectAll: function(works) {
                if (!works || works.length==0) return;
                works.forEach(function(em) {
                    em.selected = true;
                });
            }
        }
    });

    Vue.prototype.app = app;
    return window.app = app;
});