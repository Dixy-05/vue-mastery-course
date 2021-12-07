import { createRouter, createWebHistory } from 'vue-router';

import About from '../views/About.vue';
import EventDetails from '../views/event/Details.vue';
import EventEdit from '../views/event/Edit.vue';
import EventList from '../views/EventList.vue';
import EventRegister from '../views/event/Register.vue';

const routes = [
  {
    path: '/',
    name: 'EventList',
    component: EventList,
    props: (route) => ({ page: parseInt(route.query.page) || 1 }),
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/event/:id',
    name: 'EventDetails',
    props: true, // to send route params as components props
    component: EventDetails,
  },
  {
    path: '/event/:id/register',
    name: 'EventRegister',
    props: true, // to send route params as components props
    component: EventRegister,
  },
  {
    path: '/event/:id/edit',
    name: 'EventEdit',
    props: true, // to send route params as components props
    component: EventEdit,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
