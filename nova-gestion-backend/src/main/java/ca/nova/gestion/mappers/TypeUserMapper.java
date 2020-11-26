package ca.nova.gestion.mappers;

import ca.nova.gestion.model.TypeUser;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Mapper
@Repository
public interface TypeUserMapper {

    TypeUser getTypeUser(int idUserType);

    ArrayList<TypeUser> getAllUserTypes();
}
