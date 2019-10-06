package nova.gestion.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class User {
    private int idUser;
    private int idUserType;
    private int idEmploye;
    private String email;
    private String password;

}
