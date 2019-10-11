package nova.gestion.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
public class User {
    private int idUser;
    private String email;
    private String password;
    private TypeUser typeUser;
    private Employee employee;

    public User(int idUser, String email, String password) {
        this.idUser = idUser;
        this.email = email;
        this.password = password;
    }

    @JsonCreator
    public User(int idUser, String email, String password, TypeUser typeUser, Employee employee) {
        this.idUser = idUser;
        this.email = email;
        this.password = password;
        this.typeUser = typeUser;
        this.employee = employee;
    }

}
