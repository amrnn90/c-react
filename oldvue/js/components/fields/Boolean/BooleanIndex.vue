<template>
  <div style="max-width: 300px; display: flex; align-items: center">
    <!-- <toggle-input :value="field.data" /> -->
    {{field.data ? 'True' : 'False'}}
  </div>
</template>

<script>
export default {
  props: ["field", "item", "is_title_field"]
};
</script>

<style scoped lang="scss">
</style>