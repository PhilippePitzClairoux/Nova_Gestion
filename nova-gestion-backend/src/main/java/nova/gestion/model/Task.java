package nova.gestion.model;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.sql.Date;

@Data
@AllArgsConstructor
public class Task {
    private int idTask;
    private int idTaskType;
    private int idWorkSheet;
    private Date startTime;
    private Date endTime;
}
