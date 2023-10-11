<template>
  <button @click="$emit('update:count', ++localCount)">
    {{ localCount }}
  </button>
</template>

<script>
export default {
  name: 'CounterButton',

  props: {
    count: {
      type: Number,
      default: 0,
    },
  },

  emits: ['update:count'],

  data() {
    return {
      localCount: null,
    };
  },

  watch: {
    count: {
      immediate: true,
      handler(newValue) {
        this.localCount = newValue;
      },
    },
  },
};
</script>
