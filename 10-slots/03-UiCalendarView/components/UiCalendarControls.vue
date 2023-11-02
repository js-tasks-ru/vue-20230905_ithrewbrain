<template>
  <div class="calendar-view__controls">
    <div class="calendar-view__controls-inner">
      <button
        @click="$emit('toggle-left')"
        class="calendar-view__control-left"
        type="button"
        aria-label="Previous month"
      ></button>

      <div class="calendar-view__date">{{ currentDate }}</div>

      <button
        @click="$emit('toggle-right')"
        class="calendar-view__control-right"
        type="button"
        aria-label="Next month"
      ></button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UiCalendarControls',

  props: {
    currentDate: {
      type: String,
      required: true,
    },
  },

  emits: ['toggle-left', 'toggle-right'],
};
</script>

<style scoped>
.calendar-view__controls {
  text-align: center;
  font-weight: 700;
  font-size: 24px;
  line-height: 1;
  color: var(--blue);
  background-color: var(--blue-extra);
  padding: 24px;
  display: flex;
  justify-content: center;
}

.calendar-view__controls-inner {
  max-width: 325px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  text-transform: capitalize;
}

.calendar-view__controls-inner button {
  border: none;
  padding: 0;
}

.calendar-view__control-left,
.calendar-view__control-right {
  width: 30px;
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s all;
  background: url('@/assets/icons/icon-pill-active.svg') left center no-repeat;
  background-size: cover;
}

.calendar-view__control-left:hover,
.calendar-view__control-right:hover {
  opacity: 0.8;
}

.calendar-view__control-right {
  transform: rotate(180deg);
}
</style>
