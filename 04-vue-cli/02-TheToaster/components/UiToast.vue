<template>
  <div :class="['toast', `toast_${status}`]">
    <UiIcon class="toast__icon" :icon="iconName" />
    <span>{{ message }}</span>
    <!-- We'll be able to add a removal button to remove a toast without waiting for a timeout -->
    <!-- <button @click="$emit('remove-toast', id)">X</button> -->
  </div>
</template>

<script>
import UiIcon from './UiIcon.vue';

const iconNames = {
  error: 'alert-circle',
  success: 'check-circle',
};

export default {
  name: 'UiToasts.vue',

  components: { UiIcon },

  props: {
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      validator: (status) => Object.keys(iconNames).includes(status),
    },
    id: {
      type: Number,
      required: true,
    }
  },

  computed: {
    iconName() {
      return iconNames[this.status];
    },
  },

  emits: ['remove-toast'],
};
</script>

<style scoped>
.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast + .toast {
  margin-top: 20px;
}

.toast__icon {
  margin-right: 12px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}
</style>
