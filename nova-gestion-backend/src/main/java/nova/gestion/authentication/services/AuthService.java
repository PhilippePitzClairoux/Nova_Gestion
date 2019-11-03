package nova.gestion.authentication.services;

import nova.gestion.mappers.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserMapper userMapper;

    @Autowired
    public AuthService(UserMapper userMapper) {
        this.userMapper = userMapper;
    }

    public boolean verifyUserInformation(String username, String password) {



        return true;
    }

}
