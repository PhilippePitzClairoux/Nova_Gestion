package nova.gestion.model;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.ArrayList;
import java.util.Date;

@Data
@AllArgsConstructor
public class Machine {
    private int idMachine;
    private Model model;
    private String name;
    private String serialNumber;
    private Date acquisitionDate;
    private ArrayList<Maintenance> maintenance;

    public Machine(int idMachine, String name, String serialNumber,  Date acquisitionDate)
    {
        this.idMachine = idMachine;
        this.name = name;
        this.serialNumber = serialNumber;
        this.acquisitionDate= acquisitionDate;
    }
}
