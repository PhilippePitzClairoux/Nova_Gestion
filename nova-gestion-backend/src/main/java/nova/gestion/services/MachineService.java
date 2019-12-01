package nova.gestion.services;

import nova.gestion.errors.exceptions.InvalidRequest;
import nova.gestion.errors.exceptions.RessourceNotFound;
import nova.gestion.mappers.MachineMapper;
import nova.gestion.mappers.MaintenanceMapper;
import nova.gestion.mappers.ModelMapper;
import nova.gestion.model.Machine;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

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
    @PreAuthorize("hasRole('Admin') or hasRole('Superviseur')")
    public ArrayList<Machine> getAllMachines() {
        ArrayList<Machine> machines = machineMapper.getAllMachines();

        if (machines == null)
            throw new RessourceNotFound("No machines available");

        return machines;
    }

    @Transactional
    @PreAuthorize("hasRole('Admin') or hasRole('Superviseur') or hasRole('Outilleur')")
    public Machine getMachine(Integer idMachine) {

        Machine machine = machineMapper.getMachine(idMachine);

        if (machine == null || idMachine == 0)
            throw new RessourceNotFound("Machine does not exist");

        return machine;
    }

    @Transactional
    @PreAuthorize("hasRole('Admin') or hasRole('Superviseur')")
    public Integer createMachine(Machine machine)
    {
        if (machine == null)
            throw new InvalidRequest("Missing parameters");

        if (machine.getModel() == null)
            throw new InvalidRequest("Missing model");

        if (machine.getName() == null || machine.getSerialNumber() == null || machine.getAcquisitionDate() == null)
            throw new InvalidRequest("Missing Machine parameters");

        if (machine.getModel().getName() == null)
            throw new InvalidRequest("Missing Model parameters");

        modelMapper.insertModel(machine.getModel());
        machineMapper.insertMachine(machine);

        return machine.getIdMachine();
    }

    @Transactional
    @PreAuthorize("hasRole('Admin') or hasRole('Superviseur')")
    public void updateMachine(Machine machine){
        Machine verifiedMachine = machineMapper.getMachine(machine.getIdMachine());

        if (machine.getIdMachine() == 0 || verifiedMachine == null)
            throw new InvalidRequest("Missing parameters");

        if (machine.getName() == null && machine.getSerialNumber() == null && machine.getAcquisitionDate() == null && machine.getModel() == null)
            throw new InvalidRequest("Missing information");

        if (machine.getName() != null || machine.getSerialNumber() != null || machine.getAcquisitionDate() != null )
            machineMapper.updateMachine(machine);

        if (machine.getModel() != null){
            if (machine.getModel().getName() != null)
                verifiedMachine.getModel().setName(machine.getModel().getName());

            modelMapper.updateModel(verifiedMachine.getModel());
        }
    }

    @Transactional
    @PreAuthorize("hasRole('Admin') or hasRole('Superviseur')")
    public void deleteMachine(Integer idMachine) {

        Machine loadMachine = machineMapper.getMachine(idMachine);

        if (loadMachine == null)
            throw new RessourceNotFound("Invalid idMachine");

        machineMapper.deleteMachine(idMachine);
    }



}
