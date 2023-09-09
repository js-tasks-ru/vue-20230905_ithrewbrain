import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

const counterOptions = {
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    add() {
      this.count += 1;
    },
  },
  template: '#counterTemplate',
};

const Counter = defineComponent(counterOptions);
const app = createApp(Counter);

app.mount('#app');
