package nova.gestion.services;

import nova.gestion.mappers.TaskTypeMapper;
import nova.gestion.model.TaskType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

@Service
public class TaskTypeService {

    private final TaskTypeMapper taskTypeMapper;

    @Autowired
    public TaskTypeService(TaskTypeMapper taskTypeMapper) {
        this.taskTypeMapper = taskTypeMapper;
    }

    @Transactional
    public ArrayList<TaskType> getAllTaskTypes() {
        return taskTypeMapper.getAllTaskTypes();
    }

}
