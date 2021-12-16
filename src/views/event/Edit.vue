<template lang="pug">
h1 Edit:
p Edit the event here
VueTrix(id="editor")
button(class='button is-success is-focus' @click="saveChanges") Save Changes

</template>
<script>
import VueTrix from "@/components/VueTrix.vue";
export default {
  name: "Edit",
  components: {
    VueTrix,
  },
  props: ["event"],
  methods: {
    saveChanges() {
      this.$store.dispatch("savedChanges", true);
    },
  },
  computed: {
    saved() {
      return this.$store.state.savedChanges;
    },
  },
  created() {
    this.$store.dispatch({ type: "onPage", view: "edit", boolean: true });
    this.$store.dispatch({ type: "onPage", view: "details", boolean: false });
    this.$store.dispatch({ type: "onPage", view: "register", boolean: false });
  },
  beforeRouteLeave(to, from, next) {
    if (this.$store.state.savedChanges === false) {
      const answer = window.confirm(
        "Do you really want to leave? You have unsaved changes"
      );
      if (answer) {
        next();
      } else {
        next(false);
      }
    } else {
      this.$store.dispatch("savedChanges", false);
      next();
    }
  },
};
</script>
<style scoped>
h1 {
  font-size: 1.2em;
}
</style>
