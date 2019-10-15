package nova.gestion.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import nova.gestion.model.TypeUser;
import nova.gestion.services.TypeUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
@RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE)

public class TypeUserController {

    private final TypeUserService typeUserService;

    @Autowired
    public TypeUserController(TypeUserService typeUserService) {
        this.typeUserService = typeUserService;
    }

    @GetMapping("/v1/usertypes ")
    public ArrayList<TypeUser> getAllUserTypes() throws JsonProcessingException {
        return typeUserService.getAllUserTypes();
    }
}
