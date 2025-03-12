import { onMounted, onUnmounted, ref, } from 'vue';
import type { Ref } from 'vue'
export function useContextMenuHook(container: Ref<HTMLElement | null>) {
  const x = ref(0);
  const y = ref(0);
  const showMenu = ref(false);

  const closeHandler = () => {
    showMenu.value = false;
  }
  const contextmenuHandler = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    x.value = e.clientX;
    y.value = e.clientY;
    showMenu.value = true;
  }
  onMounted(() => {
    container.value!.addEventListener('contextmenu', contextmenuHandler);
    window.addEventListener('contextmenu', closeHandler, true);
    window.addEventListener('click', closeHandler, true);
  })
  onUnmounted(() => {
    container.value!.removeEventListener('contextmenu', contextmenuHandler);
    window.removeEventListener('contextmenu', closeHandler, true);
    window.removeEventListener('click', closeHandler, true);
  })

  return { x, y, showMenu }
}
