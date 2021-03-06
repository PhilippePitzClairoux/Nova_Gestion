package ca.nova.gestion.mappers;

import ca.nova.gestion.model.Client;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Mapper
@Repository
public interface ClientMapper {

    Client getClient(int idClient);
    ArrayList<Client> getAllClient();
    ArrayList<Client> getClientsActiveInactive();
    void insertClient(Client client);
    void updateClient(Client client);
    void deleteClient(int idClient);
}
