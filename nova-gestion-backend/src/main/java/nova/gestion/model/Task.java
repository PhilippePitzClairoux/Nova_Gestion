package nova.gestion.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
public class Task {
    private int idTask;
    private int idWorkSheet;
    private TaskType taskType;
    private Timestamp startTime;
    private Timestamp endTime;

    @JsonCreator
    public Task(int idTask, int idWorkSheet, Timestamp startTime, Timestamp endTime)
    {
        this.idTask = idTask;
        this.startTime = startTime;
        this.endTime = endTime;
        this.idWorkSheet = idWorkSheet;
    }
}
