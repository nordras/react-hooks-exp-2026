import { useState } from 'react'
import TaskForm from './components/TaskForm'

export default function App() {
  const [initialTasks] = useState([])

  return (
    <section className="container-page">
      <div className="container-content">
        <header className="header-main">
          <h1 className="heading-1">Hooks useActionState and useOptimistic</h1>
        </header>
        <main className="section-space">
          <section>
            <TaskForm initialTasks={initialTasks} />
          </section>
        </main>
      </div>
    </section>
  )
}
