<template>
  <nav class="sidebar">
    <ul class="sidebar-items">
      <li class="sidebar-items__item" v-for="resource in resources" :key="resource.name">
        <router-link :to="{name: resource.name + '.index'}">
          <span class="icon-wrapper">
            <icon name="folder" size="24" class="menu-icon" />
          </span>
          <span>{{resource.label}}</span>
        </router-link>
      </li>
      <li class="sidebar-items__item">
        <a href="#">
          <span class="icon-wrapper">
            <icon name="share" size="24" class="menu-icon" />
          </span>
          <span>Sharing</span>
        </a>
      </li>
      <li class="sidebar-items__item">
        <a href="#">
          <span class="icon-wrapper">
            <icon name="file" size="24" class="menu-icon" />
          </span>
          <span>File Requests</span>
        </a>
      </li>
      <li class="sidebar-items__item">
        <a href="#">
          <span class="icon-wrapper">
            <icon name="users" size="24" class="menu-icon" />
          </span>
          <span>Users</span>
        </a>
      </li>
      <li class="sidebar-items__item">
        <a href="#">
          <span class="icon-wrapper">
            <icon name="trash-2" size="24" class="menu-icon" />
          </span>
          <span>Deleted Files</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  computed: {
    resources() {
      return window.structure.resources;
    }
  }
};
</script>

<style scoped lang="scss">
@import "resources/sass/init";

.sidebar {
  position: fixed;
  left: 0;
  z-index: 7777;
  width: var(--sidebar-width);
  height: 100vh;
  padding-top: 200px;
  background: white;
  box-shadow: 3px 0 30px rgba(black, 0.05);
  display: flex;
  justify-content: center;
}

.sidebar-items {
  max-width: var(--sp-16);
}

.sidebar-items__item {
  margin-bottom: var(--sp-9);
  font-weight: var(--fw-regular);
  font-size: var(--fz-xs);
  color: var(--grey-7);
  a {
    display: flex;
    align-items: flex-start;
  }

  .router-link-active {
    color: var(--grey-4);
  }

  .icon-wrapper {
    display: flex;
    align-items: center;
    height: 1.5em;
    margin-right: var(--sp-4);
  }
}
</style>