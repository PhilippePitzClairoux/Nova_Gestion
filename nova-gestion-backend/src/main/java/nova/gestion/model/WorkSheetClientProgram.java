package nova.gestion.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class WorkSheetClientProgram {
    private int idTaWorkSheetClientProgram;
    private Program program;
    private WorkSheet workSheet;
    private Client client;

    public WorkSheetClientProgram(int idTaWorkSheetClientProgram)
    {
        this.idTaWorkSheetClientProgram = idTaWorkSheetClientProgram;
    }
}
