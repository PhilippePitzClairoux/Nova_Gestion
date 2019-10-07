package nova.gestion.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import nova.gestion.model.User;
import nova.gestion.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Map;


@RestController
@RequestMapping(value = "/v1/user", produces = MediaType.APPLICATION_JSON_VALUE)
public class UserController {


    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ArrayList<User> getAllUsers() throws JsonProcessingException {
        return userService.getListOfAllUsers();
    }


    @GetMapping("/{idUser}/")
    public User getUser(@PathVariable @Validated Integer idUser) {
        return userService.getUser(idUser);
    }


    @PostMapping
    public Map<String, Integer> createUser(@Validated Integer idUserType,
                             @Validated Integer idEmployee,
                             @Validated String email,
                             @Validated String password) {

        Integer id = userService.createUser(idUserType, idEmployee, email, password);

        return Map.of("id", id);
    }

}
