package nova.gestion.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Blank {

    private int idBlank;
    private int codeGrade;
    private int idCoolantHole;
    private String name;
    private int stockQuanity;
    private int minimumQuantity;
    private double diameter;
    private double length;
}
