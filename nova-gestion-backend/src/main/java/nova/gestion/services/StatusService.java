package nova.gestion.services;

import nova.gestion.errors.exceptions.RessourceNotFound;
import nova.gestion.mappers.StatusMapper;
import nova.gestion.model.Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

@Service
public class StatusService {

    private final StatusMapper statusMapper;

    @Autowired
    public StatusService(StatusMapper statusMapper) {
        this.statusMapper = statusMapper;
    }

    @Transactional
    public Status getStatus(int idStatus){

        Status status = statusMapper.getStatus(idStatus);

        if (status == null || idStatus == 0)
            throw new RessourceNotFound("Status does not exist");

        return status;
    }

    @Transactional
    public ArrayList<Status> getAllStatus() {
        ArrayList<Status> status =  statusMapper.getAllStatus();

        if (status == null)
            throw new RessourceNotFound("No status available");

        return status;
    }
}
