define([
    'vue',
    'html/components/works_actions.html'
], function (Vue, Tpl) {
    'use strict';

    return Vue.component('works-actions', {
        template: Tpl,
        props: ['works', 'actions', 'selectedActions', 'singleActions'],
        data: function() {
            return { 
                editMode: false,
                commonComment: '',
                commonPinterest: ''
            }
        },
        computed: {
            selectedWorks: function(){
                if (!this.works) return [];
                return this.works.filter(function(em){ return em.selected; });
            }
        },
        methods: {
            deselectAll: function() {
                if (!this.works) return;
                this.works.forEach(function(em) {
                    em.selected = false;
                });
            },

            setEditMode: function(val) {
                if (!this.works) return;
                this.editMode = val;
            },

            editAll: function() {
                var ids = _.map(this.works, function(em) { return em.selected ? em.id : false });
                ids = _.compact(ids);
                $('body').addClass('loading');
                this.$http.put('/update_works/', {'ids': ids, 'comment': this.commonComment, 'pinterest': this.commonPinterest}).then( function(response){
                    this.$store.dispatch('getData', 'editorial');
                    this.$store.dispatch('getData', 'technical');
                    this.editMode = false;
                    this.commonComment = '';
                    this.commonPinterest = '';
                    $('body').removeClass('loading');
                });
            },

            changeWorksState: function(newState, forAll) {
                var ids = _.map(this.works, function(em) { return forAll || em.selected ? em.id : false });
                ids = _.compact(ids);
                $('body').addClass('loading');
                this.$http.put('/to_state/'+newState, {'ids': ids}).then( function(response){
                    this.$store.dispatch('getData', 'editorial');
                    this.$store.dispatch('getData', 'technical');
                    this.showNotify(newState, response.body.success, ids.length);
                    $('body').removeClass('loading');
                });
            },
            
            showNotify: function(newState, success, all) {
                var template = '';
                var type = 'primary';
                switch(newState) {
                    case 'selected_to_accept': case 'selected_to_approve':
                        template = '<div class="notify-short f-green"><i class="material-icons">&#xE86C;</i><span class="inline"> +'+success+'</span></div>'; 
                        break;
                    case 'selected_to_reject': case 'selected_to_decline':
                        template = '<div class="notify-short f-red"><i class="material-icons">&#xE5C9;</i><span class="inline"> +'+success+'</span></div>'; 
                        break;
                    case 'selected_to_return':
                        template = '<div class="notify-short f-yellow"><i class="material-icons">&#xE000;</i><span class="inline"> +'+success+'</span></div>'; 
                        break;
                    case 'accepted': case 'approved':
                        template = '<span class="inline">Approved successfull: <b>'+success+'</b></span>';
                        type='success';
                        break;
                    case 'rejected':
                        template = '<span class="inline">Rejected successfull: <b>'+success+'</b></span>';
                        type='danger';
                        break;
                    case 'returned':
                        template = '<span class="inline">Rejected successfull: <b>' +
                            success +
                            '</b> ' +
                            (success < all ? '<br> You need to write messages for all works' : '') +
                            ' </span>';
                        type='warning';
                        break;
                }
                
                if(template)
                    this.$notify({
                        component: {template: template},
                        type: type,
                        horizontalAlign: 'right',
                        verticalAlign: 'bottom',
                        timeout: 2000
                    });
                    
            }
        }
    });

});
