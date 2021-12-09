<template lang="pug">
p Register the event here
div
  label.inputLabel firstName:
  input(v-model="firstName" type="text")
  label.inputLabel LastName:
  input(v-model="lastName" type="text")
  label.inputLabel email:
  input(v-model="email" type="text")
button.registerBtn(@click="register") Register Me
</template>
<script>
import axios from 'axios';
export default {
  name: 'Register',
  props: ['event'],
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
    };
  },
  methods: {
    //axios is calling my local server (db.json)
    async register() {
      const res = await axios.post('http://localhost:5000/users', {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
      });
      if (res.status == 201) {
        //this will redirect automatically if register is successful
        this.$router.push({
          name: 'EventDetails',
          // params: { id: this.event.id },
        });
      }
    },
  },
};
</script>
<style>
.inputLabel {
  margin-right: 0.2em;
  margin-left: 0.3em;
}
.registerBtn {
  margin-top: 1em;
  background-color: blue;
  color: white;
  font-family: 'Trebuchet MS';
  font-size: large;
  border: none;
  border-radius: 5px;
  padding: 4px;
}
.registerBtn:hover {
  font-size: 1.1em;
  cursor: pointer;
}
</style>
