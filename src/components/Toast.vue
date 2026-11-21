
<script setup>
import { computed, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  mensagem: {
    type: String,
    required: true
  },
  tipo: {
    type: String,
    default: 'sucesso'
  }
});

const classeToast = computed(() => {
  return props.tipo === 'erro' ? 'toast-erro' : 'toast-sucesso';
});
</script>

<template>
  <Transition name="toast">
    <div class="toast" :class="classeToast" role="status">
      <span>{{ mensagem }}</span>
    </div>
  </Transition>
</template>

<style scoped>
.toast {
  position: fixed;
  top: 24px;
  right: 24px;
  z-index: 1000;
  padding: 14px 20px;
  border-radius: 10px;
  color: #fff;
  font-size: 14px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}

.toast-sucesso {
  background: #16a34a;
}

.toast-erro {
  background: #dc2626;
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.25s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
