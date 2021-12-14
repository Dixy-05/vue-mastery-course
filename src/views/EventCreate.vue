<template lang="pug">
div.eventCreate
	.form-container
		form(@submit.prevent="onSubmit")
			label Select a category
			select(v-model="event.category")
				option(
					v-for="option in categories"
					:value="option"
					:key="option"
					:selected="option === event.category"
				) {{option}}

			h3 Name & describe your event 

			label Title
			input(
				v-model="event.title"
				type="text"
				placeholder="Title"

			)

			label Description
			input(
				v-model="event.description"
				type="text"
				placeholder="Description"
			)
			h3 Where is your event?

			label Location
			input(
				v-model="event.location"
				type="text"
				placeholder="Location"
			)
			label Date
			h3 When is your event?
			input(
				v-model="event.date"
				type="text"
				placeholder="Date"
			)
			label Time
			input(
				v-model="event.time"
				type="text"
				placeholder="Time"
			)

			button(type="submit") Submit
	//- .newDiv {{$store.state.events}}	to display data from the store	
</template>
<script>
import { v4 as uuidv4 } from 'uuid';
export default {
  inject: ['GStore'], // this comes from the GStore created & provided in main.js

  data() {
    return {
      categories: [
        'sustainability',
        'nature',
        'animal welfare',
        'housing',
        'education',
        'food',
        'community',
      ],
      event: {
        id: '',
        category: '',
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        organizer: '',
      },
    };
  },
  methods: {
    async onSubmit() {
      const event = {
        ...this.event,
        id: uuidv4,
        organizer: this.$store.state.user,
      };
      //will return true or false
      if (Object.values(event).every((value) => value != '')) {
        this.$store.dispatch('createEvent', event);
        //to notify user of new created event
        this.GStore.flashMessage = `The event "${event.title}" was successfully created`;
        setTimeout(() => {
          this.GStore.flashMessage = '';
        }, 5000);
        //to clean the form
        for (let i = 0; i < Object.keys(event).length; i++) {
          event[Object.keys(event)[i]] = '';
        }
        this.event = event;
      } else {
        console.log('One or more input fields are empty!!!');
      }
    },
  },
};
</script>
<style scoped>
.eventCreate {
  display: flex;
  justify-content: center;
}

.form-container {
  text-align: center;
  width: 40%;
}
input {
  width: 100%;
}
button {
  margin-top: 1em;
  background: green;
  color: white;
  font-size: 1em;
  border-radius: 5px;
  padding: 5px;
  cursor: pointer;
}
button:hover {
  font-size: 1.1em;
}
</style>
