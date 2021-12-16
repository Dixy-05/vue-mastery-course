<template lang="pug">
div(v-if="event")
  div.nav
    router-link.link(:to="{name:'EventDetails'}" v-if="onPage.details===false") Details
      span.bar(v-if="onPage.details===false") |
    router-link.link(:to="{name:'EventRegister'}" v-if="onPage.register===false") Register
      span.bar(v-if="onPage.edit===false") |
    router-link.link(:to="{name:'EventEdit'}" v-if="onPage.edit===false") Edit
  h1 {{event.title}}
    //-the children components will be displayed in router-view
  router-view(:event="event")
</template>
<script>
import EventService from "../../services/EventService.js";
export default {
  name: "Layout",
  props: ["id"],
  async created() {
    try {
      const res = await EventService.getEvent(this.id);
      this.$store.dispatch("fetchEvent", res.data);
    } catch (err) {
      console.log("vueError:", err.response);
      if (err.response && err.response.status == 404) {
        this.$router.push({
          name: "404Resource",
          params: { resource: "event" },
        });
      } else {
        this.$router.push({ name: "NetworkError" });
      }
    }
  },
  computed: {
    onPage() {
      return {
        details: this.$store.state.onPage.details,
        register: this.$store.state.onPage.register,
        edit: this.$store.state.onPage.edit,
      };
    },
    event() {
      return this.$store.state.event;
    },
  },
};
</script>
<style scoped>
h1 {
  font-size: 1.5em;
}
.bar {
  margin-left: 2px;
  margin-right: 2px;
}
.link {
  font-weight: bold;
}
</style>
