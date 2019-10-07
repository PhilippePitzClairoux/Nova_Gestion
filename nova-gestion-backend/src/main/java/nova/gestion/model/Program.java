package nova.gestion.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Program {
    private int idProgram;
    private Machine machine;
    private Tool tool;
    private String name;
    private String file;

    public Program(int idProgram, String name, String file)
    {
        this.idProgram = idProgram;
        this.name = name;
        this.file = file;
    }
}
