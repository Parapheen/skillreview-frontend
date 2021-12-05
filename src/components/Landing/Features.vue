<template>
<section style="margin-top: 4rem;">
    <n-divider />
    <n-grid cols="1 s:1 m:3" responsive="screen" style="margin: 4rem auto 0 auto;">
        <n-grid-item v-for="feature in features">
            <n-card style="background-color: transparent; border: 0">
                <template #header>
                    <component :is="feature.icon" />
                </template>
                <n-h2 style="margin-bottom: 0;">{{feature.name}}</n-h2>
                <template #footer>
                    <n-p depth="3">{{feature.description}}</n-p>
                </template>
            </n-card>
        </n-grid-item>
    </n-grid>
</section>
</template>

<script setup lang="ts">
import { defineComponent, h } from 'vue'
import { NIcon } from 'naive-ui'
import {
  CheckmarkDoneCircleOutline,
  PeopleSharp,
  BookOutline
} from '@vicons/ionicons5'

defineComponent({
  components: {
    CheckmarkDoneCircleOutline,
    PeopleSharp,
    BookOutline
  }
})

function renderIcon (icon: any) {
  return () => h(NIcon, {size: 30, color: "#63e2b7", style: "background-color: rgba(99, 226, 183, 0.16); border-radius: 50%; padding: 10px"}, { default: () => h(icon) })
}

const features = [
    {
        icon: renderIcon(CheckmarkDoneCircleOutline),
        name: "Quality reviews",
        description: "All reviews go through verification process. It must be either verified by author of the request or by stuff."
    },
    {
        icon: renderIcon(BookOutline),
        name: "Peer-to-Peer methodology",
        description: "People learn faster when they teach others. Remember explaining something to a friend and remembering the subject better?"
    },
    {
        icon: renderIcon(PeopleSharp),
        name: "Reviewers community",
        description: "We choose reviewers carefully. To become a reviewer one should have high rank or accepted by stuff via application form."
    }
]
</script>