<template lang="pug">
router-link.event-link(:to="{name:'EventDetails',params:{id:event.id}}")
  div(class="event-card")
    h4.cardTitle {{event.title}}
    span @ {{event.time}} on {{event.date}}
    
</template>

<script>
export default {
  name: 'EventCard',
  props: {
    event: Object,
  },
};
</script>

<style scoped>
.cardTitle {
  font-size: 1.3em;
}
.event-card {
  border: 1px black solid;
  width: 20em;
  margin-bottom: 1.2em;
  padding-top: 1em;
  padding-bottom: 1.2em;
  cursor: pointer;
}
.event-card:hover {
  border: 2px black solid;
}
.event-link {
  text-decoration: none;
}
</style>
