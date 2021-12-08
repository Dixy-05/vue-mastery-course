<template lang="pug">
p {{event.time}} on {{event.date}} @ {{event.location}}
p {{event.description}}	
</template>
<script>
export default {
  name: 'Details',
  props: ['event'],
};
</script>
