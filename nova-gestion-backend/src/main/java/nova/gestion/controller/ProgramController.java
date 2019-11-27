package nova.gestion.controller;


import com.fasterxml.jackson.core.JsonProcessingException;
import nova.gestion.model.Client;
import nova.gestion.model.Program;
import nova.gestion.model.User;
import nova.gestion.model.WorkSheetClientProgram;
import nova.gestion.services.ProgramService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.Map;

@RestController
@RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE)
public class ProgramController {
    private final ProgramService programService;

    @Autowired
    public ProgramController(ProgramService programService) {
        this.programService = programService;
    }

    /**
     * GET /v1/programs -> retourne la liste des programs
     * @return ArrayList {@link nova.gestion.model.Program}
     * @throws JsonProcessingException
     */
    @GetMapping("/v1/programs")
    public ArrayList<Program> getAllPrograms() throws JsonProcessingException {
        return programService.getAllPrograms();
    }

    /**
     * GET /v1/program/{idProgram}/ -> retourne un Program ayant le id specifié
     * @param idProgram l'id du Program voulu
     * @return {@link nova.gestion.model.Program}
     */
    @GetMapping("/v1/program/{idProgram}/")
    public Program getProgram(@PathVariable @Validated int idProgram){
        return programService.getProgram(idProgram);
    }

    /**
     * POST /v1/program
     * Cree un program dans la base de donnee
     * @param program
     * @return idProgram ajouté
     */
    @PostMapping("/v1/program")
    public Map<String, Integer> createProgram(@RequestBody @Validated Program program) {
        return Map.of("idProgram", programService.createProgram(program));
    }

    /**
     * POST /v1/workSheetClientProgram
     * Cree un workSheetClientProgram dans la base de donnee
     * (ajoute un idProgram avec le idClient dans la table d'association workSheetClientProgram)
     * @param workSheetClientProgram
     *
     */
    @PostMapping("/v1/workSheetClientProgram")
    public void createProgramClient(@RequestBody @Validated WorkSheetClientProgram workSheetClientProgram) {

        Integer id = programService.createProgramClient(workSheetClientProgram);
        //return Map.of("idTaWorkSheetClientProgram", id);
    }

    /**
     * PUT /v1/program
     * Mis à jour un program dans la BD
     * @param program
     */
    @PutMapping("/v1/program")
    public void updateProgram(@RequestBody @Validated Program program) {
        programService.updateProgram(program);
    }

    /**
     * DELETE /v1/program/{idProgram}/
     * supprime un program de la BD avec l'id spécifié
     * @param idProgram
     */
    @DeleteMapping("/v1/program/{idProgram}/")
    public void deleteProgram(@PathVariable @Validated Integer idProgram) {
        programService.deleteProgram(idProgram);
    }

    /**
     * DELETE /v1/workSheetClientProgram/{idProgram}/{idClient}/
     * supprime une ligne de la table d'association workSheetClientProgram
     * avec l'idProgram et l'idClient spécifiés
     * @param idProgram
     * @param idClient
     */
    @DeleteMapping("/v1/workSheetClientProgram/{idProgram}/{idClient}/")
    public void deleteProgram(@PathVariable @Validated Integer idProgram, @PathVariable @Validated Integer idClient) {
        programService.deleteProgramClient(idProgram, idClient);
    }

}
