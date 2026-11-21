
import { ref } from 'vue';

const mensagem = ref('');
const tipo = ref('sucesso');
const visivel = ref(false);

let temporizador = null;

export function useToast() {
  function mostrarToast(texto, tipoMensagem = 'sucesso') {
    mensagem.value = texto;
    tipo.value = tipoMensagem;
    visivel.value = true;

    clearTimeout(temporizador);

    temporizador = setTimeout(() => {
      visivel.value = false;
    }, 3000);
  }

  return {
    mensagem,
    tipo,
    visivel,
    mostrarToast
  };
}
