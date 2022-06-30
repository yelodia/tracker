define([
    'vue',
    'store',
    'html/components/task_item.html'
], function (Vue, Store, Tpl) {
    'use strict';

    return Vue.component('task-item', {
        store: Store,
        template: Tpl,
        props: ['task'],

        data: function() {
            return { 

            }
        },
        computed: {
            dateFormat: function() {
                return function(date) {
                    return moment(date).format("DD.MM.YYYY HH:mm");
                }
            }
        },
        methods: {
            changeStatus: function(status) {
                var self = this;
                Vue.http.put('/tasks/'+this.task.id+'/set_status', {status: status}).then( function(response){
                    _.forOwn(response.body, function(value, key) {
                        self.task[key] = value
                    } );
                }, function(){
                    self.showNotyfy('Unable to update', 'danger');
                })
            },

            approve: function(status) {
                var self = this;
                Vue.http.put('/tasks/'+this.task.id+'/approve').then( function(response){
                    _.forOwn(response.body, function(value, key) {
                        self.task[key] = value
                    } );
                    self.showNotyfy('Successful approve', 'success');
                }, function(){
                    self.showNotyfy('Unable to approve', 'danger');
                })
            },

            showNotyfy: function(message, type) {
                this.$notify({
                    component: {template: '<span>' + message + '</span>'},
                    type: type,
                    horizontalAlign: 'right',
                    verticalAlign: 'bottom',
                    timeout: 2000
                });
            }

        }
    });

});
