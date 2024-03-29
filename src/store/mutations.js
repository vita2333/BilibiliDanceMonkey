import * as types from './mutation-types';
import { setStorage } from '../utils/storage';
import { DefaultConfig, speedList } from '../utils/types';

export default {
  [types.UPDATE_FOO](state, payload) {
    state.foo = payload;
  },
  [types.SET_CUREENT](state, payload) {
    state.currentItem = payload;
  },
  [types.LAST_NEXT](state, payload) {
    state.currentItem += payload;
    if (state.currentItem < 0) {
      state.currentItem = 0;
    }
  },
  [types.SET_SPEED](state, payload) {
    state.speed = payload;
  },
  [types.FASTER](state) {
    const list = speedList;
    let index = speedList.indexOf(state.speed);
    index--;
    if (index < 0) {
      index = 0;
    }
    state.speed = list[index];
  },
  [types.SLOWER](state) {
    const list = speedList;
    let index = speedList.indexOf(state.speed);
    index++;
    if (index > list.length - 1) {
      index = list.length - 1;
    }
    state.speed = list[index];
  },
  [types.SET_CONFIG](state, payload) {
    state.config = payload || state.config || DefaultConfig;
    setStorage('config', state.config);
  },
  [types.SET_URL](state, payload) {
    state.url = payload;
  },
  [types.SET_LIST](state, payload) {
    state.list = payload;
    setStorage("list", state.items);
  },
  [types.ADD_VID](state, payload) {
    const temp = state.list || {};
    temp[payload.vid] = payload.title;
    state.list = temp;
    setStorage("list", state.list);
  },
  [types.REMOVE_VID](state, vid) {
    delete state.list[vid];
    setStorage("list", state.list);
  },
  [types.SET_SHOW_TYPE](state, type) {
    state.showType = type;
  },
  [types.SET_PLAYING](state, type) {
    state.playing = type;
  },
};
