import EventService from '../services/EventService.js';
import { createStore } from 'vuex';

export default createStore({
  state: {
    user: 'John Doe',
    events: [],
    event: {},
  },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event);
    },
    SET_EVENTS(state, events) {
      state.events = events;
    },
    SET_EVENT(state, event) {
      state.event = event;
    },
  },
  actions: {
    async createEvent({ commit }, event) {
      try {
        await EventService.postEvent(event);
        commit('ADD_EVENT', event); // this if we want to add the data to the state//
      } catch (err) {
        console.log(err);
      }
    },
    fetchEvents({ commit }, events) {
      commit('SET_EVENTS', events);
    },
    fetchEvent({ commit }, event) {
      commit('SET_EVENT', event);
    },
  },
  modules: {},
});
