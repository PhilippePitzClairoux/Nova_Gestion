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
import org.springframework.security.access.prepost.PreAuthorize;
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

            workSheet = setClientProgramWorkSheet(workSheet);

            workSheets.add(workSheet);
        }

        return workSheets;
    }

    @Transactional
    @PreAuthorize("hasRole('Admin')")
    public ArrayList<WorkSheet> getWorkSheetsByClientDate(String dateCreation, String dueDate) throws ParseException {
      //  ArrayList<WorkSheet> workSheets = new ArrayList<>();

        Date date_creation=new SimpleDateFormat("yyyy-MM-dd").parse(dateCreation);
        Date due_date=new SimpleDateFormat("yyyy-MM-dd").parse(dueDate);

        //caster les dates
        java.sql.Date dateCreation2 = new java.sql.Date(date_creation.getTime());
        java.sql.Date dueDate2 = new java.sql.Date(due_date.getTime());

        ArrayList<WorkSheet> workSheets = workSheetMapper.getWorkSheetsByClientDate(dateCreation2, dueDate2);
        int count = workSheets.size();
        System.out.println("***count: "+count);
        for (int i = 0; i < count; i++){

            System.out.println("----"+ workSheets.get(i).getIdWorkSheet());
           WorkSheet workSheet = workSheets.get(i);// workSheetMapper.getWorkSheet(workSheets.get(i).getIdWorkSheet());

            workSheet = setClientProgramWorkSheet(workSheet);
            workSheets.add(workSheet);
        }

        return workSheets;
    }

    @Transactional
    public WorkSheet getWorkSheet(Integer idWorkSheet){
        WorkSheet workSheet = workSheetMapper.getWorkSheet(idWorkSheet);
        if (workSheet == null || idWorkSheet == 0)
            throw new RessourceNotFound("workSheet does not exist");
        workSheet = setClientProgramWorkSheet(workSheet);
        return  workSheet;
    }

    private WorkSheet setClientProgramWorkSheet(WorkSheet workSheet){
        WorkSheetClientProgram workSheetClientProgram = workSheetClientProgramMapper.getWorkSheetClientProgram(workSheet.getIdWorkSheet());
        Client client = clientMapper.getClient(workSheetClientProgram.getIdClient());
        Program program = programMapper.getProgram(workSheetClientProgram.getIdProgram());

        workSheet.setClient(client);
        workSheet.setProgram(program);

        return workSheet;
    }

    @Transactional
    @PreAuthorize("hasRole('Admin') or hasRole('Superviseur')")
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
    @PreAuthorize("hasRole('Admin') or hasRole('Superviseur')")
    public void updateWorkSheet(WorkSheet workSheet){

        WorkSheet verifiedWorkSheet = workSheetMapper.getWorkSheet(workSheet.getIdWorkSheet());

        if (verifiedWorkSheet == null || workSheet.getIdWorkSheet() == 0 )
            throw new InvalidRequest("Missing parameters");

        if (workSheet.getOrderNumber() == null || workSheet.getClient() == null || workSheet.getProgram() == null || workSheet.getStatus() == null || workSheet.getDueDate() == null)
            throw new InvalidRequest("Missing information");

        if (workSheet.getOrderNumber() != null || workSheet.getClient() != null || workSheet.getProgram() != null || workSheet.getStatus() != null || workSheet.getDueDate() != null){
            workSheetMapper.updateWorkSheet(workSheet);
            workSheetClientProgramMapper.updateWorkSheetClientProgram(workSheet.getIdWorkSheet(), workSheet.getProgram().getIdProgram(), workSheet.getClient().getIdClient());
        }
    }

    @Transactional
    @PreAuthorize("hasRole('Admin') or hasRole('Superviseur')")
    public void deleteWorkSheet(Integer idWorkSheet) {
        WorkSheet loadWorkSheet = workSheetMapper.getWorkSheet(idWorkSheet);

        if (loadWorkSheet == null)
            throw new RessourceNotFound("Invalid idWorkSheet");

        workSheetClientProgramMapper.deleteWorkSheetClientProgram(idWorkSheet);
        workSheetMapper.deleteWorkSheet(idWorkSheet);
    }

}
