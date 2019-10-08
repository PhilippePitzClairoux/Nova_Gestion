package nova.gestion.mappers;

import nova.gestion.model.TypeCoolantHole;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface TypeCoolantHoleMapper {

    TypeCoolantHole getTypeCoolantHole(int idTypeCoolantHole);
}
