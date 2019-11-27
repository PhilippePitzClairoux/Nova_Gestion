package nova.gestion.services;

import nova.gestion.errors.exceptions.InvalidRequest;
import nova.gestion.errors.exceptions.RessourceNotFound;
import nova.gestion.mappers.ClientMapper;
import nova.gestion.model.Client;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

@Service
public class ClientService {

    private final ClientMapper clientMapper;

    @Autowired
    public ClientService(ClientMapper clientMapper) {
        this.clientMapper = clientMapper;
    }

    @Transactional
    public ArrayList<Client> getListOfAllClients() {
        ArrayList<Client> clients = clientMapper.getAllClient();

        if (clients == null)
            throw new RessourceNotFound("No clients available");

        return clients;
    }

    @Transactional
    public Client getClient(Integer idClient) {

        Client client = clientMapper.getClient(idClient);

        if (client == null || idClient == 0)
            throw new RessourceNotFound("Client does not exist");

        return client;
    }

    @Transactional
    @PreAuthorize("hasRole('Admin')")
    public Integer createClient(String name, String phoneNumber ) {

        if (name == null || phoneNumber == null)
            throw new InvalidRequest("Missing parameters");

        if (name.isEmpty() || phoneNumber.isEmpty())
            throw new InvalidRequest("Invalid parameters");

        Client toInsert = new Client(0, name, phoneNumber);
        clientMapper.insertClient(toInsert);

        return toInsert.getIdClient();
    }

    @Transactional
    @PreAuthorize("hasRole('Admin')")
    public void updateClient(Client client) {
       Client verifiedClient = clientMapper.getClient(client.getIdClient());

       if(client.getIdClient() == 0 || verifiedClient == null)
           throw new InvalidRequest("Missing parameters");

       if (client.getName() == null && client.getPhoneNumber() == null)
           throw new InvalidRequest("Missing information");

       if (client.getName() != null || client.getPhoneNumber() !=null)
           clientMapper.updateClient(client);
    }


    @Transactional
    @PreAuthorize("hasRole('Admin')")
    public void deleteClient(Integer idClient) {

        Client loadClient = clientMapper.getClient(idClient);

        if (loadClient == null)
            throw new RessourceNotFound("Invalid idClient");

        clientMapper.deleteClient(idClient);
    }
    
}
