package nova.gestion.model;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@Data
@AllArgsConstructor
public class Machine {
    private int idMachine;
    private int idModel;
    private String name;
    private String serialNumber;
    private Date acquisitionDate;
}
