<template>
  <div class="image-uploader">
    <label
      class="image-uploader__preview"
      :class="{ 'image-uploader__preview-loading': state === 'loading' }"
    >
      <span class="image-uploader__text">{{ uploaderText }}</span>
      <input
        @click="handleRemove"
        @change="handleChange"
        type="file"
        ref="input"
        accept="image/*"
        class="image-uploader__input"
        v-bind="$attrs"
      />
    </label>
  </div>
</template>

<script>
const STATES = {
  EMPTY: 'empty',
  LOADING: 'loading',
  FILLED: 'filled',
};

export default {
  name: 'UiImageUploader',

  inheritAttrs: false,

  props: {
    preview: {
      type: String,
      default: null,
    },
    uploader: {
      type: Function,
      default: null,
    },
  },

  created() {
    if (this.preview) this.state = STATES.FILLED;
  },

  emits: ['select', 'upload', 'error', 'remove'],

  data() {
    return {
      state: STATES.EMPTY,
      previewURL: this.preview,
      file: null,
    };
  },

  methods: {
    async uploadFile(file) {
      if (this.uploader) {
        this.state = STATES.LOADING;
        try {
          const result = await this.uploader(file);
          this.handleSuccessUpload(result);
        } catch (error) {
          this.handleError(error);
        }
      } else {
        this.state = STATES.FILLED;
      }
    },

    handleRemove(event) {
      if (this.state === STATES.FILLED) {
        event.preventDefault();
        this.$emit('remove');
        this.resetUploader();
      }
    },

    handleChange(event) {
      this.file = event.target.files[0];
      this.previewURL = URL.createObjectURL(this.file);
      this.$emit('select', this.file);
      this.uploadFile(this.file);
    },

    handleSuccessUpload(result) {
      this.state = STATES.FILLED;
      this.$emit('upload', result);
    },

    handleError(error) {
      this.$emit('error', error);
      this.resetUploader();
    },

    resetUploader() {
      this.previewURL = null;
      this.$refs.input.value = null;
      this.state = STATES.EMPTY;
    },
  },

  computed: {
    backgroundImage() {
      return this.previewURL ? `url(${this.previewURL})` : 'var(--default-cover)';
    },
    uploaderText() {
      if (this.state === STATES.LOADING) return 'Загрузка...';
      if (this.state === STATES.FILLED) return 'Удалить изображение';
      return 'Загрузить изображение';
    },
  },
};
</script>

<style scoped>
.image-uploader__input {
  opacity: 0;
  height: 0;
}

.image-uploader__preview {
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), v-bind(backgroundImage);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader__text {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
