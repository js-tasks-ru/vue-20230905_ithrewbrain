import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

const calculatorOptions = {
  data() {
    return {
      numberLeft: null,
      numberRight: null,
      pickedOperator: null,
    };
  },
  computed: {
    result() {
      switch (this.pickedOperator) {
        case 'sum':
          return this.numberLeft + this.numberRight;
        case 'subtract':
          return this.numberLeft - this.numberRight;
        case 'multiply':
          return this.numberLeft * this.numberRight;
        case 'divide':
          return this.numberLeft / this.numberRight;
        default:
          return 0;
      }
    },
  },
  template: '#calculator',
};

const Calculator = defineComponent(calculatorOptions);
const app = createApp(Calculator);

app.mount('#app');
