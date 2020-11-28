package ca.nova.gestion.mappers;

import ca.nova.gestion.model.Task;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Mapper
@Repository
public interface TaskMapper {

    ArrayList<Task> getTaskByWorkSheetId(int idWorkSheet);
    Task getTask(int idTask);
    void insertNewTask(Task task);
    void updateTask(Task task);
    void deleteTask(int idTask);
}
