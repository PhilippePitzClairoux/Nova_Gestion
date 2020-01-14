package nova.gestion.services;

import nova.gestion.errors.exceptions.InvalidRequest;
import nova.gestion.errors.exceptions.RessourceNotFound;
import nova.gestion.mappers.TaskMapper;
import nova.gestion.mappers.TaskTypeMapper;
import nova.gestion.model.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.util.ArrayList;

@Service
public class TaskService {

    private final TaskMapper taskMapper;
    private final TaskTypeMapper taskTypeMapper;

    @Autowired
    public TaskService(TaskMapper taskMapper, TaskTypeMapper taskTypeMapper) {
        this.taskMapper = taskMapper;
        this.taskTypeMapper = taskTypeMapper;
    }

    @Transactional
    public ArrayList<Task> getTasks(int idWorkSheet) {
        ArrayList<Task> values = taskMapper.getTaskByWorkSheetId(idWorkSheet);

        if (values.isEmpty())
            values = new ArrayList<Task>();

        return values;
    }

    @Transactional
    public int insertTask(Task task) {
        if (task == null)
            throw new InvalidRequest("Missing parameters");

        if (task.getIdWorkSheet() == 0 || task.getTaskType() == null || task.getEndTime() == null
                || task.getStartTime() == null)
            throw new InvalidRequest("Missing parameters");

        if (task.getTaskType().getIdTaskType() == 0)
            throw new InvalidRequest("Missing idTaskType");

        //load taskType in order to validate it so we can throw an InvalidRequest if it dosent exist
        task.setTaskType(taskTypeMapper.getTaskTypeById(task.getTaskType().getIdTaskType()));

        if (task.getTaskType() == null)
            throw  new InvalidRequest("Invalid idTaskType");

        taskMapper.insertNewTask(task);

        return task.getIdTask();
    }

    @Transactional
    public void updateTask(Task task) {
        Task verifiedTask = taskMapper.getTask(task.getIdTask());

        if (task.getIdTask() == 0 || verifiedTask == null)
            throw new InvalidRequest("Missing idTask");

        if (task.getTaskType() == null && task.getStartTime() == null && task.getEndTime() == null
                && task.getIdWorkSheet() == 0)
            throw new InvalidRequest("Missing information for update");

        if (task.getTaskType() != null && taskTypeMapper.getTaskTypeById(task.getTaskType().getIdTaskType()) == null)
            throw new InvalidRequest("Invalid idTaskType");

        taskMapper.updateTask(task);
    }

    @Transactional
    public void deleteTask(int idTask) {
        if (taskMapper.getTask(idTask) == null)
            throw new RessourceNotFound("Invalid idTask");

        taskMapper.deleteTask(idTask);
    }

}
