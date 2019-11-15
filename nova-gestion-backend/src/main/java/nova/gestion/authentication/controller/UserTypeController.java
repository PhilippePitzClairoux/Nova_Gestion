package nova.gestion.authentication.controller;

import nova.gestion.model.User;
import nova.gestion.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE)
public class UserTypeController {

    private final UserService userService;

    @Autowired
    public UserTypeController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/v1/usertype")
    @ResponseBody
    public Map<String, String> getCurrentRole(Authentication authentication) {
        User user = userService.getUserByEmail(authentication.getName());
        return Map.of("UserType", user.getTypeUser().getName());
    }

}
