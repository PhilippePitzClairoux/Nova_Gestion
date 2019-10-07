package nova.gestion.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserTypePermission {
    private int idTaUserTypePermission;
    private TypeUser typeUser;
    private Permission permission;

    public UserTypePermission(int idTaUserTypePermission)
    {
        this.idTaUserTypePermission = idTaUserTypePermission;
    }
}
