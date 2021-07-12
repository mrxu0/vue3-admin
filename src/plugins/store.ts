import { createStore } from 'vuex';

type Users = { name: string; auto: boolean }
interface StoreState {
    users?: Users
}

const users1 = localStorage.getItem('users');
const users = users1 ? JSON.parse(users1) as Users : undefined;

const store = createStore<StoreState>({
  state() {
    return {
      users,
    };
  },
  mutations: {
    changeUsers(state, val?: Users) {
      state.users = val;
      localStorage.setItem('users', JSON.stringify(val));
    },
  },
});

export default store;
