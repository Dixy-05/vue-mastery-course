<template lang="pug">
div(v-if="event")
  h1 {{event.title}}
  div
    router-link.link(:to="{name:'EventDetails',params:{id}}") Details
      span.bar | 
    router-link.link(:to="{name:'EventRegister',params:{id}}") Register
      span.bar |
    router-link.link(:to="{name:'EventEdit',params:{id}}") Edit
  p Edit the event here
</template>
<script>
import EventService from '../../services/EventService.js';
export default {
  name: 'Edit',
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
