export const createNewTask(taskId, mongoService){

  const task = {}
  const updatedTask = mongoService.save(task);
  mongoService.updateUserTaskList(task.Id);

  return updateTask;

}
