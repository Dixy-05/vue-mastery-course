<template lang="pug">
div.events
  EventCard(v-for="event in events" v-bind:key="event.id" v-bind:event="event")
div.pagination  
  router-link.changePage(:to="{name:'EventList',query:{page:page-1}}" rel="prev" v-if="page !=1") &#10096; Prev Page
  router-link.changePage(:to="{name:'EventList',query:{page:page+1}}" rel="next" v-if="hasNextPage" ) Next Page &#10097;

</template>

<script>
// @ is an alias to /src
import EventCard from '../components/EventCard.vue';
import EventService from '../services/EventService.js';
import { watchEffect } from 'vue';

export default {
  name: 'EventList',
  props: ['page'],
  components: {
    EventCard,
  },

  data() {
    return {
      events: null,
      totalEvents: 0,
    };
  },

  created() {
    watchEffect(async () => {
      this.events = null;
      //with axios response.json() is not needed !
      const res = await EventService.getEvents(2, this.page);
      // console.log(res);
      this.events = res.data;
      this.totalEvents = res.headers['x-total-count']; // this header will tell the amount of events
    });
  },
  computed: {
    hasNextPage() {
      const totalPages = Math.ceil(this.totalEvents / 2);
      return this.page < totalPages;
    },
  },
};
</script>
<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pagination {
  display: flex;
  justify-content: space-between;
  /* border: 2px black solid; */
}
.changePage {
  text-decoration: none;
  padding: 2em;
}
</style>
