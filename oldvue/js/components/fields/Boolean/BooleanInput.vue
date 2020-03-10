<template>
  <toggle-input
    :name="name"
    :id="id"
    :class="{'has-error': hasError}"
    :value="value"
    @input="(value) => $emit('input', value)"
  />
</template>

<script>
export default {
  props: ["field", "value", "name", "id", "hasError"]
};
</script>

<style lang="scss" scoped>
</style>