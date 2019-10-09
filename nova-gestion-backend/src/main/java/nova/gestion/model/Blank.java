package nova.gestion.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Blank {
    private int idBlank;
    private Grade grade;
    private CoolantHole coolantHole;
    private String name;
    private int stockQuantity;
    private int minimumQuantity;
    private double diameter;
    private double length;

    public Blank(int idBlank, String name, int stockQuantity, int minimumQuantity, double diameter, double length) {
        this.idBlank = idBlank;
        this.name = name;
        this.stockQuantity = stockQuantity;
        this.minimumQuantity = minimumQuantity;
        this.diameter = diameter;
        this.length = length;
    }


}

