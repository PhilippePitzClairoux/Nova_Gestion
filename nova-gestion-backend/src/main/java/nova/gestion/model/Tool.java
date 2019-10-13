package nova.gestion.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
public class Tool {
    private int idTool;
    private String name;
    private int stockQuantity;
    private int minimumQuantity;

    @JsonCreator
    public Tool(int idTool, String name, int stockQuantity, int minimumQuantity) {
        this.idTool = idTool;
        this.name = name;
        this.stockQuantity = stockQuantity;
        this.minimumQuantity = minimumQuantity;
    }
}
