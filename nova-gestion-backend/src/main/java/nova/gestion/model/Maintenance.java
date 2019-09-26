package nova.gestion.model;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@Data
@AllArgsConstructor
public class Maintenance {

    private int idMaintenance;
    private int idMachine;
    private String description;
    private Date date;
}
