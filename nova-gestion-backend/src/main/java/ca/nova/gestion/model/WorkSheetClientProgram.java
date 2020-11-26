package ca.nova.gestion.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class WorkSheetClientProgram {
    private Integer idTaWorkSheetClientProgram;
    private Integer idWorkSheet;
    private Integer idProgram;
    private Integer idClient;

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
