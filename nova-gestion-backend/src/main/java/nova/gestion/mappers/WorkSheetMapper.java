package nova.gestion.mappers;

import nova.gestion.model.WorkSheet;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.ArrayList;

@Mapper
@Repository
public interface WorkSheetMapper {

    WorkSheet getWorkSheet(int idWorkSheet);

    ArrayList<WorkSheet> getAllWorkSheets();

    void insertWorkSheet(WorkSheet workSheet);

    void updateWorkSheet(WorkSheet workSheet);

    void deleteWorkSheet(int idWorkSheet);

    ArrayList<WorkSheet> getWorkSheetsByClientDate(Date dateCreation,Date dueDate);

}
