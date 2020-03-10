<template>
  <header class="header">
    <v-popover style="margin-left: auto; ">
      <img
        src="https://i.pravatar.cc/40?u=amr"
        alt
        style="border-radius: 50%; flex-shrink: 0; width: var(--sp-9); height: var(--sp-9); border: 1px solid var(--grey-9); cursor: pointer"
      />

      <template slot="popover">

          <form :action="logoutUrl" method="POST">
            <input type="hidden" name="_token" :value="csrfToken">
            <button type="submit">Logout</button>
          </form>
      </template>
    </v-popover>
  </header>
</template>


<script>

export default {
  data() {
    return {
      logoutUrl: _.get(window, 'structure.api_urls.logout'),
      csrfToken: null,
    }
  },
  methods: {
    handleLogout() {

    }
  },
  mounted() {
    this.csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  }
};
</script>

<style scoped lang="scss">
@import "resources/sass/init";

.header {
  overflow: hidden;
  position: fixed;
  top: 0;
  background: white;
  width: 100%;
  height: var(--header-height);
  display: flex;
  align-items: center;
  z-index: 1000;
  padding-left: calc(var(--sidebar-width) + var(--main-horizontal-padding));
  padding-right: var(--main-horizontal-padding);
}
</style>