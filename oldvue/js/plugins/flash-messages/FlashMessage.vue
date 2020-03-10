<template>
  <div @click="handleClick" class="flash-message">
    <span
      style="display: flex; align-items: center; height: 1.5em; margin-right: var(--sp-4);"
    >
      <icon name="check" size="18" strokeWidth="3" style="stroke: var(--success-9);  border-radius: 50%; border: 1px solid var(--success-9); padding: var(--sp-1); box-sizing: content-box"  />
    </span>
    <span>{{message.content}}</span>
  </div>
</template>

<script>
export default {
  props: ["message"],
  methods: {
    handleClick() {
      clearTimeout(this.timeoutHandle);
      this.dismiss();
    },
    dismiss() {
      this.$emit("dismiss");
    }
  },
  created() {
    this.timeoutHandle = setTimeout(() => {
      this.dismiss();
    }, 4000);
  }
};
</script>

<style scoped lang="scss">
.flash-message {
  background: var(--success-5);
  box-shadow: 2px 2px 10px hsla(var(--success-v-2), 0.4);
  padding: var(--sp-4) var(--sp-6);
  color: var(--success-10);
  border-radius: var(--br);
  display: flex;
  align-items: flex-start;
  font-size: var(--fz-sm);
  font-weight: var(--fw-semibold);
  max-width: calc(var(--sp-20) * 2);
  &:not(:last-child) {
    margin-bottom: var(--sp-3);
  }
}
</style>