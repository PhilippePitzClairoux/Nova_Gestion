package nova.gestion.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.ArrayList;
import java.util.Date;

@Data
public class Maintenance {
    private int idMaintenance;
    private String description;
    private Date date;
    private Machine machine;

    public Maintenance(int idMaintenance, String description, Date date)
    {
        this.idMaintenance = idMaintenance;
        this.description = description;
        this.date = date;
    }

    @JsonCreator
    public Maintenance(int idMaintenance, String description, Date date, Machine machine) {
        this.idMaintenance = idMaintenance;
        this.description = description;
        this.date = date;
        this.machine = machine;
    }
}
