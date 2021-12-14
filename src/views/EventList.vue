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
      totalEvents: 0,
    };
  },

  async created() {
    watchEffect(async () => {
      try {
        //this is for user to know the page is doing something
        this.$store.dispatch('fetchEvents', null); // dispatch action
        const res = await EventService.getEvents(2, this.page);
        this.$store.dispatch('fetchEvents', res.data); //dispatch action
        this.totalEvents = res.headers['x-total-count']; // this header will tell the amount of events
      } catch (err) {
        console.log('eventList:', err.response);
        this.$router.push({ name: 'NetworkError' });
      }
    });
  },
  computed: {
    events() {
      return this.$store.state.events;
    },
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
