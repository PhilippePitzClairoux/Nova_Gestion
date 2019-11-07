package nova.gestion.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.sql.Date;

@Data
@AllArgsConstructor
public class Task {
    private int idTask;
    private int idWorkSheet;
    private TaskType taskType;
    private Date startTime;
    private Date endTime;

    @JsonCreator
    public Task(int idTask, int idWorkSheet, Date startTime, Date endTime)
    {
        this.idTask = idTask;
        this.startTime = startTime;
        this.endTime = endTime;
        this.idWorkSheet = idWorkSheet;
    }
}
