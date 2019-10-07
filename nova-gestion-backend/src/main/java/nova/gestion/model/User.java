package nova.gestion.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
public class User {
    private int idUser;
    private String email;
    private String password;
    private TypeUser typeUser;
    private Employee employee;
}
