package nova.gestion.controller;


import com.fasterxml.jackson.annotation.JsonView;
import com.fasterxml.jackson.core.JsonProcessingException;
import nova.gestion.model.Blank;
import nova.gestion.model.post.BlankPost;
import nova.gestion.services.BlankService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.Map;

@RestController
@RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE)
public class BlankController {

    private final BlankService blankService;

    @Autowired
    public BlankController(BlankService blankService) {
        this.blankService = blankService;
    }

    /**
     * GET /v1/blanks -> retourne la liste des blanks
     * @return ArrayList {@link nova.gestion.model.Blank}
     * @throws JsonProcessingException
     */
    @GetMapping("/v1/blanks")
    public ArrayList<Blank> getAllBlanks() throws JsonProcessingException {
        return blankService.getListOfAllBlanks();
    }

    /**
     * GET /v1/blank/{idBlank}/ -> retourne un Blank ayant le id specifié
     * @param idBlank l'id du Blank voulu
     * @return {@link nova.gestion.model.Blank}
     */
    @GetMapping("/v1/blank/{idBlank}/")
    public Blank getBlank(@PathVariable @Validated int idBlank){
        return blankService.getBlank(idBlank);
    }

    /**
     * POST /v1/blank
     * Cree un blank dans la base de donnee
     * @param blank
     * @return idBlank ajouté
     */
    @PostMapping("/v1/blank")
    public Map<String, Integer> createBlank(@RequestBody @Validated Blank blank) {

        Integer id = blankService.createBlank(blank);

        return Map.of("idBlank", id);
    }

    /**
     * PUT /v1/blank
     * Mis à jour un blank dans la BD
     * @param blank
     */
    @PutMapping("/v1/blank")
    public void updateBlank(@RequestBody @Valid Blank blank) {
        blankService.updateBlank(blank);
    }

    /**
     * DELETE /v1/blank/{idBlank}/
     * supprime un blank de la BD avec l'id spécifié
     * @param idBlank
     */
    @DeleteMapping("/v1/blank/{idBlank}")
    public void deleteBlank(@PathVariable @Validated Integer idBlank) {
        blankService.deleteBlank(idBlank);
    }
}
