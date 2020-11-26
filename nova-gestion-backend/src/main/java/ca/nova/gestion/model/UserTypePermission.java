package ca.nova.gestion.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;

@Data
@AllArgsConstructor
public class UserTypePermission implements GrantedAuthority {
    private int idTaUserTypePermission;
    private TypeUser typeUser;
    private Permission permission;

    public UserTypePermission(int idTaUserTypePermission)
    {
        this.idTaUserTypePermission = idTaUserTypePermission;
    }

    @Override
    public String getAuthority() {
        return permission.getDescription();
    }
}
