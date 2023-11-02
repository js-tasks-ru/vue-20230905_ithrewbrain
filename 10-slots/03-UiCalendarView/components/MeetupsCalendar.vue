<template>
  <UiCalendarView v-slot="{ dateStringOfDay }">
    <template v-if="meetupsMap[dateStringOfDay]">
      <UiCalendarEvent
        v-for="(meetup, index) in meetupsMap[dateStringOfDay]"
        :key="index"
        tag="a"
        :href="`/meetups/${meetup.id}`"
      >
        {{ meetup.title }}
      </UiCalendarEvent>
    </template>
  </UiCalendarView>
</template>

<script>
import UiCalendarView from './UiCalendarView.vue';
import UiCalendarEvent from './UiCalendarEvent.vue';

export default {
  name: 'MeetupsCalendar',

  components: {
    UiCalendarEvent,
    UiCalendarView,
  },

  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },

  computed: {
    meetupsMap() {
      const result = {};

      this.meetups.forEach((meetup) => {
        const meetupDateToString = new Date(meetup.date).toDateString();

        if (!result[meetupDateToString]) {
          result[meetupDateToString] = [meetup];
        } else {
          result[meetupDateToString].push(meetup);
        }
      });

      return result;
    },
  },
};
</script>

<style scoped></style>
