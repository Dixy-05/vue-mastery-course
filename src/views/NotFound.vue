<template lang="pug">
h1 Oops!
h3 The {{resource}} you're looking for is not here.
router-link(:to="{name:'EventList'}") Back to the home page
</template>
<script>
export default {
  props: {
    resource: {
      type: String,
      required: true,
      default: 'page',
    },
  },
};
</script>
