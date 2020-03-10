<template>
  <div
    class="toggle-input"
    :class="{checked: isChecked}"
    @click="$emit('input', !isChecked)"
    @keydown.enter.space.prevent="$emit('input', !isChecked)"
    tabindex="0"
  >
    <input type="checkbox" :name="name" :id="id" :value="value" style="display: none">
  </div>
</template>

<script>
export default {
  props: ["value", "name", "id"],
  computed: {
    isChecked() {
      return !!this.value;
    }
  },
  methods: {
  }
};
</script>

<style scoped lang="scss">
@import "resources/sass/init";

.toggle-input {
  width: var(--sp-13);
  height: var(--sp-8);
  border-radius: var(--sp-8);
  border: 2px solid var(--grey-9);
  position: relative;
  cursor: pointer;

  padding: 4px;
  transition: all 0.2s ease;
  background: #fff;

  &:after {
    content: "";
    border-radius: var(--sp-8);
    position: relative;
    display: block;
    width: 50%;
    height: 100%;
    left: 0;
    transition: all 0.2s ease;

    background: var(--grey-9);
  }

  &.checked {
    border: 2px solid var(--primary);
  }
  &.checked::after {
    left: 50%;
    background: var(--primary);
  }
}
</style>