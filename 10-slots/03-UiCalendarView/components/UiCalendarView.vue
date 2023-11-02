<template>
  <div class="calendar-view">
    <UiCalendarControls :current-date="currentDateToString" @toggle-left="setPrevMonth" @toggle-right="setNextMonth" />

    <div class="calendar-view__grid">
      <div
        v-for="(day, index) in calendarDays"
        :key="index"
        class="calendar-view__cell"
        :class="{ 'calendar-view__cell_inactive': !day.isActive }"
        tabindex="0"
      >
        <div class="calendar-view__cell-day">{{ day.day }}</div>
        <div class="calendar-view__cell-content">
          <slot :year="year" :month="month" :day="day.day" :dateStringOfDay="day.dateString" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UiCalendarControls from './UiCalendarControls.vue';
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import weekOfYear from 'dayjs/plugin/weekOfYear';

dayjs.extend(weekday);
dayjs.extend(weekOfYear);

export default {
  name: 'UiCalendarView',

  components: {
    UiCalendarControls,
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
  },

  computed: {
    year() {
      return this.date.getFullYear();
    },

    month() {
      return this.date.getMonth();
    },

    currentDateToString() {
      return this.date.toLocaleDateString(navigator.language, {
        month: 'long',
        year: 'numeric',
      });
    },

    daysInMonth() {
      return dayjs(this.date).daysInMonth();
    },

    weekdayOfFistDay() {
      const weekday = dayjs(this.date.setDate(1)).weekday();
      // if the week starts on Sunday, you should just return the "weekday"
      return weekday === 0 ? 6 : weekday - 1;
    },

    weekdayOfLastDay() {
      const weekday = dayjs(this.date.setDate(this.daysInMonth)).weekday();
      // if the week starts on Sunday, you should just return the "weekday"
      return weekday === 0 ? 6 : weekday - 1;
    },

    calendarDays() {
      const calendarDays = [];
      const daysInPrevMonth = dayjs(this.date).subtract(1, 'month').endOf('month').date();
      const daysInCurrentMonth = this.daysInMonth;

      for (let i = this.weekdayOfFistDay - 1; i >= 0; i -= 1) {
        const day = daysInPrevMonth - i;
        calendarDays.push({
          day,
          dateString: new Date(this.year, this.month, day).toDateString(),
          isActive: false,
        });
      }

      // Add the days of the current month
      for (let day = 1; day <= daysInCurrentMonth; day += 1) {
        calendarDays.push({
          day,
          dateString: new Date(this.year, this.month, day).toDateString(),
          isActive: true,
        });
      }

      // Add the days of the next month to the last week
      for (let day = 1; day < 7 - this.weekdayOfLastDay; day += 1) {
        calendarDays.push({
          day,
          dateString: new Date(this.year, this.month, day).toDateString(),
          isActive: false,
        });
      }

      return calendarDays;
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

.calendar-view__cell {
  position: relative;
  height: auto;
  padding: 6px 8px;
  background-color: var(--white);
  color: var(--grey-8);
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  border-bottom: 1px solid var(--grey);
  border-left: 1px solid var(--grey);
  text-align: right;
}

.calendar-view__cell.calendar-view__cell_inactive {
  background-color: var(--grey-light);
}

@media all and (max-width: 767px) {
  .calendar-view__cell:nth-child(5n + 1) {
    border-left: none;
  }
}

@media all and (min-width: 767px) {
  .calendar-view__grid {
    grid-template-columns: repeat(7, 1fr);
  }

  .calendar-view__cell {
    height: 144px;
  }

  .calendar-view__cell:nth-child(7n + 1) {
    border-left: none;
  }
}
</style>
