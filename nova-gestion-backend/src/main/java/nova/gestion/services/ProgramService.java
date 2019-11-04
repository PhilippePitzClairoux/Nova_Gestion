package nova.gestion.services;

import nova.gestion.errors.exceptions.InvalidRequest;
import nova.gestion.errors.exceptions.RessourceNotFound;
import nova.gestion.mappers.ClientMapper;
import nova.gestion.mappers.ProgramMapper;
import nova.gestion.mappers.WorkSheetClientProgramMapper;
import nova.gestion.model.Client;
import nova.gestion.model.Program;
import nova.gestion.model.WorkSheetClientProgram;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

@Service
public class ProgramService {

    private final ProgramMapper programMapper;
    private final WorkSheetClientProgramMapper workSheetClientProgramMapper;
    private final ClientMapper clientMapper;

    @Autowired
    public ProgramService(ProgramMapper programMapper, WorkSheetClientProgramMapper workSheetClientProgramMapper, ClientMapper clientMapper) {
        this.programMapper = programMapper;
        this.workSheetClientProgramMapper = workSheetClientProgramMapper;
        this.clientMapper = clientMapper;
    }

    @Transactional
    public ArrayList<Program> getAllPrograms() {
        ArrayList<Program> programs = programMapper.getAllPrograms();

        if (programs == null)
            throw new RessourceNotFound("No programs available");
        ArrayList<Program> programsReturn = new ArrayList<>();

        for (int i = 0; i < programs.size(); i++){
           programsReturn.add(setClientsInProgram(programs.get(i)));
        }

        return programsReturn;
    }

    @Transactional
    public Program getProgram(Integer idProgram) {

        Program program = programMapper.getProgram(idProgram);

        if (program == null || idProgram == 0)
            throw new RessourceNotFound("program does not exist");

        Program programReturn = setClientsInProgram(program);

        return programReturn;
    }

    private Program setClientsInProgram(Program program){
        ArrayList<WorkSheetClientProgram> workSheetClientPrograms = workSheetClientProgramMapper.getClientsByProgram(program.getIdProgram());
        ArrayList<Client> clients = new ArrayList<>();

        for (int i = 0; i < workSheetClientPrograms.size(); i++ ) {
            Client client = clientMapper.getClient(workSheetClientPrograms.get(i).getIdClient()) ;
            clients.add(client);
        }
        program.setClients(clients);
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

    @Transactional
    public void updateProgram(Program program) {

        Program verifiedProgram = programMapper.getProgram(program.getIdProgram());

        if (program.getIdProgram() == 0 || verifiedProgram == null)
            throw new InvalidRequest("Missing parameters");

        if (program.getName() == null || program.getFile() == null || program.getMachine() == null)
            throw new InvalidRequest("Missing information");

        if (program.getName() != null || program.getFile() != null || program.getMachine() != null || program.getTool() != null || program.getBlank() != null)
            programMapper.updateProgram(program);

        System.out.println(verifiedProgram);

        System.out.println(program);
    }

    @Transactional
    public void deleteProgram(Integer idProgram) {

        Program loadProgram = programMapper.getProgram(idProgram);

        if (loadProgram == null)
            throw new RessourceNotFound("Invalid idProgram");

        programMapper.deleteProgram(idProgram);
    }
}
