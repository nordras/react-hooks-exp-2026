import { useActionState, useOptimistic } from 'react'
import { submitTask } from '../actions/submitTask'
import SubmitButton from './SubmitButton'


export default function TaskForm({ initialTasks = [] }) {
  // server action
  const [state, formAction, isPending] = useActionState(submitTask, {
    success: false,
    error: null,
    tasks: initialTasks,
    newTask: null,
  })

  const [optimisticTasks, addOptimisticTask] = useOptimistic(
    state.tasks,
    (currentTasks, newTask) => [...currentTasks, newTask]
  )

  const handleSubmit = async (formData) => {
    const title = formData.get('taskTitle')?.trim()
    if (title) {
      const optimisticTask = {
        id: Math.random(),
        title,
        completed: false,
        createdAt: new Date().toISOString(),
        isOptimistic: true,
      }
      addOptimisticTask(optimisticTask)
    }

    // Chama formAction (que dispara submitTask)
    await formAction(formData)
  }

  return (
    <section className="section-space">
      {/* Form Section */}
      <div className="card-neutral">
        <h2 className="heading-2">Nova Tarefa</h2>
        <form action={handleSubmit} className="form-group">
          <input
            type="text"
            name="taskTitle"
            placeholder="Insira o título da tarefa..."
            maxLength="100"
            disabled={isPending}
            className="input-base"
          />

          <SubmitButton />
        </form>

        {state.error && (
          <section className="alert-error mt-4">
            {state.error}
          </section>
        )}

        {state.success && state.newTask && (
          <section className="alert-success mt-4">
            Tarefa adicionada: <strong>{state.newTask.title}</strong>
          </section>
        )}
      </div>

      {/* Tasks List Section */}
      <section className="card-neutral">
        <h3 className="heading-3">
          Tarefas ({optimisticTasks.length})
        </h3>

        {optimisticTasks.length === 0 ? (
          <p className="text-muted">
            Nenhuma tarefa ainda. Comece a criar.
          </p>
        ) : (
          <ul className="list-items">
            {optimisticTasks.map((task) => (
              <li
                key={task.id}
                className={task.isOptimistic ? 'task-item-optimistic' : 'task-item-confirmed'}
              >
                <div className="task-item-row">
                  <span className="task-title">
                    {task.title}
                  </span>
                  <small className="task-time">
                    {new Date(task.createdAt).toLocaleTimeString('pt-BR', {
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                    })}
                  </small>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </section>
  )
}
