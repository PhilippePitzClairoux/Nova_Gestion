package ca.nova.gestion.mappers;

import ca.nova.gestion.model.TaskType;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Mapper
@Repository
public interface TaskTypeMapper {

    TaskType getTaskTypeById(int idTaskType);
    ArrayList<TaskType> getAllTaskTypes();
}
