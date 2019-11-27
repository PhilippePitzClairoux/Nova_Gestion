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
    private String diameter;
    private String length;
    private String code;
    private boolean coolantHole;
    private Grade grade;
    // private CoolantHole coolantHole;

    public Blank(int idBlank, String name, int stockQuantity, int minimumQuantity, String diameter, String length, String code, boolean coolantHole) {
        this.idBlank = idBlank;
        this.name = name;
        this.stockQuantity = stockQuantity;
        this.minimumQuantity = minimumQuantity;
        this.diameter = diameter;
        this.length = length;
        this.code = code;
        this.coolantHole = coolantHole;
    }

    @JsonCreator
    public Blank(int idBlank, String name, int stockQuantity, int minimumQuantity, String diameter, String length, String code, Grade grade, boolean coolantHole) {
        this.idBlank = idBlank;
        this.name = name;
        this.stockQuantity = stockQuantity;
        this.minimumQuantity = minimumQuantity;
        this.diameter = diameter;
        this.length = length;
        this.code = code;
        this.grade = grade;
        this.coolantHole = coolantHole;
    }

    /*public boolean getCoolantHole() {
        return this.coolantHole;
    }*/
}
