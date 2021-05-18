import { createStore } from "vuex";
import CoachModule from "./modules/coaches/index.js";
import RequestsModule from "./modules/requests/index.js";
import AuthModule from "./modules/auth/index.js";

const store = createStore({
  modules: {
    coaches: CoachModule,
    requests: RequestsModule,
    auth: AuthModule,
  },
  state() {
    return {
      userId: "c3",
    };
  },
});

export default store;
