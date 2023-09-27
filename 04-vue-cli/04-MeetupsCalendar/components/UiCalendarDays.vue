<template>
  <div class="calendar-view__grid">
    <UiCalendarCell
      v-for="(day, index) in daysList"
      :key="index"
      :day="day.day"
      :is-active="day.isActive"
      :events="day.events"
    />
  </div>
</template>

<script>
import UiCalendarCell from './UiCalendarCell.vue';

export default {
  name: 'UiCalendarDays',

  components: {
    UiCalendarCell,
  },

  props: {
    daysList: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.calendar-view__grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
}

.calendar-view__grid {
  border: 1px solid var(--grey);
  border-bottom: none;
}

@media all and (min-width: 767px) {
  .calendar-view__grid {
    grid-template-columns: repeat(7, 1fr);
  }
}
</style>
