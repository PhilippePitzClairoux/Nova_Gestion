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

    /**
     * GET /v1/machines -> retourne la liste des machines
     * @return ArrayList {@link nova.gestion.model.Machine}
     * @throws JsonProcessingException
     */
    @GetMapping("/v1/machines")
    public ArrayList<Machine> getAllMachines() throws JsonProcessingException {
        return machineService.getAllMachines();
    }

    /**
     * GET /v1/machine/{idMachine} -> retourne une Machine ayant le id specifié
     * @param idMachine l'id du la Machine voulu
     * @return {@link nova.gestion.model.Machine}
     */
    @GetMapping("/v1/machine/{idMachine}")
    public Machine getMachine(@PathVariable @Validated Integer idMachine) {
        return machineService.getMachine(idMachine);
    }

    /**
     * POST /v1/machine
     * Cree une machine dans la base de donnee
     * @param machine
     * @return idMachine ajoutée
     */
    @PostMapping("/v1/machine")
    public Map<String, Integer> createMachine(@RequestBody @Validated Machine machine) {

        return Map.of("idMachine", machineService.createMachine(machine));
    }

    /**
     * PUT /v1/machine
     * Mis à jour une machine dans la BD
     * @param machine
     */
    @PutMapping("/v1/machine")
    public void updateMachine(@RequestBody @Validated Machine machine) {
        machineService.updateMachine(machine);
    }

    /**
     * DELETE /v1/machine/{idMachine}/
     * supprime une machine de la BD avec l'id spécifié
     * @param idMachine
     */
    @DeleteMapping("/v1/machine/{idMachine}")
    public void deleteMachine(@PathVariable @Validated Integer idMachine) {
        machineService.deleteMachine(idMachine);
    }

}
