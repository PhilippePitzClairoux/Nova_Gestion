package nova.gestion.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import nova.gestion.model.Machine;
import nova.gestion.services.MachineService;
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
public class MachineController {

    private final MachineService machineService;

    @Autowired
    public MachineController(MachineService machineService) {
        this.machineService = machineService;
    }

    @GetMapping("/v1/machines")
    public ArrayList<Machine> getAllMachines() throws JsonProcessingException {
        return machineService.getAllMachines();
    }

    @GetMapping("/v1/machine/{idMachine}/")
    public Machine getMachine(@PathVariable @Validated Integer idMachine) {
        return machineService.getMachine(idMachine);
    }


}
