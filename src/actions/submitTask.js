export async function submitTask(prevState, formData) {
  const title = formData.get('taskTitle')?.trim()

  if (!title) {
    return {
      success: false,
      error: 'Please enter a task title',
      tasks: prevState?.tasks || [],
    }
  }

  if (title.length > 100) {
    return {
      success: false,
      error: 'Title cannot exceed 100 characters',
      tasks: prevState?.tasks || [],
    }
  }

  await new Promise((resolve) => setTimeout(resolve, 2000))

  const newTask = {
    id: Date.now(),
    title,
    completed: false,
    createdAt: new Date().toISOString(),
  }

  return {
    success: true,
    newTask,
    error: null,
    tasks: prevState?.tasks ? [...prevState.tasks, newTask] : [newTask],
  }
}
