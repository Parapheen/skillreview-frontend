<template>
 <n-page-header style="margin-top: 4rem;" subtitle="Statistics" :title="store.state.user.nickname">
    <n-grid :cols="4">
      <n-gi>
        <n-statistic label="Skill Requests" value="125" />
      </n-gi>
      <n-gi>
        <n-statistic label="Skill Reviews" value="22" />
      </n-gi>
      <n-gi>
        <n-statistic label="Rank" :value="store.state.user.rank" />
      </n-gi>
      <n-gi>
        <n-statistic label="Pricing plan" :value="store.state.user.plan" />
      </n-gi>
    </n-grid>
    <template #extra>
        <n-button>
            Refresh rank
        </n-button>
    </template>
    <template #avatar>
      <n-avatar
        :src="store.state.user.avatar"
      />
    </template>
    <template #footer>
        <n-a href="/requests/new">
            Submit new Match
        </n-a>
    </template>
  </n-page-header>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';

const store = useStore()
</script>