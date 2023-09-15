import { defineComponent } from '../vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import MeetupView from '../../06-MeetupView/components/MeetupView.js';
import { fetchMeetupById } from '../meetupService.js';

export default defineComponent({
  name: 'PageMeetup',

  components: {
    UiAlert,
    UiContainer,
    MeetupView,
  },

  props: {
    meetupId: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      selectedMeetup: null,
      isLoading: false,
      isError: false,
      errorMessage: '',
    };
  },

  methods: {
    async handleMeetupDataLoading() {
      this.isError = false;
      this.isLoading = true;

      try {
        const meetupData = await fetchMeetupById(this.meetupId);
        this.selectedMeetup = meetupData;
      } catch (e) {
        this.isError = true;
        this.errorMessage = e.message;
      } finally {
        this.isLoading = false;
      }
    },
  },

  computed: {
    isDataLoaded() {
      return this.selectedMeetup && !this.isLoading && !this.isError;
    },
    isShowLoading() {
      return this.isLoading && !this.isError;
    },
  },

  watch: {
    meetupId() {
      this.handleMeetupDataLoading();
    },
  },

  mounted() {
    this.handleMeetupDataLoading();
  },

  template: `
    <div class="page-meetup">
      <!-- meetup view -->
      <MeetupView v-if="isDataLoaded" :meetup="selectedMeetup" />
      <UiContainer>
        <UiAlert v-if="isShowLoading">Загрузка...</UiAlert>
      </UiContainer>

      <UiContainer>
        <UiAlert v-if="isError">{{ errorMessage }}</UiAlert>
      </UiContainer>
    </div>`,
});
