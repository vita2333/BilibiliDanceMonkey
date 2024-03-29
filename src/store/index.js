import Vue from "vue";
import Vuex from "vuex";

import * as getters from "./getters";
import mutations from "./mutations";
import * as actions from "./actions";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    foo: "bar",
    speed: 1,
    currentItem: 0,
    config: false,
    playing: false,
    url: location.href,
    list: false,
    showType: "video" // list , video , info
  },
  getters,
  mutations,
  actions
});
