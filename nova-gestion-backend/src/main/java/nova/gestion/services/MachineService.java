package nova.gestion.services;

import nova.gestion.errors.exceptions.RessourceNotFound;
import nova.gestion.mappers.MachineMapper;
import nova.gestion.mappers.MaintenanceMapper;
import nova.gestion.mappers.ModelMapper;
import nova.gestion.model.Machine;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class MachineService {
    private final MachineMapper machineMapper;
    private final MaintenanceMapper maintenanceMapper;
    private final ModelMapper modelMapper;

    @Autowired
    public MachineService(MachineMapper machineMapper, MaintenanceMapper maintenanceMapper, ModelMapper modelMapper) {
        this.machineMapper = machineMapper;
        this.maintenanceMapper = maintenanceMapper;
        this.modelMapper = modelMapper;
    }

    @Transactional
    public Machine getMachine(Integer idMachine) {

        Machine machine = machineMapper.getMachine(idMachine);

        if (machine == null || idMachine == 0)
            throw new RessourceNotFound("Machine does not exist");

        return machine;
    }




}
