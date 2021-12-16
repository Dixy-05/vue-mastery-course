<template lang="pug">
h1 Register:
p Register the event here
div.columns
  .column
    label.inputLabel First Name:
    input(v-model="firstName" type="text")
  .column
    label.inputLabel Last Name:
    input(v-model="lastName" type="text")
  .column
    label.inputLabel Email:
    input(v-model="email" type="text")
button(class='button is-dark' @click="register") Register Me
</template>
<script>
import axios from "axios";
export default {
  name: "Register",
  props: ["event"],
  inject: ["GStore"], // this comes from the GStore created & provided in main.js
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
    };
  },
  created() {
    this.$store.dispatch({ type: "onPage", view: "edit", boolean: false });
    this.$store.dispatch({ type: "onPage", view: "details", boolean: false });
    this.$store.dispatch({ type: "onPage", view: "register", boolean: true });
  },

  methods: {
    //axios is calling my local server (db.json)
    async register() {
      if (this.firstName != "" && this.lastName != "" && this.email != "") {
        const res = await axios.post("http://localhost:5000/users", {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
        });
        if (res.status == 201) {
          //this will redirect automatically if register is successful
          this.$router.push({
            name: "EventDetails",
            // params: { id: this.event.id },
          });
          this.GStore.flashMessage = `You are successfully registered for ${this.event.title}`;
          setTimeout(() => {
            this.GStore.flashMessage = "";
          }, 5000);
        }
      } else {
        console.log("Could not register");
      }
    },
  },
};
</script>
<style scoped>
.inputLabel {
  margin-right: 0.2em;
}
h1 {
  font-size: 1.2em;
}
</style>
