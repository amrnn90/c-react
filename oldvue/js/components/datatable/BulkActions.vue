<template>
  <div v-if="anyItemSelected">Bulk Actions</div>
</template>

<script>
export default {
  inject: ["tableStoreNamespace"],
  computed: {
    tableStore() {
      return this.$dynamicModuleStore(this.tableStoreNamespace);
    },
    items() {
      return this.tableStore.getters("items") || [];
    },
    selectedItems() {
      return this.tableStore.getters('selectedRows');
    },
    anyItemSelected() {
      return this.selectedItems && this.selectedItems.length > 0;
    },
    isLoading() {
      return this.tableStore.getters("isLoading");
    }
  },
};
</script>

<style>
</style>