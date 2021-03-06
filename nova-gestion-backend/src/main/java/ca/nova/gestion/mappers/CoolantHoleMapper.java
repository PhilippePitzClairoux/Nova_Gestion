package ca.nova.gestion.mappers;

import ca.nova.gestion.model.CoolantHole;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface CoolantHoleMapper {

    CoolantHole getCoolantHole(int idCoolantHole);

    void updateCoolantHole(CoolantHole coolantHole);

    void insertCoolantHole(CoolantHole coolantHole);
}
