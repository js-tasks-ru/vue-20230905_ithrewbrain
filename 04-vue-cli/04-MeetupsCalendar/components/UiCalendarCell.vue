<template>
  <div
    class="calendar-view__cell"
    :class="{ 'calendar-view__cell_inactive': !isActive }"
    tabindex="0"
  >
    <div class="calendar-view__cell-day">{{ day }}</div>
    <div class="calendar-view__cell-content">
      <template v-if="events.length">
        <UiEventItem
          v-for="(event, index) in events"
          :key="index"
          :id="event.id"
          :title="event.title"
        />
      </template>
    </div>
  </div>
</template>

<script>
import UiEventItem from './UiEventItem.vue';

export default {
  name: 'UiCalendarCell',

  components: {
    UiEventItem,
  },

  props: {
    day: {
      type: Number,
      required: true,
      validator: (day) => day >= 1 && day <= 31,
    },
    events: {
      type: Array,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style scoped>
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
  .calendar-view__cell {
    height: 141px;
  }

  .calendar-view__cell:nth-child(7n + 1) {
    border-left: none;
  }
}
</style>
