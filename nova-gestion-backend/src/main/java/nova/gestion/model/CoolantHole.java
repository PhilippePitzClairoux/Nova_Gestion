package nova.gestion.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CoolantHole {

    private int idCoolantHole;
    private int idTypeCoolantHole;
    private int quality;
    private double diameter;
}
