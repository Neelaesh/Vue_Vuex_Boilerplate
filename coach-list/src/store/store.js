import { createStore } from 'vuex';
import CoachModule from './modules/coaches/index.js';
import RequestsModule from './modules/requests/index.js';

const store = createStore({
    modules: {
        coaches: CoachModule,
        requests: RequestsModule
    },
    state() {
        return {
            userId: 'c3'
        }
    },
    getters: {
        userId(state) {
            return state.userId;
        }
    }
});

export default store;