package ca.nova.gestion.mappers;

import ca.nova.gestion.model.TypeCoolantHole;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Mapper
@Repository
public interface TypeCoolantHoleMapper {

    TypeCoolantHole getTypeCoolantHole(int idTypeCoolantHole);
    ArrayList<TypeCoolantHole> getAllCoolantHoleTypes();
}
