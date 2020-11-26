package ca.nova.gestion.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Model {
    private int idModel;
    private String name;
    private String company;
}
