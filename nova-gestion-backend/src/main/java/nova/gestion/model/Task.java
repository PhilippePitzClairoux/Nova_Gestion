package nova.gestion.model;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.sql.Date;

@Data
@AllArgsConstructor
public class Task {
    private int idTask;
    private TaskType taskType;
    private WorkSheet workSheet;
    private Date startTime;
    private Date endTime;

    public Task(int idTask, Date startTime, Date endTime)
    {
        this.idTask = idTask;
        this.startTime = startTime;
        this.endTime = endTime;
    }
}
