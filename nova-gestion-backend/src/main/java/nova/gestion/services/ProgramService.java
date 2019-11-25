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
import org.springframework.security.access.prepost.PreAuthorize;
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
    @PreAuthorize("hasRole('Admin') or hasRole('Superviseur') or hasRole('Outileur')")
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
    @PreAuthorize("hasRole('Admin') or hasRole('Superviseur') or hasRole('Outileur')")
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
    @PreAuthorize("hasRole('Admin') or hasRole('Superviseur')")
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
    @PreAuthorize("hasRole('Admin') or hasRole('Superviseur')")
    public Integer createProgramClient(WorkSheetClientProgram workSheetClientProgram ){

        if (workSheetClientProgram.getIdProgram() == 0 || workSheetClientProgram.getIdClient() == 0)
            throw new InvalidRequest("Missing parameters");

        workSheetClientProgramMapper.insertProgramClient(workSheetClientProgram.getIdProgram(),workSheetClientProgram.getIdClient());
        return workSheetClientProgram.getIdTaWorkSheetClientProgram();
    }

    @Transactional
    @PreAuthorize("hasRole('Admin') or hasRole('Superviseur')")
    public void updateProgram(Program program) {

        Program verifiedProgram = programMapper.getProgram(program.getIdProgram());

        if (program.getIdProgram() == 0 || verifiedProgram == null)
            throw new InvalidRequest("Missing parameters");

        if (program.getName() == null || program.getFile() == null || program.getMachine() == null)
            throw new InvalidRequest("Missing information");

        if (program.getName() != null || program.getFile() != null || program.getMachine() != null || program.getTool() != null || program.getBlank() != null)
            programMapper.updateProgram(program);

    }

    @Transactional
    @PreAuthorize("hasRole('Admin') or hasRole('Superviseur')")
    public void deleteProgram(Integer idProgram) {

        Program loadProgram = programMapper.getProgram(idProgram);

        if (loadProgram == null)
            throw new RessourceNotFound("Invalid idProgram");

        programMapper.deleteProgram(idProgram);
    }

    @Transactional
    @PreAuthorize("hasRole('Admin') or hasRole('Superviseur')")
    public void deleteProgramClient(Integer idProgram, Integer idClient) {

        if (idProgram == null || idClient == null)
            throw new RessourceNotFound("Invalid idProgram or idClient");

        workSheetClientProgramMapper.deleteProgramClient(idProgram,idClient);
    }
}
