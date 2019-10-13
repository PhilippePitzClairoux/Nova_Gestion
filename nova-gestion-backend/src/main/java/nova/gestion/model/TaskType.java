package nova.gestion.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TaskType {
    private int idTaskType;
    private String description;
}
