package nova.gestion.model;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
public class OrderHistory {
    Integer idOrderHistory;
    Integer idBlank;
    Timestamp timestamp;
    Integer value;
}
