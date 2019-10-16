package nova.gestion.services;

import lombok.AllArgsConstructor;
import nova.gestion.errors.exceptions.RessourceNotFound;
import nova.gestion.mappers.TypeCoolantHoleMapper;
import nova.gestion.model.TypeCoolantHole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

@Service
public class TypeCoolantHoleService {
    private final TypeCoolantHoleMapper typeCoolantHoleMapper;

    @Autowired
    public TypeCoolantHoleService(TypeCoolantHoleMapper typeCoolantHoleMapper) {
        this.typeCoolantHoleMapper = typeCoolantHoleMapper;
    }

    @Transactional
    public ArrayList<TypeCoolantHole> getAllCoolantHoleTypes() {
        ArrayList<TypeCoolantHole> coolantHoleTypes = typeCoolantHoleMapper.getAllCoolantHoleTypes();

        if (coolantHoleTypes == null)
            throw new RessourceNotFound("No coolantHoleTypes available");

        return coolantHoleTypes;
    }
}
