<template>
  <div>
    <flat-pickr
      :value="value"
      :name="name"
      :id="id"
      class="field-input"
      :class="{'has-error': hasError}"
      @input="(value) => $emit('input', value)"
      :config="config"
    ></flat-pickr>
  </div>
</template>

<script>
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import l10n from "flatpickr/dist/l10n";

export default {
  props: ["field", "value", "name", "id", "hasError"],
  data() {
    return {};
  },
  computed: {
    config() {
      // return this.field.options || {};
      return { ...this.field.options, locale: l10n.ar };
    }
  },
  components: {
    flatPickr
  }
};
</script>

<style lang="scss" scoped>
</style>
