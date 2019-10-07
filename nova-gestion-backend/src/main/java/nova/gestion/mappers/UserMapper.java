package nova.gestion.mappers;

import nova.gestion.model.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.Map;

@Mapper
@Repository
public interface UserMapper {

    User getUser(@Param("userId") Long userId);
}
