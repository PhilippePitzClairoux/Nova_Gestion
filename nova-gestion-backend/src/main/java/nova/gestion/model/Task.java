package nova.gestion.model;

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

    public Task(int idTask, int idWorkSheet, Date startTime, Date endTime)
    {
        this.idTask = idTask;
        this.startTime = startTime;
        this.endTime = endTime;
        this.idWorkSheet = idWorkSheet;
    }
}
