package nova.gestion.services;

import nova.gestion.errors.exceptions.InvalidRequest;
import nova.gestion.errors.exceptions.RessourceNotFound;
import nova.gestion.mappers.ClientMapper;
import nova.gestion.model.Client;
import nova.gestion.model.post.ClientPost;
import org.springframework.beans.factory.annotation.Autowired;
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
    public Client getClient(int idClient) {

        Client client = clientMapper.getClient(idClient);

        if (client == null || idClient == 0)
            throw new RessourceNotFound("Client does not exist");

        return client;
    }

    @Transactional
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
    public void deleteClient(ClientPost client) {

        Client loadClient = clientMapper.getClient(client.getIdClient());

        if (loadClient == null)
            throw new RessourceNotFound("Invalid idClient");

        clientMapper.deleteClient(loadClient);
    }
}
