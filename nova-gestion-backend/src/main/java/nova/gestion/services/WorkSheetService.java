package nova.gestion.services;

import nova.gestion.errors.exceptions.RessourceNotFound;
import nova.gestion.mappers.ClientMapper;
import nova.gestion.mappers.ProgramMapper;
import nova.gestion.mappers.WorkSheetClientProgramMapper;
import nova.gestion.mappers.WorkSheetMapper;
import nova.gestion.model.Client;
import nova.gestion.model.Program;
import nova.gestion.model.WorkSheet;
import nova.gestion.model.WorkSheetClientProgram;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

@Service
public class WorkSheetService {

    private final WorkSheetMapper workSheetMapper;
    private final WorkSheetClientProgramMapper workSheetClientProgramMapper;
    private final ProgramMapper programMapper;
    private final ClientMapper clientMapper;

    @Autowired
    public WorkSheetService(WorkSheetMapper workSheetMapper, WorkSheetClientProgramMapper workSheetClientProgramMapper, ProgramMapper programMapper, ClientMapper clientMapper) {
        this.workSheetMapper = workSheetMapper;
        this.workSheetClientProgramMapper = workSheetClientProgramMapper;
        this.programMapper = programMapper;
        this.clientMapper = clientMapper;
    }

    @Transactional
    public ArrayList<WorkSheet> getAllWorkSheets() {
        ArrayList<WorkSheet> workSheets = new ArrayList<>();
        ArrayList<WorkSheetClientProgram> workSheetClientPrograms = workSheetClientProgramMapper.getAllWorkSheetClientPrograms();

        System.out.println("*******workSheetClientPrograms : "+workSheetClientPrograms);

        for (int i = 0; i < workSheetClientPrograms.size(); i++){
            WorkSheet workSheet = workSheetMapper.getWorkSheet(workSheetClientPrograms.get(i).getIdWorkSheet());

            workSheet = setClientProgramWorkSheet(workSheet, workSheetClientPrograms.get(i).getIdProgram(), workSheetClientPrograms.get(i).getIdClient());

            workSheets.add(workSheet);
        }

        return workSheets;
    }

    @Transactional
    public WorkSheet getWorkSheet(Integer idWorkSheet, Integer idProgram, Integer idClient){
        WorkSheet workSheet = workSheetMapper.getWorkSheet(idWorkSheet);
        if (workSheet == null || idWorkSheet == 0)
            throw new RessourceNotFound("workSheet does not exist");
        workSheet = setClientProgramWorkSheet(workSheet, idProgram, idClient);
        return  workSheet;
    }


    private WorkSheet setClientProgramWorkSheet(WorkSheet workSheet, Integer idProgram, Integer idClient){
        WorkSheetClientProgram workSheetClientProgram = workSheetClientProgramMapper.getWorkSheetClientProgram(workSheet.getIdWorkSheet(), idProgram, idClient);
        Client client = clientMapper.getClient(workSheetClientProgram.getIdClient());
        Program program = programMapper.getProgram(workSheetClientProgram.getIdProgram());

        workSheet.setClient(client);
        workSheet.setProgram(program);

        return workSheet;
    }
}
