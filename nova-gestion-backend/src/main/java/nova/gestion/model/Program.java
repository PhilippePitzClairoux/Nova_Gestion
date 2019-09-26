package nova.gestion.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Program {

    private int idProgram;
    private int idMachine;
    private int idTool;
    private String name;
    private String file;
}
