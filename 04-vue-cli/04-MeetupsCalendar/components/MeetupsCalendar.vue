<template>
  <div class="calendar-view">
    <UiCalendarControls
      :current-date="dateToString"
      @toggle-left="setPrevMonth"
      @toggle-right="setNextMonth"
    />

    <UiCalendarDays :days-list="calendarDays" />
  </div>
</template>

<script>
import UiCalendarControls from './UiCalendarControls.vue';
import UiCalendarDays from './UiCalendarDays.vue';
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import weekOfYear from 'dayjs/plugin/weekOfYear';

dayjs.extend(weekday);
dayjs.extend(weekOfYear);

const generateISODate = (year, month, day) =>
  `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}T00:00:00.000Z`;

export default {
  name: 'MeetupsCalendar',

  components: {
    UiCalendarControls,
    UiCalendarDays,
  },

  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      date: new Date(),
    };
  },

  methods: {
    setNextMonth() {
      this.date = new Date(this.year, this.month + 1);
    },
    setPrevMonth() {
      this.date = new Date(this.year, this.month - 1);
    },
    getEventsForDay(dateISO) {
      return this.meetups.filter((meetup) => meetup.date === +new Date(dateISO));
    },
  },

  computed: {
    year() {
      return this.date.getFullYear();
    },
    month() {
      return this.date.getMonth();
    },
    dateToString() {
      return this.date.toLocaleDateString(navigator.language, {
        month: 'long',
        year: 'numeric',
      });
    },
    numberOfDaysInMonth() {
      return dayjs(this.date).daysInMonth();
    },
    weekdayOfFistDay() {
      const weekday = dayjs(this.date.setDate(1)).weekday();
      // if the week starts on Sunday, you should just return the "weekday"
      return weekday === 0 ? 6 : weekday - 1;
    },
    weekdayOfLastDay() {
      const weekday = dayjs(this.date.setDate(this.numberOfDaysInMonth)).weekday();
      // if the week starts on Sunday, you should just return the "weekday"
      return weekday === 0 ? 6 : weekday - 1;
    },
    calendarDays() {
      const calendarDays = [];
      const daysInPrevMonth = dayjs(this.date).subtract(1, 'month').endOf('month').date();
      const daysInCurrentMonth = this.numberOfDaysInMonth;

      // Add the days of the previous month to the fist week
      for (let i = this.weekdayOfFistDay - 1; i >= 0; i -= 1) {
        const day = daysInPrevMonth - i;
        const dateISO = generateISODate(this.year, this.month, day);
        const events = this.getEventsForDay(dateISO);
        calendarDays.push({ day, dateISO, events, isActive: false });
      }
      // Add the days of the current month
      for (let day = 1; day <= daysInCurrentMonth; day += 1) {
        const dateISO = generateISODate(this.year, this.month, day);
        const events = this.getEventsForDay(dateISO);
        calendarDays.push({ day, dateISO, events, isActive: true });
      }
      // Add the days of the next month to the last week
      for (let day = 1; day < 7 - this.weekdayOfLastDay; day += 1) {
        const dateISO = generateISODate(this.year, this.month, day);
        const events = this.getEventsForDay(dateISO);
        calendarDays.push({ day, dateISO, events, isActive: false });
      }

      return calendarDays;
    },
  },
};
</script>

<style scoped>
@media all and (min-width: 767px) {
  .calendar-event {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    max-height: calc(var(--max-lines) * var(--line-height) + 6px);
  }
}
</style>
