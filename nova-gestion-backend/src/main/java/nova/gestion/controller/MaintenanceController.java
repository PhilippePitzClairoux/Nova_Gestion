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

    /**
     * POST /v1/maintenance
     * Cree une maintenance dans la base de donnee
     * @param maintenance
     * @return idMaintenance ajoutée
     */
    @PostMapping("/v1/maintenance")
    public Map<String, Integer> insertMaintenance(@RequestBody @Validated Maintenance maintenance) {
        return Map.of("idMaintenance", maintenanceService.insertMaintenance(maintenance));
    }

    /**
     * PUT /v1/maintenance
     * Mis à jour une maintenance dans la BD
     * @param maintenance
     */
    @PutMapping("/v1/maintenance")
    public void updateMaintenance(@RequestBody @Validated Maintenance maintenance) {
        maintenanceService.updateMaintenance(maintenance);
    }

    /**
     * DELETE /v1/maintenance/{idMaintenance}/
     * supprime une maintenance de la BD avec l'id spécifié
     * @param idMaintenance
     */
    @DeleteMapping("/v1/maintenance/{idMaintenance}/")
    public void deleteMaintenance(@PathVariable @Validated int idMaintenance) {
        maintenanceService.deleteMaintenance(idMaintenance);
    }


}
