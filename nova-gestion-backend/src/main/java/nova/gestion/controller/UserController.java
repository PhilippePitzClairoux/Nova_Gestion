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

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
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
    public Map<String, Integer> createUser(@JsonView(UserPost.Views.Insert.class)
                                               @RequestBody @Validated UserPost user) {

        Integer id = userService.createUser(user.getIdUserType(),
                user.getIdEmployee(),
                user.getEmail(),
                user.getPassword());

        return Map.of("id", id);
    }

    @PutMapping
    public void updateUser(@JsonView(UserPost.Views.Update.class)
                               @RequestBody @Valid UserPost user) {
        userService.updateUser(user);
    }

}
