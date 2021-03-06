package ca.nova.gestion.authentication;


import ca.nova.gestion.mappers.UserMapper;
import ca.nova.gestion.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCrypt;

import java.util.List;


@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class CustomAuthenticationProvider implements AuthenticationProvider {

    private final UserMapper userMapper;

    @Autowired
    public CustomAuthenticationProvider(UserMapper userMapper) {
        this.userMapper = userMapper;
    }

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {

        String username = authentication.getName();
        String password = authentication.getCredentials().toString();

        if (username.isEmpty() || password.isEmpty())
            return null;

        User user = userMapper.getUserByEmail(username);

        if (user != null && user.getPassword() != null && BCrypt.checkpw(password, user.getPassword())) {
            //create token
            return new UsernamePasswordAuthenticationToken(
                    username,
                    password,
                    List.of(new SimpleGrantedAuthority("ROLE_" + user.getTypeUser().getName())));

        } else {
            return null;
        }
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }
}
