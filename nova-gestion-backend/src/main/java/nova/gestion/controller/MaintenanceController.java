package nova.gestion.controller;

import nova.gestion.model.Maintenance;
import nova.gestion.model.Task;
import nova.gestion.services.MaintenanceService;
import org.springframework.http.MediaType;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE)
public class MaintenanceController {

    private final MaintenanceService maintenanceService;

    public MaintenanceController(MaintenanceService maintenanceService) {
        this.maintenanceService = maintenanceService;
    }

    @PostMapping("/v1/maintenance")
    public Map<String, Integer> insertMaintenance(@RequestBody @Validated Maintenance maintenance) {
        return Map.of("idMaintenance", maintenanceService.insertMaintenance(maintenance));
    }

    @PutMapping("/v1/maintenance")
    public void updateMaintenance(@RequestBody @Validated Maintenance maintenance) {
        maintenanceService.updateMaintenance(maintenance);
    }

    @DeleteMapping("/v1/maintenance/{idMaintenance}")
    public void deleteMaintenance(@PathVariable @Validated int idMaintenance) {
        maintenanceService.deleteMaintenance(idMaintenance);
    }


}
