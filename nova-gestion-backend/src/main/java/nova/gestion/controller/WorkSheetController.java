package nova.gestion.controller;


import com.fasterxml.jackson.core.JsonProcessingException;
import nova.gestion.model.Client;
import nova.gestion.model.User;
import nova.gestion.model.WorkSheet;
import nova.gestion.services.WorkSheetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.Date;
import java.util.Map;

@RestController
@RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE)
public class WorkSheetController {

    private final WorkSheetService workSheetService;

    @Autowired
    public WorkSheetController(WorkSheetService workSheetService) {
        this.workSheetService = workSheetService;
    }

    /**
     * GET /v1/workSheet/{idWorkSheet} -> retourne une WorkSheet ayant le id specifié
     * @param idWorkSheet l'id de la WorkSheet voulu
     * @return {@link nova.gestion.model.WorkSheet}
     */
    @GetMapping("/v1/workSheet/{idWorkSheet}")
    public WorkSheet getWorkSheet(@PathVariable @Validated Integer idWorkSheet) {
        return  workSheetService.getWorkSheet(idWorkSheet);
    }

    /**
     * GET /v1/workSheets -> retourne la liste des workSheets
     * @return ArrayList {@link nova.gestion.model.WorkSheet}
     * @throws JsonProcessingException
     */
    @GetMapping("/v1/workSheets")
    public ArrayList<WorkSheet> getAllWorkSheets() throws JsonProcessingException {
        return workSheetService.getAllWorkSheets();
    }

    @GetMapping("/v1/workSheets/{dateCreation}/{dueDate}/")
    public ArrayList<WorkSheet> getWorkSheetsByClientDate(@PathVariable @Validated String dateCreation, @PathVariable @Validated String dueDate) throws JsonProcessingException, ParseException {
        return workSheetService.getWorkSheetsByClientDate(dateCreation, dueDate);
    }

    /**
     * POST /v1/workSheet
     * Cree un workSheet dans la base de donnee
     * @param workSheet
     * @return idWorkSheet ajoutée
     */
    @PostMapping("/v1/workSheet")
    public Map<String, Integer> createWorkSheet(@RequestBody @Validated WorkSheet workSheet) {

        return Map.of("idWorkSheet", workSheetService.createWorkSheet(workSheet));
    }

    /**
     * PUT /v1/workSheet
     * Mis à jour une workSheet dans la BD
     * @param workSheet
     */
    @PutMapping("/v1/workSheet")
    public void updateWorkSheet(@RequestBody @Validated WorkSheet workSheet) {
        workSheetService.updateWorkSheet(workSheet);
    }

    /**
     * DELETE /v1/workSheet/{idWorkSheet}/
     * supprime un workSheet de la BD avec l'id spécifié
     * @param idWorkSheet
     */
    @DeleteMapping("/v1/workSheet/{idWorkSheet}")
    public void deleteWorkSheet(@PathVariable @Validated Integer idWorkSheet) {
         workSheetService.deleteWorkSheet(idWorkSheet);;
    }

}

