
<template>
<n-config-provider :theme="darkTheme">
  <n-loading-bar-provider>
      <n-notification-provider>
          <n-message-provider>
              <n-dialog-provider>
                  <App/>
              </n-dialog-provider>
        </n-message-provider>
    </n-notification-provider>
  </n-loading-bar-provider>
</n-config-provider>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';
import {
  NMessageProvider,
  NLoadingBarProvider,
  NDialogProvider,
  NConfigProvider,
  darkTheme,
} from 'naive-ui';
import App from './App.vue'


defineComponent({
    name: 'AppProvider',
    components: {
    NMessageProvider,
    NLoadingBarProvider,
    NDialogProvider,
    NConfigProvider,
  },
});

</script>