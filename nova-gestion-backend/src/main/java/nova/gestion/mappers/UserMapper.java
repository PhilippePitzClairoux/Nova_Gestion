package nova.gestion.mappers;

import nova.gestion.model.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Map;

@Mapper
@Repository
public interface UserMapper {

    User getUser(int idUser);

    ArrayList<User> getAllUsers();

    void insertUser(User user);

    void updateUser(User user);

    void deleteUser(int idUser);

    User getUserByEmail(String email);
}
