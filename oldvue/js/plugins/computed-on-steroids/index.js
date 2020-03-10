const ComputedOnSteroids = {
  install(Vue) {
    Vue.mixin({
      beforeCreate() {
        let computed = this.$options.computedOnSteroids || {};
        if (typeof computed === 'function') {
          computed = computed.call(this, this);
        }
        this.$options.computed = {
          ...(this.$options.computed || {}),
          ...computed
        };
      }
    })
  }
}

export default ComputedOnSteroids;