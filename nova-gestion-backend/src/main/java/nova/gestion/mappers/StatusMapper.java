package nova.gestion.mappers;


import nova.gestion.model.Status;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Mapper
@Repository
public interface StatusMapper {

    Status getStatus(int idStatus);

    ArrayList<Status> getAllStatus();
}
