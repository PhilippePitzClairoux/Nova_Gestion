package ca.nova.gestion.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Employee {
    private int idEmployee;
    private String name;
    private String surname;
}
