package nova.gestion.controller;

import com.fasterxml.jackson.annotation.JsonView;
import com.fasterxml.jackson.core.JsonProcessingException;
import nova.gestion.model.User;
import nova.gestion.model.post.UserPost;
import nova.gestion.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
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
     * @return ArrayList {@link nova.gestion.model.User}
     * @throws JsonProcessingException
     */
    @GetMapping("/v1/users")
    public ArrayList<User> getAllUsers() throws JsonProcessingException {
        return userService.getListOfAllUsers();
    }


    /**
     * GET /v1/user/{idUser}/ -> retourne un utilisateur ayant le id specifier
     * @param idUser l'id de l'utilisateur voulu
     * @return {@link nova.gestion.model.User}
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
    public Map<String, Integer> createUser(@JsonView(UserPost.Views.Insert.class)
                                               @RequestBody @Validated UserPost user) {

        Integer id = userService.createUser(user.getIdUserType(),
                user.getIdEmployee(),
                user.getEmail(),
                user.getPassword());

        return Map.of("id", id);
    }

    @PutMapping("/v1/user")
    public void updateUser(@RequestBody @Validated User user) {
        userService.updateUser(user);
    }

    @DeleteMapping("/v1/user")
    public void deleteUser(@JsonView(UserPost.Views.Delete.class)
                           @RequestBody @Validated UserPost user) {
        userService.deleteUser(user);
    }

}
