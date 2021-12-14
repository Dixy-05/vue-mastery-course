import { createRouter, createWebHistory } from 'vue-router';

import About from '../views/About.vue';
import EventCreate from '../views/EventCreate';
import EventDetails from '../views/event/Details.vue';
import EventEdit from '../views/event/Edit.vue';
import EventLayout from '../views/event/Layout.vue';
import EventList from '../views/EventList.vue';
import EventRegister from '../views/event/Register.vue';
import NetworkError from '../views/NetworkError.vue';
import NotFound from '../views/NotFound.vue';

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
  {
    // this is matching all routes that don't match an existing route
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound,
  },
  {
    path: '/404/:resource',
    name: '404Resource',
    component: NotFound,
    props: true,
  },
  {
    path: '/network-error',
    name: 'NetworkError',
    component: NetworkError,
  },
  {
    path: '/event/create',
    name: 'EventCreate',
    component: EventCreate,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
