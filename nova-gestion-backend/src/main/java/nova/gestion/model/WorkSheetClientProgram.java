package nova.gestion.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
public class WorkSheetClientProgram {
    private int idTaWorkSheetClientProgram;
    private Program program;
    private Client client;

    public WorkSheetClientProgram(int idTaWorkSheetClientProgram)
    {
        this.idTaWorkSheetClientProgram = idTaWorkSheetClientProgram;
    }

    @JsonCreator
    public WorkSheetClientProgram(int idTaWorkSheetClientProgram, Program program, Client client) {
        this.idTaWorkSheetClientProgram = idTaWorkSheetClientProgram;
        this.program = program;
        this.client = client;
    }
}
