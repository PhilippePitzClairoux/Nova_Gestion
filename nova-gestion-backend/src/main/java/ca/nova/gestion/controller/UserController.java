package ca.nova.gestion.controller;

import ca.nova.gestion.model.Employee;
import ca.nova.gestion.model.User;
import ca.nova.gestion.services.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Map;


@RestController
@RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE)
public class UserController {


    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    /**
     * GET /v1/users -> retourne la liste des utilisateurs
     * @return ArrayList {@link User}
     * @throws JsonProcessingException
     */
    @GetMapping("/v1/users")
    public ArrayList<User> getAllUsers() throws JsonProcessingException {
        return userService.getListOfAllUsers();
    }


    /**
     * GET /v1/user/{idUser}/ -> retourne un utilisateur ayant le id specifier
     * @param idUser l'id de l'utilisateur voulu
     * @return {@link User}
     */
    @GetMapping("/v1/user/{idUser}/")
    public User getUser(@PathVariable @Validated Integer idUser) {
        return userService.getUser(idUser);
    }


    /**
     * POST /v1/user
     * Cree un utilisateur dans la base de donnee
     * @param user
     * @return
     */
    @PostMapping("/v1/user")
    public Map<String, Integer> createUser(@RequestBody @Validated User user) {

        return Map.of("idUser", userService.createUser(user));
    }

    /**
     * PUT /v1/user
     * Mis à jour un user dans la BD
     * @param user
     */
    @PutMapping("/v1/user")
    public void updateUser(@RequestBody @Validated User user) {
        userService.updateUser(user);
    }

    /**
     * DELETE /v1/user/{idUser}/
     * supprime un user de la BD avec l'id spécifié
     * @param idUser
     */
    @DeleteMapping("/v1/user/{idUser}/")
    public void deleteUser(@PathVariable @Validated Integer idUser) {
        userService.deleteUser(idUser);
    }

    @GetMapping("/v1/employee")
    public Employee getEmployeeInfo(Authentication authentication) {
        return userService.getEmployeeInformation(authentication.getName());
    }

}
