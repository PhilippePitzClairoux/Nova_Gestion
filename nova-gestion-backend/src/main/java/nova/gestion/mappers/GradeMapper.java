package nova.gestion.mappers;


import nova.gestion.model.Grade;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Mapper
@Repository
public interface GradeMapper {

    Grade getGrade(int code);
    ArrayList<Grade> getAllGrads();

}
