package nova.gestion.mappers;

import nova.gestion.model.Client;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Mapper
@Repository
public interface ClientMapper {

    Client getClient(int idClient);
    ArrayList<Client> getAllClient();
    void insertClient(Client client);
    void updateClient(Client client);
}
