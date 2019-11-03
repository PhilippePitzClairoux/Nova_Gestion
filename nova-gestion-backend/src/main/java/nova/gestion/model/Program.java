package nova.gestion.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
public class Program {
    private int idProgram;
    private String name;
    private String file;
    private Machine machine;
    private Tool tool;
    private Client client;
    private Blank blank;

    public Program(int idProgram, String name, String file)
    {
        this.idProgram = idProgram;
        this.name = name;
        this.file = file;
    }

    @JsonCreator
    public Program(int idProgram, String name, String file, Machine machine, Tool tool, Client client, Blank blank) {
        this.idProgram = idProgram;
        this.name = name;
        this.file = file;
        this.machine = machine;
        this.tool = tool;
        this.client = client;
        this.blank = blank;
    }

}
