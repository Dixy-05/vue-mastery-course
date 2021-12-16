<template lang="pug">
div.events
  EventCard(v-for="event in events" v-bind:key="event.id" v-bind:event="event")
div.pagination
  router-link.changePage(:to="{name:'EventList',query:{page:page-1}}" rel="prev" v-if="page !=1") &#10096; Prev Page
  router-link.changePage(:to="{name:'EventList',query:{page:page+1}}" rel="next" v-if="hasNextPage" ) Next Page &#10097;

</template>

<script>
// @ is an alias to /src
import EventCard from "../components/EventCard.vue";
import EventService from "../services/EventService.js";
import NProgress from "nprogress";

export default {
  name: "EventList",
  props: ["page"],
  components: {
    EventCard,
  },

  data() {
    return {
      totalEvents: 0,
      eventsPerPage: 0,
    };
  },

  computed: {
    events() {
      return this.$store.state.events;
    },
    hasNextPage() {
      const totalPages = Math.ceil(this.totalEvents / this.eventsPerPage);
      return this.page < totalPages;
    },
  },
  async beforeRouteEnter(routeTo, routeFrom, next) {
    NProgress.start();
    try {
      const limitEvents = 3;
      const response = await EventService.getEvents(
        limitEvents,
        parseInt(routeTo.query.page) || 1
      );
      next((comp) => {
        comp.totalEvents = response.headers["x-total-count"]; // this header will tell the amount of events
        comp.eventsPerPage = limitEvents; //this will limit the amount of events per page
        //if statement assures that page query number will be correct one
        if (comp.page > Math.ceil(comp.totalEvents / comp.eventsPerPage)) {
          comp.$router.push({
            name: "404Resource",
            params: { resource: "event" },
          });
        }
        comp.$store.dispatch("fetchEvents", response.data); //dispatch action
      });
    } catch (err) {
      next({ name: "NetworkError" });
    } finally {
      NProgress.done();
    }
  },
  async beforeRouteUpdate(routeTo) {
    NProgress.start();
    if (this.page > Math.ceil(this.totalEvents / this.eventsPerPage)) {
      this.$route.push({ name: "404Resource" });
    }
    try {
      const response = await EventService.getEvents(
        this.eventsPerPage,
        parseInt(routeTo.query.page) || 1
      );
      this.$store.dispatch("fetchEvents", response.data); //dispatch action
      this.totalEvents = response.headers["x-total-count"]; // this header will tell the amount of events
    } catch (err) {
      return { name: "NetworkError" };
    } finally {
      NProgress.done();
    }
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
