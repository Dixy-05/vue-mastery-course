<template lang="pug">
div(v-if="event")
  h1 {{event.title}}
  div
    router-link :to="{name:'EventDetails',params:{id}}" Details
    router-link :to="{name:'EventRegister',params:{id}}" Register
    router-link :to="{name:'EventEdit',params:{id}}" Edit
  p Register for the event
</template>
<script>
import EventService from '../../services/EventService.js';
export default {
  name: 'Register',
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
