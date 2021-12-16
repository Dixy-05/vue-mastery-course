<template lang="pug">
h1 Details:
p {{event.time}} on {{event.date}} @ {{event.location}}
p {{event.description}}
</template>
<script>
export default {
  name: "Details",
  props: ["event"],
  created() {
    //to control what link to see on each page
    this.$store.dispatch({ type: "onPage", view: "edit", boolean: false });
    this.$store.dispatch({ type: "onPage", view: "details", boolean: true });
    this.$store.dispatch({ type: "onPage", view: "register", boolean: false });
  },
};
</script>
<style scoped>
h1 {
  font-size: 1.2em;
}
</style>
