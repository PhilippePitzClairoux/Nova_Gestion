package nova.gestion.services;

import nova.gestion.errors.exceptions.InvalidRequest;
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

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;

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

    @Transactional
    public Integer createWorkSheet(WorkSheet workSheet) {

        if (workSheet == null)
            throw new InvalidRequest("Missing parameters");

        if (workSheet.getProgram() == null)
            throw new InvalidRequest("Missing program");
        if (workSheet.getClient() == null)
            throw new InvalidRequest("Missing client");
        if (workSheet.getStatus() == null)
            throw new InvalidRequest("Missing status");

        if (workSheet.getDueDate() == null || workSheet.getOrderNumber() == null)
            throw new InvalidRequest("Missing program parameters");

        Date date = Calendar.getInstance().getTime();
        DateFormat dateFormat = new SimpleDateFormat("yyyy-mm-dd");
        String strDate = dateFormat.format(date);
        SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy-mm-dd");
        try {
            Date today = sdf1.parse(strDate);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        java.sql.Date sqlStartDate = new java.sql.Date(date.getTime());
        workSheet.setDateCreation(sqlStartDate);

        workSheetMapper.insertWorkSheet(workSheet);
        workSheetClientProgramMapper.insertWorkSheetClientProgram(workSheet.getIdWorkSheet(),workSheet.getProgram().getIdProgram(),workSheet.getClient().getIdClient());

        return workSheet.getIdWorkSheet();
    }

    @Transactional
    public void updateWorkSheet(WorkSheet workSheet){

        WorkSheet verifiedWorkSheet = workSheetMapper.getWorkSheet(workSheet.getIdWorkSheet());

        if (verifiedWorkSheet == null || workSheet.getIdWorkSheet() == 0 )
            throw new InvalidRequest("Missing parameters");

        if (workSheet.getOrderNumber() == null || workSheet.getClient() == null || workSheet.getProgram() == null || workSheet.getStatus() == null || workSheet.getDueDate() == null)
            throw new InvalidRequest("Missing information");

        if (workSheet.getOrderNumber() != null || workSheet.getClient() != null || workSheet.getProgram() != null || workSheet.getStatus() != null || workSheet.getDueDate() != null){
            workSheetMapper.updateWorkSheet(workSheet);
        }
    }

}
