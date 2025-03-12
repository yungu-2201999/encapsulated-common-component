<template>
  <div ref="containerRef">
    <slot></slot>
    <teleport to='body'>
      <Transition @before-enter="handleBeforeEnter" @enter="handleEnter" @after-enter="handleAfterEnter">
        <div v-if="showMenu" class="context-menu" :style="{
          left: `${x}px`,
          top: `${y}px`
        }">
          <div  class="menu-list">
            <div v-for="(item, i) in menu"  :key="item.label" class="menu-item" @click="handleClick(item)">{{ item?.label
            }}</div>
          </div>
        </div>
      </Transition>
    </teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useContextMenuHook } from './useContexMenuHook.ts'
const props = defineProps({
  menu: {
    type: Array,
    default: () => []
  },
})
const containerRef = ref<Ref | null>(null);
const emit = defineEmits(['select']);

const { x, y, showMenu } = useContextMenuHook(containerRef);


function handleBeforeEnter(el) {
  el.style.height = 0;
}

function handleEnter(el) {
  el.style.height = 'auto';
  const h = el.clientHeight;
  el.style.height = 0;
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      el.style.height = `${h}px`;
      el.style.transition = '0.5s';
    })
  })
}

function handleAfterEnter(el) {
  el.style.transition = 'none';
}

function handleClick(item) {
  console.log("item",item)
  showMenu.value = false;
  emit('select', item);
}

</script>

<style scoped lang="scss">
.context-menu {
  position: fixed;
  z-index: 9999;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  user-select: none;
}

.menu-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
  width: 200px;
  max-height: 200px;
  overflow-y: auto;
}

.menu-item {
  padding: 8px 16px;
  cursor: pointer;
  width: 100%;
  text-align: center;

  &:hover {
    background-color: rgb(54, 54, 179);
  }
}
</style>
