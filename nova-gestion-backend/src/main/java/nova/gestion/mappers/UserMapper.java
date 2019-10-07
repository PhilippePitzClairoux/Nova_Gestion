package nova.gestion.mappers;

import nova.gestion.model.User;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;


@Mapper
@Repository
public interface UserMapper {

    User getUser(Long user);
}
