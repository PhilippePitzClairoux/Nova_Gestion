package nova.gestion.mappers;

import nova.gestion.model.Client;

@Mapper
@Repository
public interface ClientMapper {

    Tool getClient(Long idClient);
    List<Client> getAllClient();
    void insertClient(Client client);
    void updateClient(Client client);
}
