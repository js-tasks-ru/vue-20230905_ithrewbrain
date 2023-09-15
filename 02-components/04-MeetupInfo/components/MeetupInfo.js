import { defineComponent } from '../vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'MeetupInfo',

  computed: {
    localDate() {
      return new Date(this.date).toLocaleDateString(navigator.language, {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    },

    isoDate() {
      return new Date(this.date).toISOString().substring(0, 10);
    },
  },

  props: {
    organizer: {
      type: String,
      required: true,
    },
    place: {
      type: String,
      required: true,
    },
    date: {
      type: Number,
      required: true,
    },
  },

  template: `
    <ul class="meetup-info">
      <li>
        <img class="icon meetup-info__icon" alt="icon" src="/assets/icons/icon-user.svg" />
        {{ organizer }}
      </li>
      <li>
        <img class="icon meetup-info__icon" alt="icon" src="/assets/icons/icon-map.svg" />
        {{ place }}
      </li>
      <li>
        <img class="icon meetup-info__icon" alt="icon" src="/assets/icons/icon-cal-lg.svg" />
        <time :datetime="isoDate">{{ localDate }}</time>
      </li>
    </ul>`,
});
