package ca.nova.gestion.controller;

import ca.nova.gestion.model.TypeUser;
import ca.nova.gestion.services.TypeUserService;
import com.fasterxml.jackson.core.JsonProcessingException;
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

    /**
     * GET /v1/usertypes -> retourne la liste des usertypes
     * @return ArrayList {@link TypeUser}
     * @throws JsonProcessingException
     */
    @GetMapping("/v1/usertypes")
    public ArrayList<TypeUser> getAllUserTypes() throws JsonProcessingException {
        return typeUserService.getAllUserTypes();
    }
}
