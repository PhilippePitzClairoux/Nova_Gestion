package nova.gestion.services;

import nova.gestion.errors.exceptions.RessourceNotFound;
import nova.gestion.mappers.TypeUserMapper;
import nova.gestion.model.TypeUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

@Service
public class TypeUserService {

    private final TypeUserMapper typeUserMapper;

    @Autowired
    public TypeUserService(TypeUserMapper typeUserMapper) {
        this.typeUserMapper = typeUserMapper;
    }

    @Transactional
    public ArrayList<TypeUser> getAllUserTypes() {
        ArrayList<TypeUser> userTypes =  typeUserMapper.getAllUserTypes();

        if (userTypes == null)
            throw new RessourceNotFound("No typeUsers available");

        return userTypes;
    }

}
