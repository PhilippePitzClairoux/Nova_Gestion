package ca.nova.gestion.controller;


import ca.nova.gestion.model.TypeCoolantHole;
import ca.nova.gestion.services.TypeCoolantHoleService;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
@RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE)
public class TypeCoolantHoleController {
    private final TypeCoolantHoleService typeCoolantHoleService;

    @Autowired
    public TypeCoolantHoleController(TypeCoolantHoleService typeCoolantHoleService) {
        this.typeCoolantHoleService = typeCoolantHoleService;
    }

    /**
     * GET /v1/coolantholetypes -> retourne la liste des coolantholetypes
     * @return ArrayList {@link TypeCoolantHole}
     * @throws JsonProcessingException
     */
    @GetMapping("/v1/coolantholetypes")
    public ArrayList<TypeCoolantHole> getAllCoolantHoleTypes() throws JsonProcessingException {
        return typeCoolantHoleService.getAllCoolantHoleTypes();
    }
}
