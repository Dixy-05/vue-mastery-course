<template lang="pug">
div(v-if="event")
  h1 {{event.title}}
  div.nav
    router-link.link(:to="{name:'EventDetails',params:{id}}") Details 
      span.bar |
    router-link.link(:to="{name:'EventRegister',params:{id}}") Register 
      span.bar |
    router-link.link(:to="{name:'EventEdit',params:{id}}") Edit
  p {{event.time}} on {{event.date}} @ {{event.location}}
  p {{event.description}}	
</template>
<script>
import EventService from '../../services/EventService.js';
export default {
  name: 'Details',
  props: ['id'],
  data() {
    return {
      event: null,
    };
  },
  async created() {
    const res = await EventService.getEvent(this.id);
    this.event = res.data;
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
