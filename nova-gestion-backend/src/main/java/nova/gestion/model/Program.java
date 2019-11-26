package nova.gestion.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.ArrayList;

@Data
public class Program {
    private int idProgram;
    private String name;
    private String file;
    private boolean activated;
    private Machine machine;
    private Tool tool;
    private Blank blank;
    private ArrayList<Client> clients;

    public Program(int idProgram, String name, String file, boolean activated)
    {
        this.idProgram = idProgram;
        this.name = name;
        this.file = file;
        this.activated = activated;
    }

    @JsonCreator
    public Program(int idProgram, String name, String file, boolean activated, Machine machine, Tool tool, Blank blank, ArrayList<Client> clients) {
        this.idProgram = idProgram;
        this.name = name;
        this.file = file;
        this.activated = activated;
        this.machine = machine;
        this.tool = tool;
        this.blank = blank;
        this.clients = clients;
    }

}
