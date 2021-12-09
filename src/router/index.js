import { createRouter, createWebHistory } from 'vue-router';

import About from '../views/About.vue';
import EventDetails from '../views/event/Details.vue';
import EventEdit from '../views/event/Edit.vue';
import EventLayout from '../views/event/Layout.vue';
import EventList from '../views/EventList.vue';
import EventRegister from '../views/event/Register.vue';

const routes = [
  {
    path: '/',
    name: 'EventList',
    component: EventList,
    props: (route) => ({ page: parseInt(route.query.page) || 1 }),
  },
  //testing changing the path from /about to /about-event
  {
    path: '/about-event',
    name: 'About',
    component: About,
  },
  { path: '/about', redirect: { name: 'About' } }, //This is in case somebody uses the old rout
  {
    path: '/event/:id',
    name: 'EventLayout',
    props: true, // to send route params as components props
    component: EventLayout,
    children: [
      //having this path with empty string indicates, its the same as parent (/event/:id)
      {
        path: '',
        name: 'EventDetails',
        component: EventDetails,
      },
      // the path is inherit from the parent( e.g. /event/:id/register)
      {
        path: 'register',
        name: 'EventRegister',
        component: EventRegister,
      },
      {
        path: 'edit',
        name: 'EventEdit',
        component: EventEdit,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
