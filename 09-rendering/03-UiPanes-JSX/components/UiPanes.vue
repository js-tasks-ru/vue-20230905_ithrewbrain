<script lang="jsx">
// Предлагается решать задачу с использованием JSX, но вы можете использовать и чистые рендер-функции

import UiButton from './UiButton.vue';

export default {
  name: 'UiPanes',

  components: {
    UiButton,
  },

  data() {
    return {
      /**
       * Массив с текущим порядком номеров моделей, например
       * [0, 1, 2]
       * @type {number[]|null}
       */
      panes: null,
      // Сейчас здесь массив ровно из трёх элементов, но решение должно быть универсальным для любого количества узлов
    };
  },

  methods: {
    /**
     * Переместить i-ую панель вверх
     *
     * @param {number} i
     */
    up(i) {
      const temp = this.panes[i];
      this.panes[i] = this.panes[i - 1];
      this.panes[i - 1] = temp;
    },

    /**
     * Переместить i-ую панель вниз
     *
     * @param {number} i
     */
    down(i) {
      const temp = this.panes[i];
      this.panes[i] = this.panes[i + 1];
      this.panes[i + 1] = temp;
    },
  },

  created() {
    this.panes = this.$slots.default?.();
  },

  render() {
    return (
      <div class="panes">
        {this.panes.map((vnode, index) => {
          return (
            <div class="pane" key={index}>
              <div class="pane__content">{vnode}</div>
              <div class="pane__controls">
                <UiButton
                  class={index === 0 && 'pane__disabled-button'}
                  variant="secondary"
                  block
                  onClick={() => this.up(index)}
                >
                  Up
                </UiButton>

                <UiButton
                  class={index === this.panes.length - 1 && 'pane__disabled-button'}
                  variant="danger"
                  block
                  onClick={() => this.down(index)}
                >
                  Down
                </UiButton>
              </div>
            </div>
          );
        })}
      </div>
    );
  },
};
</script>

<style scoped>
.panes {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.pane {
  display: flex;
  flex-direction: row;
  border: 3px solid var(--blue-light);
}

.pane__content {
  border-right: 3px solid var(--blue-light);
  padding: 8px;
  flex: 1 0;
}

.pane__controls {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
  width: min-content;
}

.pane__disabled-button {
  visibility: hidden;
}
</style>
