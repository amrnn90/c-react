<template>
 
 <div>
     <admin-header />

     <admin-sidebar />

     <main class="main">
         <router-view />
     </main>

     <portal-target name="page-backdrop"  />
     <flash-messages />
 </div>
    
</template>

<script>

export default {
    data() {
        return {
        };
    },
    mounted() {
        // setInterval(() => {
        //     document.documentElement.style.setProperty('--primary-hue', Math.ceil(Math.random()*255));
        // }, 2000);
    }
};
</script>

<style scoped lang="scss">
@import "resources/sass/init";

.main {
    padding-top: calc(var(--header-height) + var(--main-top-padding));
    padding-left: calc(var(--sidebar-width) + var(--main-horizontal-padding));
    padding-right: var(--main-horizontal-padding);
}

</style>

