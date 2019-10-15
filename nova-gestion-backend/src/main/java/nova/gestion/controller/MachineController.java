package nova.gestion.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import nova.gestion.model.Machine;
import nova.gestion.services.MachineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Map;

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

    @PostMapping("/v1/machine")
    public Map<String, Integer> createMachine(@RequestBody @Validated Machine machine) {

        return Map.of("idMachine", machineService.createMachine(machine));
    }

    @PutMapping("/v1/machine")
    public void updateMachine(@RequestBody @Validated Machine machine) {
        machineService.updateMachine(machine);
    }


}
