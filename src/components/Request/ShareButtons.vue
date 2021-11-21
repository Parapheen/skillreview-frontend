<template>
<n-space>
    <a :href="vkLink" target="_blank">
        <n-button color="#0077FF">
            <template #icon>
                <n-icon color="#FFFFFF">
                    <LogoVk />
                </n-icon>
            </template>
        </n-button>
    </a>
    <a :href="twitterLink" target="_blank">
        <n-button color="#1DA1F2">
            <template #icon>
                <n-icon color="#F5F8FA">
                    <LogoTwitter />
                </n-icon>
            </template>
        </n-button>
    </a>
</n-space>
</template>

<script setup lang="ts">
import { LogoVk, LogoTwitter } from '@vicons/ionicons5'

const vkLink = `http://vk.com/share.php?url=${window.location.href}&title=Rate my game on SkillReview`
const twitterLink = `https://twitter.com/intent/tweet?text=Rate my game on SkillReview&url=${window.location.href}`

</script>