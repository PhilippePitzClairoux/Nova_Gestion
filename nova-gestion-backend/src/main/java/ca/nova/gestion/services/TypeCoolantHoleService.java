package ca.nova.gestion.services;

import ca.nova.gestion.errors.exceptions.RessourceNotFound;
import ca.nova.gestion.mappers.TypeCoolantHoleMapper;
import ca.nova.gestion.model.TypeCoolantHole;
import lombok.AllArgsConstructor;
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
