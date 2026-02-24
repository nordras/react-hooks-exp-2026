import { useFormStatus } from 'react-dom'

export default function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="btn-primary"
    >
      {pending ? 'Enviando...' : 'Adicionar Tarefa'}
    </button>
  )
}
