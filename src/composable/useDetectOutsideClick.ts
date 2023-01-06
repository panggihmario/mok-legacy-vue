import { onMounted, onBeforeUnmount } from "vue";

export default function useDetectOutsideClick(component : any, callback : () => void) {
  if(!component) return
  const listener = (event : Event) => {
    if(!event.composedPath().includes(component.value!)) {
      callback()
    }else{
      return 
    }
  }

  onMounted(() => {
    window.addEventListener('click', listener)
  })
  onBeforeUnmount(() => {
    document.removeEventListener('click', listener)
  })
  return {
    listener
  }
}