<template>
  <UiToastList
    :toasts="toasts"
    @remove-toast="removeToastById"
  />
</template>

<script>
import UiToastList from './UiToastList.vue';

let toastId = 0;

export default {
  name: 'TheToaster',

  components: { UiToastList },

  data() {
    return {
      toasts: [],
      removalTimeMs: 5000,
    };
  },

  methods: {
    setTimeoutToRemove(ms) {
      setTimeout(() => {
        this.toasts.shift();
      }, ms);
    },
    removeToastById(id) {
      this.toasts = this.toasts.filter((toast) => toast.id !== id)
    },
    addToast(message, status) {
      this.toasts.push({ status, message, id: ++toastId });
      this.setTimeoutToRemove(this.removalTimeMs);
    },
    error(message) {
      this.addToast(message, 'error')
    },
    success(message) {
      this.addToast(message, 'success')
    },
  },
};
</script>
