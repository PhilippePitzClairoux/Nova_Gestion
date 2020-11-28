package ca.nova.gestion.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.ArrayList;
import java.util.Date;

@Data
public class Machine {
    private int idMachine;
    private String name;
    private String serialNumber;
    private Date acquisitionDate;
    private Model model;
    private ArrayList<Maintenance> maintenances;

    public Machine(int idMachine, String name, String serialNumber,  Date acquisitionDate)
    {
        this.idMachine = idMachine;
        this.name = name;
        this.serialNumber = serialNumber;
        this.acquisitionDate= acquisitionDate;
    }

    @JsonCreator
    public Machine(int idMachine, String name, String serialNumber, Date acquisitionDate, Model model, ArrayList<Maintenance> maintenances) {
        this.idMachine = idMachine;
        this.name = name;
        this.serialNumber = serialNumber;
        this.acquisitionDate = acquisitionDate;
        this.model = model;
        this.maintenances = maintenances;
    }
}
