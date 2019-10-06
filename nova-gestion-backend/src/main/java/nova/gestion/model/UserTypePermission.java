package nova.gestion.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserTypePermission {
    private int idTaUserTypePermission;
    private int idUserType;
    private int idPermission;
}
