<template lang="pug">
p Edit the event here
//- VueTrix
button(class='button is-success is-focus' @click="saveChanges") Save Changes

</template>
<script>
// import VueTrix from 'vue-trix';
export default {
  name: 'Edit',
  // components: {
  //   VueTrix,
  // },
  props: ['event'],
  methods: {
    saveChanges() {
      this.$store.dispatch('savedChanges', true);
    },
  },
  computed: {
    saved() {
      return this.$store.state.savedChanges;
    },
  },
  beforeRouteLeave(to, from, next) {
    // console.log(this.saved);
    if (this.$store.state.savedChanges === false) {
      const answer = window.confirm(
        'Do you really want to leave? You have unsaved changes'
      );
      if (answer) {
        next();
      } else {
        next(false);
      }
    } else {
      this.$store.dispatch('savedChanges', false);
      next();
    }
  },
};
</script>
