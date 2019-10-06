package nova.gestion.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Tool {
    private int idTool;
    private String name;
    private int stockQuantity;
    private int minimumQuantity;
}
