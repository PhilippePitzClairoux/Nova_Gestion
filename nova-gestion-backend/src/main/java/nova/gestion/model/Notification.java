package nova.gestion.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Notification {
    private Integer idNotification;
    private Boolean viewed;
    private Blank blank;
}
