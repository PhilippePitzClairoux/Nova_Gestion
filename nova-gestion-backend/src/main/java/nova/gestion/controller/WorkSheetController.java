package nova.gestion.controller;


import com.fasterxml.jackson.core.JsonProcessingException;
import nova.gestion.model.User;
import nova.gestion.model.WorkSheet;
import nova.gestion.services.WorkSheetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Map;

@RestController
@RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE)
public class WorkSheetController {

    private final WorkSheetService workSheetService;

    @Autowired
    public WorkSheetController(WorkSheetService workSheetService) {
        this.workSheetService = workSheetService;
    }

    @GetMapping("/v1/workSheet/{idWorkSheet}")
    public WorkSheet getWorkSheet(@PathVariable @Validated Integer idWorkSheet) {
        return  workSheetService.getWorkSheet(idWorkSheet);
    }

    @GetMapping("/v1/workSheets")
    public ArrayList<WorkSheet> getAllWorkSheets() throws JsonProcessingException {
        return workSheetService.getAllWorkSheets();
    }

    @PostMapping("/v1/workSheet")
    public Map<String, Integer> createWorkSheet(@RequestBody @Validated WorkSheet workSheet) {

        return Map.of("idWorkSheet", workSheetService.createWorkSheet(workSheet));
    }

    @PutMapping("/v1/workSheet")
    public void updateWorkSheet(@RequestBody @Validated WorkSheet workSheet) {
        workSheetService.updateWorkSheet(workSheet);
    }

    @DeleteMapping("/v1/workSheet/{idWorkSheet}")
    public void deleteWorkSheet(@PathVariable @Validated Integer idWorkSheet) {
         workSheetService.deleteWorkSheet(idWorkSheet);;
    }

}

