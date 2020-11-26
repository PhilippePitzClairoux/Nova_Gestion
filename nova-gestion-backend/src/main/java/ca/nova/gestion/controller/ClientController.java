package ca.nova.gestion.controller;


import ca.nova.gestion.model.Client;
import ca.nova.gestion.services.ClientService;
import com.fasterxml.jackson.annotation.JsonView;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.Map;

@RestController
@RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE)
public class ClientController {

    private final ClientService clientService;

    @Autowired
    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    /**
     * GET /v1/clients -> retourne la liste des clients
     * @return ArrayList {@link Client}
     * @throws JsonProcessingException
     */
    @GetMapping("/v1/clients")
    public ArrayList<Client> getAllClients() throws JsonProcessingException {
        return clientService.getListOfAllClients();
    }

    @GetMapping("/v1/clientsActiveInactive")
    public ArrayList<Client> getClientsActiveInactive() throws JsonProcessingException {
        return clientService.getClientsActiveInactive();
    }
    /**
     * GET /v1/client/{idClient}/ -> retourne un Client ayant le id specifié
     * @param idClient l'id du Client voulu
     * @return {@link Client}
     */
    @GetMapping("/v1/client/{idClient}/")
    public Client getClient(@PathVariable @Validated Integer idClient) {
        return clientService.getClient(idClient);
    }

    /**
     * POST /v1/client
     * Cree un client dans la base de donnee
     * @param client
     * @return idClient ajouté
     */
    @PostMapping("/v1/client")
    public Map<String, Integer> createClient(
                                           @RequestBody @Validated Client client) {

        Integer id = clientService.createClient(client.getName(), client.getPhoneNumber());

        return Map.of("idClient", id);
    }

    /**
     * PUT /v1/client
     * Mis à jour un client dans la BD
     * @param client
     */
    @PutMapping("/v1/client")
    public void updateClient(@RequestBody @Valid Client client) {
        clientService.updateClient(client);
    }

    /**
     * DELETE /v1/client/{idClient}/
     * supprime un client de la BD avec l'id spécifié
     * @param idClient
     */
    @DeleteMapping("/v1/client/{idClient}/")
    public void deleteClient(@PathVariable @Validated Integer idClient) {
        clientService.deleteClient(idClient);
    }

}
