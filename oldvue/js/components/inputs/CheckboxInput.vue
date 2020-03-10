<template>
  <div
    class="checkbox-input"
    :class="{checked: isChecked}"
    @click="$emit('input', !isChecked)"
    @keydown.enter.space.prevent="$emit('input', !isChecked)"
    tabindex="0"
  >
    <icon name="check" stroke="var(--primary-10)" strokeWidth="4" class="icon" size="12" />
    <input type="checkbox" :name="name" :id="id" :value="value" style="display: none" />
  </div>
</template>

<script>
export default {
  props: ["value", "name", "id"],
  computed: {
    isChecked() {
      return !!this.value;
    }
  }
};
</script>

<style scoped lang="scss">
@import "resources/sass/init";

.checkbox-input {
  width: var(--sp-5);
  height: var(--sp-5);
  border-radius: var(--br);
  border: 1px solid var(--grey-8);
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;

  .icon {
    transform: scale(0, 0);
    opacity: 0;
    transition: all 0.2s ease;
  }
}

.checked {
  background: var(--primary);
  border-color: transparent;
}

.checked .icon {
  opacity: 1;
  transform: scale(1, 1);
}
</style>