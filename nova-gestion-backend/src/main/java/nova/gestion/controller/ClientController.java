package nova.gestion.controller;


import com.fasterxml.jackson.annotation.JsonView;
import com.fasterxml.jackson.core.JsonProcessingException;
import nova.gestion.model.Client;
import nova.gestion.model.post.ClientPost;
import nova.gestion.services.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.Map;

@RestController
@RequestMapping(value = "/v1/client", produces = MediaType.APPLICATION_JSON_VALUE)
public class ClientController {


    private final ClientService clientService;

    @Autowired
    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    @GetMapping
    public ArrayList<Client> getAllClients throws JsonProcessingException {
        return clientService.getListOfAllClients();
    }

    @GetMapping("/{idClient}/")
    public Client getClient(@PathVariable @Validated Integer idClient) {
        return clientService.getClient(idClient);
    }

    @PostMapping
    public Map<String, Integer> createClient(@JsonView(ClientPost.Views.Insert.class)
                                           @RequestBody @Validated ClientPost client) {

        Integer id = clientService.createClient(client.getName(), client.getPhoneNumber());

        return Map.of("id", id);
    }

    @PutMapping
    public void updateClient(@JsonView(ClientPost.Views.Update.class)
                           @RequestBody @Valid ClientPost client) {
        clientService.updateClient(client);
    }

}
