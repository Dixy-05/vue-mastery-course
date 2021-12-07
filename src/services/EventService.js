import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://my-json-server.typicode.com/Dixy-05/fake-db-vue.js',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
export default {
  async getEvents(perPage, page) {
    return await apiClient.get(`/events?_limit=${perPage}&_page=${page}`);
  },
  async getEvent(id) {
    return await apiClient.get(`/events/${id}`);
  },
};
