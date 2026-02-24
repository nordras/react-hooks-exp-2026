
useActionState + useOptimistic

useActionState:
Gerencia o estado de uma server action, retornando [state, formAction, isPending]
useFormStatus:
Acessa o status de envio do form (pending), desabilita botão automaticamente
useOptimistic:
Atualiza a UI antes do servidor responder (simulamos 2s de delay)
Tente enviar uma tarefa e observe as 3 fases: otimista → pending → confirmação

useActionState:
- Hook que captura o estado de uma server action
- Retorna: [state, formAction, isPending]
- state: último resultado da ação
- formAction: função para passar ao form's action
- isPending: boolean indicando se está processando

useOptimistic:
- Permite atualizar UI otimisticamente antes do servidor responder
- Recebe estado atual e retorna [optimisticValue, addOptimistic]
- Quando ação concluir, volta ao estado real
