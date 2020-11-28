package ca.nova.gestion.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CoolantHole {
    private int idCoolantHole;
    private TypeCoolantHole typeCoolantHole;
    private int quantity;
    private double diameter;

    public CoolantHole(int idCoolantHole, int quantity, double diameter)
    {
        this.idCoolantHole = idCoolantHole;
        this.quantity = quantity;
        this.diameter = diameter;
    }

    @JsonCreator
    public CoolantHole(int idCoolantHole, int quantity, double diameter, TypeCoolantHole typeCoolantHole) {
        this.idCoolantHole = idCoolantHole;
        this.quantity = quantity;
        this.diameter = diameter;
        this.typeCoolantHole = typeCoolantHole;
    }
}
