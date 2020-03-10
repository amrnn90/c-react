<template>
  <div class="spinner" v-show="show">
      <!-- <div class="spinner"> -->
        <div class="bounce bounce1"></div>
        <div class="bounce bounce2"></div>
        <div class="bounce bounce3"></div>
      <!-- </div> -->
  </div>
</template>

<script>
export default {
    props: ['show']
};
</script>

<style scoped lang="scss">
@import "resources/sass/init";

.spinner {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;

    display: flex; 
    align-items: center;
    justify-content: center;
}


.bounce {
  width: 3%;
  padding-top: 3%;
  margin-right: 3px;
  background-color: var(--primary-3);

  border-radius: 100%;
//   display: inline-block;
  -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  animation: sk-bouncedelay 1.4s infinite ease-in-out both;
}

.spinner .bounce1 {
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}

.spinner .bounce2 {
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}

@-webkit-keyframes sk-bouncedelay {
  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
  }
  40% {
    -webkit-transform: scale(1);
  }
}

@keyframes sk-bouncedelay {
  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  40% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
</style>