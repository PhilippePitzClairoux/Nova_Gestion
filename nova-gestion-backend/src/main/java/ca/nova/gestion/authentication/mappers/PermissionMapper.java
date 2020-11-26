package ca.nova.gestion.authentication.mappers;

import ca.nova.gestion.model.Permission;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface PermissionMapper {

    Permission getPermission(int idPermission);
}
