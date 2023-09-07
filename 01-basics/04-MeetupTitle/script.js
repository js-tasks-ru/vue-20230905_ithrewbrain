import { createApp } from './vendor/vue.esm-browser.js';

const API_URL = 'https://course-vue.javascript.ru/api';

function fetchMeetupById(meetupId) {
  return fetch(`${API_URL}/meetups/${meetupId}`).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return response.json().then((error) => {
        throw error;
      });
    }
  });
}

createApp({
  data() {
    return {
      meetupTitle: null,
      pickedId: null,
    };
  },
  watch: {
    pickedId() {
      fetchMeetupById(this.pickedId)
        .then((meetupData) => (this.meetupTitle = meetupData.title))
        .catch((err) => console.error(err));
    },
  },
  template: '#meetup-title',
}).mount('#app');
