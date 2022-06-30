define([
    'vue',
    'store',
    'html/tasks.html',
    'components/taskItem',
    'vue-notifyjs'
], function (Vue, Store, Tpl, TaskItem, Notify) {
    'use strict';
    Vue.use(Notify);
    
    var tasksApp = new Vue({
        el: '#tasks',
        template: Tpl,
        data: {

        },
        computed: {
            tasks: function() {
                return _.orderBy(this.$store.state.tasks, 'updated_at', 'desc');
            },
            taskByStatus: function() {
                return function(status) {
                    return _.filter(this.tasks, function(em){ return em.status == status; });
                }
            }
        },
        store: Store,
        created: function(){
            this.$store.dispatch('getData', 'tasks');
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

    Vue.prototype.tasksApp = tasksApp;
    return window.tasksApp = tasksApp;
});