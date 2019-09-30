package nova.gestion.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class WorkSheetClientProgram {
    private int idTaWorkSheetClientProgram;
    private int idProgram;
    private int idWorkSheet;
    private int idClient;
}
