<template>
<footer>
    <div style="display: flex; margin: auto; justify-content: center; align-items: center;">
        <div class="logos" style="display: flex; justify-content: space-between; align-items: center;">
            <n-a href="https://discord.gg/Y7rU8VnC8X" target="_blank">
                <n-icon color="#738ADB" size="25">
                    <LogoDiscord />
                </n-icon>
            </n-a>
            <n-a href="https://github.com/Parapheen" target="_blank">
                <n-icon color="#f4f4f4" size="25" style="margin-left: 10px;">
                    <LogoGithub />
                </n-icon>
            </n-a>
    
        </div>
    </div>
    <n-p>Built by independent developer </n-p>
    <n-p>&copy; {{ new Date().getFullYear() }} SkillReview. All rights reserved.</n-p>
</footer>
</template>

<script setup lang="ts">
import { LogoDiscord, LogoGithub } from '@vicons/ionicons5'

</script>