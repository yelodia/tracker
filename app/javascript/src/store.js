define([
    'vue',
    'vuex',
    'vue-resource',
    'json-loader!config/stopwords.json'
], function (Vue, Vuex, VueResource, stopWords) {
    'use strict';
    Vue.use(Vuex);
    Vue.use(VueResource);

    function find_stopwords(type, keywords, css){
        var found = []; 
        var keywords_array = keywords.split(/[\s+,]/);
        keywords = keywords.toLowerCase();
        _.each(stopWords[type], function(em){
            var words = em.split(/[\s+,]/);
            if (_.every(words, function(word) { return keywords_array.indexOf(word.toLowerCase()) != -1 } ) )
                found.push(words);
        });
        found = _.flatten(found);
        _.each(found, function(em) {
            em = em.toLowerCase();
            keywords = keywords.replace(em, '<span class="'+css+'">'+em+'</span>');
        });
        return keywords;
    };

    return new Vuex.Store({
        state: {
            user: {},
            pending: [],
            editorial: [],
            similars: [],

            accepted: [],
            technical: [],

            stopWords: stopWords,
            editorFull: false
        },
        
        mutations: {
            set: function(state, _ref) {
                var constructors = { // TODO вынести
                    'editorial': {selected: false},
                    'technical': {
                        selected: false,
                        analyzedKeywords: function(){
                            var keywords_string = find_stopwords("trademarks", this.keywords.toLowerCase(), 'f-yellow');
                            keywords_string = find_stopwords("vulgar", keywords_string, 'f-red');
                            return keywords_string.split(',').join(', ')
                        }
                        
                    }
                };
                if( constructors[_ref.type] )
                    _ref.value = _.map(_ref.value, function(em) {
                        em = _.merge(em, constructors[_ref.type]);
                        _.each(_.keys(em), function(key){
                            if (typeof em[key] == 'function')
                                em[key] = em[key].apply(em);
                        });
                        return em;
                    });
                state[_ref.type] = _ref.value;
            },
            
            successAction: function(state, _ref) {
                state.successActions[_ref.newState] = _ref.success;
            }
        },
        getters: {
            selectedIn: function(state) {
                return function(type, field) {
                    var selectedItems = state[type].filter(function(em){ return em.selected; });
                    return _.map(selectedItems, function(em) {return em[field];});
                }
            },
            worksByState: function(state) {
                return function(type, workState) {
                    return state[type].filter(function(em){ return !workState || em.state == workState; });
                }
            }
        },
        actions: {
            getData: function(context, target) {
                var self = this;
                var targets = { // TODO вынести
                    'user': '/user',
                    'pending': '/pending',
                    'editorial': '/editorial',
                    'accepted': '/accepted',
                    'technical': '/technical',
                    'similars': '/similars'
                };
                var url = targets[target];
                Vue.http.get(url).then( function(response){
                    self.commit('set', { type: target, value: response.body });
                });
            },

            updateWork: function(context, entity) {
                var self = this;
                Vue.http.put('/update_work', {work: entity}).then( function(response){
                    //self.commit('set', { type: target, value: response.body });
                });
            }
        }
    });
    
});