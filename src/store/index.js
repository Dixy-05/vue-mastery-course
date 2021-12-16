import EventService from "../services/EventService.js";
import { createStore } from "vuex";

export default createStore({
  state: {
    user: "John Doe",
    events: [],
    event: {},
    savedChanges: false,
    onPage: {
      details: false,
      register: false,
      edit: false,
    },
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
    SAVED_CHANGES(state, boolean) {
      state.savedChanges = boolean;
    },
    ON_PAGE(state, payload) {
      state.onPage[payload.view] = payload.boolean;
    },
  },
  actions: {
    async createEvent({ commit }, event) {
      try {
        await EventService.postEvent(event);
        commit("ADD_EVENT", event); // this if we want to add the data to the state//
      } catch (err) {
        console.log(err);
      }
    },
    fetchEvents({ commit }, events) {
      commit("SET_EVENTS", events);
    },
    fetchEvent({ commit }, event) {
      commit("SET_EVENT", event);
    },
    savedChanges({ commit }, boolean) {
      commit("SAVED_CHANGES", boolean);
    },
    onPage({ commit }, payload) {
      commit("ON_PAGE", payload);
    },
  },
  modules: {},
});
