<template>
<section style="margin-top: 4rem;" >
    <n-divider/>
    <n-space vertical justify="center" style="margin-top: 4rem;">
            <n-h1 style="text-align: center;">How it works</n-h1>
            <div class="video-wrapper">
                <iframe width="500" height="315" frameborder="0" allowfullscreen
                    src="https://www.youtube.com/embed/u7JhVjw38ZE?loop=1&rel=0">
                </iframe> 
            </div>
        </n-space>
</section>
</template>

<script setup lang="ts">
</script>

<style>
.video-wrapper {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  height: 0;
}
.video-wrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

</style>