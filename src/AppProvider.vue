
<template>
  <n-loading-bar-provider>
    <n-message-provider>
      <n-dialog-provider>
           <n-config-provider :theme="theme">
                <slot></slot>
           </n-config-provider>
      </n-dialog-provider>
    </n-message-provider>
  </n-loading-bar-provider>
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

defineComponent({
  name: 'AppProvider',
  components: {
    NMessageProvider,
    NLoadingBarProvider,
    NDialogProvider,
    NConfigProvider,
  },
});

const theme = darkTheme;
</script>