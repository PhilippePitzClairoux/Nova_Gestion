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
    private int stockQuanity;
    private int minimumQuantity;
    private double diameter;
    private double length;

    public Blank(int idBlank, String name, int stockQuanity, int minimumQuantity, double diameter, double length)
    {
        this.idBlank = idBlank;
        this.name = name;
        this.stockQuanity = stockQuanity;
        this.minimumQuantity = minimumQuantity;
        this.diameter = diameter;
        this.length = length;
    }
}

