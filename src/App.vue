<template>
  <AppProvider>
    <n-layout>
        <n-layout-header bordered>
            <NavBar/>
        </n-layout-header>
        <n-layout-content content-style="max-width: 80vw; min-height: 100vh; margin: auto;">
            <router-view></router-view>
        </n-layout-content>
        <n-layout-footer>
            <Footer/>
        </n-layout-footer>
    </n-layout>
  </AppProvider>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';
import AppProvider from '/@/AppProvider.vue';
import NavBar from '/@/components/Navbar.vue';
import Footer from '/@/components/Footer.vue';

defineComponent({
    name: 'App',
    components: {
        AppProvider,
        NavBar,
    },
});

</script>

<style scoped>
.n-layout-footer {
  opacity: 0.6;
  padding: 30px;
  text-align: center;
}
</style>