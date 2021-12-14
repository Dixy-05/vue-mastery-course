<template lang="pug">
div(v-if="event")
  h1 {{event.title}}
  div.nav
    router-link.link(:to="{name:'EventDetails'}") Details 
      span.bar |
    router-link.link(:to="{name:'EventRegister'}") Register 
      span.bar |
    router-link.link(:to="{name:'EventEdit'}") Edit
    //-the children components will be displayed in router-view
  router-view(:event="event")  
</template>
<script>
import EventService from '../../services/EventService.js';
export default {
  name: 'Layout',
  props: ['id'],
  async created() {
    try {
      const res = await EventService.getEvent(this.id);
      this.$store.dispatch('fetchEvent', res.data);
    } catch (err) {
      console.log('vueError:', err.response);
      if (err.response && err.response.status == 404) {
        this.$router.push({
          name: '404Resource',
          params: { resource: 'event' },
        });
      } else {
        this.$router.push({ name: 'NetworkError' });
      }
    }
  },
  computed: {
    event() {
      return this.$store.state.event;
    },
  },
};
</script>
<style scoped>
.bar {
  margin-left: 2px;
  margin-right: 2px;
}
.link {
  font-weight: bold;
}
</style>
