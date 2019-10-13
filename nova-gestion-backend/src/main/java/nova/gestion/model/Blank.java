package nova.gestion.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Blank {
    private int idBlank;
    private String name;
    private int stockQuantity;
    private int minimumQuantity;
    private double diameter;
    private double length;
    private Grade grade;
    private CoolantHole coolantHole;

    public Blank(int idBlank, String name, int stockQuantity, int minimumQuantity, double diameter, double length) {
        this.idBlank = idBlank;
        this.name = name;
        this.stockQuantity = stockQuantity;
        this.minimumQuantity = minimumQuantity;
        this.diameter = diameter;
        this.length = length;
    }

    @JsonCreator
    public Blank(int idBlank, String name, int stockQuantity,int minimumQuantity, double diameter, double length, Grade grade, CoolantHole coolantHole) {
        this.idBlank = idBlank;
        this.name = name;
        this.stockQuantity = stockQuantity;
        this.minimumQuantity = minimumQuantity;
        this.diameter = diameter;
        this.length = length;
        this.grade = grade;
        this.coolantHole = coolantHole;
    }


}

