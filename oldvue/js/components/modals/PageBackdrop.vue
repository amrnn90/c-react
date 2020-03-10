<template>
  <portal to="page-backdrop">
    <transition  v-bind="transition" v-on="transitionOn" @after-leave="afterLeave">
      <div class="page-backdrop" @click="handleBackdropClick">
        <slot />
      </div>
    </transition>
  </portal>
</template>

<script>
export default {
  props: {
    transition: {default: () => ({
      name: 'page-backdrop',
      appear: true
    })},
    transitionOn: {}
  },
  methods: {
    /* https://stackoverflow.com/a/13382873 */
    getScrollbarWidth() {
      // Creating invisible container
      const outer = document.createElement("div");
      outer.style.visibility = "hidden";
      outer.style.overflow = "scroll"; // forcing scrollbar to appear
      outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps
      document.body.appendChild(outer);

      // Creating inner element and placing it in the container
      const inner = document.createElement("div");
      outer.appendChild(inner);

      // Calculating difference between container's full width and the child width
      const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

      // Removing temporary elements from the DOM
      outer.parentNode.removeChild(outer);

      return scrollbarWidth;
    },

    bodyIsOverflowing() {
      const windowHeight = document.documentElement.clientHeight;
      const scrollHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
      );

      return scrollHeight > windowHeight;
    },
    afterLeave() {
      document.body.style.removeProperty("overflow");
      document.body.style.removeProperty("padding-right");
    },
    handleBackdropClick() {
      this.$emit("click");
    }
  },
  mounted() {
    this.escapeListener = e => {
      if (e.key === "Escape") this.$emit("escape");
    };

    const bodyScrollbarWidth = this.getScrollbarWidth() + "px";

    window.addEventListener("keydown", this.escapeListener);

    // need to check if there's a body overflow first
    if (this.bodyIsOverflowing()) {
      document.body.style.setProperty("overflow", "hidden");
      document.body.style.setProperty("padding-right", bodyScrollbarWidth);
      this.$el.style.setProperty("padding-right", bodyScrollbarWidth);
    }

    console.log('mounted')
  },
  destroyed() {
    window.removeEventListener("keydown", this.escapeListener);
    /* Removing body styles is in a transition hook: afterLeave() */
        console.log('destroyed')

  }
};
</script>

<style lang="scss" >
.page-backdrop {
  background: rgba(black, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  // backdrop-filter: blur(4px);
}

.page-backdrop-enter,
.page-backdrop-leave-to {
  // transform: translateY(-50px);

  opacity: 0;
}

.page-backdrop-enter-to,
.page-backdrop-leave {
  // transform: translateY(0);

  opacity: 1;
}

.page-backdrop-enter-active,
.page-backdrop-leave-active {
  transition: all 0.2s ease;
}
</style>