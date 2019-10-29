package nova.gestion.services;

import nova.gestion.errors.exceptions.InvalidRequest;
import nova.gestion.errors.exceptions.RessourceNotFound;
import nova.gestion.mappers.ProgramMapper;
import nova.gestion.model.Program;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

@Service
public class ProgramService {

    private final ProgramMapper programMapper;

    @Autowired
    public ProgramService(ProgramMapper programMapper) {
        this.programMapper = programMapper;
    }

    @Transactional
    public ArrayList<Program> getAllPrograms() {
        ArrayList<Program> programs = programMapper.getAllPrograms();

        if (programs == null)
            throw new RessourceNotFound("No programs available");

        return programs;
    }

    @Transactional
    public Program getProgram(Integer idProgram) {

        Program program = programMapper.getProgram(idProgram);

        if (program == null || idProgram == 0)
            throw new RessourceNotFound("program does not exist");

        return program;
    }

    @Transactional
    public Integer createProgram(Program program) {

        if (program == null)
            throw new InvalidRequest("Missing parameters");

        if (program.getMachine() == null)
            throw new InvalidRequest("Missing machine");

        if (program.getName() == null || program.getFile() == null)
            throw new InvalidRequest("Missing program parameters");

        programMapper.insertProgram(program);

        return program.getIdProgram();
    }

}
