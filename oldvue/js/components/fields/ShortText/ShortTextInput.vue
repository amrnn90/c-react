<template>
  <input
    type="text"
    :value="value"
    :name="name"
    :id="id"
    class="field-input"
    :class="{'has-error': hasError}"
    @input="(value) => $emit('input', value)"
  />
</template>

<script>
export default {
  props: ["field", "value", "name", "id", "hasError"],
};
</script>

<style lang="scss" scoped>
</style>