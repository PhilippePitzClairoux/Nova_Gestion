package nova.gestion.controller;


import com.fasterxml.jackson.core.JsonProcessingException;
import nova.gestion.model.User;
import nova.gestion.model.WorkSheet;
import nova.gestion.services.WorkSheetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
@RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE)
public class WorkSheetController {

    private final WorkSheetService workSheetService;

    @Autowired
    public WorkSheetController(WorkSheetService workSheetService) {
        this.workSheetService = workSheetService;
    }

    @GetMapping("/v1/workSheet/{idWorkSheet}/{idProgram}/{idClient}/")
    public WorkSheet getWorkSheet(@PathVariable @Validated Integer idWorkSheet, @PathVariable @Validated Integer idProgram,@PathVariable @Validated Integer idClient) {
        return  workSheetService.getWorkSheet(idWorkSheet, idProgram, idClient);
    }

    @GetMapping("/v1/workSheets")
    public ArrayList<WorkSheet> getAllWorkSheets() throws JsonProcessingException {
        return workSheetService.getAllWorkSheets();
    }
}
