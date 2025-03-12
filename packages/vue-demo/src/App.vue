<template>
  <div>
    <ContextMenu :menu="[
      { label: '添加' },
      { label: '删除' },
      { label: '编辑' },
      { label: '查看' },
      { label: '复制' },
    ]" @select="choosel = $event.label">
      <div class="content1">{{choosel}}</div>
    </ContextMenu>
  </div>
</template>

<script setup lang="ts">
import ContextMenu from '@/components/ContextMenu.vue'
import { ref } from 'vue'

const choosel = ref('')
</script>

<style scoped>
.content1 {
  width: 300px;
  height: 300px;
  background-color: green;
}
</style>
