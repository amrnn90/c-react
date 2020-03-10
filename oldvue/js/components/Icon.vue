<template>
  <svg class="icon" :style="styles" viewBox="0 0 32 32">
    <use :xlink:href="iconUrl" />
  </svg>
</template>

<script>
import iconSpriteUrl from "@/../icons/feather-sprite.svg";
let loadedSprite = false;

export default {
  props: {
    name: { type: String },
    size: { default: 24 },
    stroke: { default: "currentColor" },
    strokeWidth: { default: 1 },
    strokeLinecap: { default: "round" },
    strokeLinejoin: { default: "round" }
  },
  computed: {
    iconUrl() {
      return "#" + this.name;
    },
    styles() {
      return {
        width: parseInt(this.size) + 'px',
        height: parseInt(this.size) + 'px',
        stroke: this.stroke,
        strokeWidth: this.strokeWidth,
        strokeLinecap: this.strokeLinecap,
        strokeLinejoin: this.strokeLinejoin,
        fill: 'none',
        display: 'inline-block',
        boxSizing: 'content-box',
      };
    }
  },
  mounted() {
    if (!loadedSprite) {
      loadedSprite = true;

      axios(iconSpriteUrl)
        .then(({ data }) => {
          return data;
        })
        .then(data => {
          const spriteEl = document.createElement("div");
          spriteEl.style.setProperty("display", "none");
          spriteEl.innerHTML = data;
          document.body.appendChild(spriteEl);
        })
        .catch(error => {
          loadedSprite = false;
        });
    }
  }
};
</script>

<style scoped>
/* .icon {
  width: 24px;
  height: 24px;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;
} */
</style>