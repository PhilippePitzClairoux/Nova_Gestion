package nova.gestion.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class OrderHistoryData {
    private Integer idBlank;
    private Blank blank;
    private Integer receivedQuantity;
    private Integer usedQuantity;
}
