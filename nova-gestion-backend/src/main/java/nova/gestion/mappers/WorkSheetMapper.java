package nova.gestion.mappers;

import nova.gestion.model.WorkSheet;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Mapper
@Repository
public interface WorkSheetMapper {

    WorkSheet getWorkSheet(int idWorkSheet);

    ArrayList<WorkSheet> getAllWorkSheets();
}
