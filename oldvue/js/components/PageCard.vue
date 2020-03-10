<template>
  <div class="page-card">
    <slot></slot>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
  .page-card {
    background: white;
    margin-left:  calc(var(--page-card-horizontal-padding) * -1);
    margin-right:  calc(var(--page-card-horizontal-padding) * -1);
    padding: var(--sp-5) var(--page-card-horizontal-padding);
    border-radius: var(--br);
    box-shadow: 1px 1px 4px hsla(var(--primary-v-6), 0.1);
  }
</style>