package nova.gestion.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.ArrayList;
import java.util.Date;

@Data
@AllArgsConstructor
public class Maintenance {
    private int idMaintenance;
    private int idMachine;
    private String description;
    private Date date;

    /*public Maintenance(int idMaintenance, String description, Date date)
    {
        this.idMaintenance = idMaintenance;
        this.description = description;
        this.date = date;
    }

    @JsonCreator
    public Maintenance(int idMaintenance, String description, Date date, int machine) {
        this.idMaintenance = idMaintenance;
        this.description = description;
        this.date = date;
        this.idMachine = machine;
    }*/
}
