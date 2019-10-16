package nova.gestion.model;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@Data
@AllArgsConstructor
public class Maintenance {
    private int idMaintenance;
    private Machine machine;
    private String description;
    private Date date;

    public Maintenance(int idMaintenance, String description, Date date)
    {
        this.idMaintenance = idMaintenance;
        this.description = description;
        this.date = date;
    }
}
