package nova.gestion.authentication;


import nova.gestion.authentication.mappers.UserTypePermissionMapper;
import nova.gestion.mappers.UserMapper;
import nova.gestion.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Component;


@Component
public class CustomAuthenticationProvider implements AuthenticationProvider {

    private final UserMapper userMapper;
    private final UserTypePermissionMapper userTypePermissionMapper;

    @Autowired
    public CustomAuthenticationProvider(UserMapper userMapper, UserTypePermissionMapper userTypePermissionMapper) {
        this.userMapper = userMapper;
        this.userTypePermissionMapper = userTypePermissionMapper;
    }

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {

        String username = authentication.getName();
        String password = authentication.getCredentials().toString();

        User user = userMapper.getUserByEmail(username);

        System.out.println(userTypePermissionMapper.getUserTypePermissions(user.getTypeUser().getIdTypeUser()));
        System.out.println(BCrypt.hashpw("test", BCrypt.gensalt()));
        if (user.getPassword() != null && BCrypt.checkpw(password, user.getPassword())) {
            //create token
            return new UsernamePasswordAuthenticationToken(
                    username, password, null /* permissions here*/);

        } else {
            return null;
        }
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }
}
