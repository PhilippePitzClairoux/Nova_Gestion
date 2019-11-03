package nova.gestion.authentication.mappers;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Mapper
@Repository
public interface UserTypePermissionMapper {

    ArrayList<UserTypePermissionMapper> getUserTypePermissions(long idUserType);

}
