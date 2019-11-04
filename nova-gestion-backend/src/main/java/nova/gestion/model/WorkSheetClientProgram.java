package nova.gestion.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
public class WorkSheetClientProgram {
    private int idTaWorkSheetClientProgram;
    private int idWorkSheet;
    private int idProgram;
    private int idClient;

   /* public WorkSheetClientProgram(int idTaWorkSheetClientProgram, int idWorkSheet)
    {
        this.idTaWorkSheetClientProgram = idTaWorkSheetClientProgram;
        this.idWorkSheet = idWorkSheet;
    }

    @JsonCreator
    public WorkSheetClientProgram(int idTaWorkSheetClientProgram, int idWorkSheet, Program program, Client client) {
        this.idTaWorkSheetClientProgram = idTaWorkSheetClientProgram;
        this.idWorkSheet = idWorkSheet;
        this.program = program;
        this.client = client;
    }*/
}
