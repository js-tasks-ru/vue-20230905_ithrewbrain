<template>
  <UiInput
    :type="type"
    :step="step"
    :model-value="formattedDate"
    @input="handleDateInput"
  >
    <template v-for="slotName in Object.keys($slots)" #[slotName]>
      <slot :name="slotName" />
    </template>
  </UiInput>
</template>

<script>
import UiInput from './UiInput.vue';

const INPUT_TYPES = {
  DATE: 'date',
  TIME: 'time',
  DATETIME_LOCAL: 'datetime-local',
};

export default {
  name: 'UiInputDate',

  components: { UiInput },

  props: {
    type: {
      type: String,
      default: INPUT_TYPES.DATE,
      validator: (value) => Object.values(INPUT_TYPES).includes(value),
    },

    modelValue: {
      type: Number,
      default: null,
    },

    step: {
      type: String,
      default: '1',
    },
  },

  emits: ['update:modelValue'],

  methods: {
    handleDateInput(event) {
      const dateISO = event.target.valueAsNumber;
      this.date = new Date(dateISO);
      this.$emit('update:modelValue', dateISO);
    },
  },

  computed: {
    formattedDate() {
      if (!this.modelValue) return '';

      const date = new Date(this.modelValue);

      if (this.type === INPUT_TYPES.TIME) return date.toISOString().slice(11, 16);
      if (this.type === INPUT_TYPES.DATETIME_LOCAL) return date.toISOString().slice(0, -1);
      return date.toISOString().slice(0, 10);
    },
  },
};
</script>
