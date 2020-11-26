package ca.nova.gestion.services;

import ca.nova.gestion.errors.exceptions.InvalidRequest;
import ca.nova.gestion.errors.exceptions.RessourceNotFound;
import ca.nova.gestion.mappers.MaintenanceMapper;
import ca.nova.gestion.model.Maintenance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class MaintenanceService {

    private final MaintenanceMapper maintenanceMapper;

    @Autowired
    public MaintenanceService(MaintenanceMapper maintenanceMapper) {
        this.maintenanceMapper = maintenanceMapper;
    }

    @Transactional
    @PreAuthorize("hasRole('Admin') or hasRole('Superviseur')")
    public int insertMaintenance(Maintenance maintenance) {
        if (maintenance == null)
            throw new InvalidRequest("Missing parameters");

        if (maintenance.getIdMachine() == 0 || maintenance.getDescription() == null || maintenance.getDate() == null)
            throw new InvalidRequest("Missing parameters");

        maintenanceMapper.insertMaintenance(maintenance);

        return maintenance.getIdMaintenance();
    }

    @Transactional
    @PreAuthorize("hasRole('Admin')")
    public void updateMaintenance(Maintenance maintenance) {
        Maintenance verifiedMaintenance = maintenanceMapper.getMaintenance(maintenance.getIdMaintenance());

        if (maintenance.getIdMaintenance() == 0 || verifiedMaintenance == null)
            throw new InvalidRequest("Missing IdMaintenance");

        if (maintenance.getIdMachine() == 0 || maintenance.getDescription() == null || maintenance.getDate() == null)
            throw new InvalidRequest("Missing information for update");
        maintenanceMapper.updateMaintenance(maintenance);
    }

    @Transactional
    @PreAuthorize("hasRole('Admin') or hasRole('Superviseur')")
    public void deleteMaintenance(int idMaintenance) {
        if (maintenanceMapper.getMaintenance(idMaintenance) == null)
            throw new RessourceNotFound("Invalid idMaintenance");

        maintenanceMapper.deleteMaintenance(idMaintenance);
    }

}
