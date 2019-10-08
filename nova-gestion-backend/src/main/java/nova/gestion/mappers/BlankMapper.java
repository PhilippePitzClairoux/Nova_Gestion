package nova.gestion.mappers;


import nova.gestion.model.Blank;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Mapper
@Repository
public interface BlankMapper {

    Blank getBlank(int idBlank);

    ArrayList<Blank> getAllBlanks();

    void insertBlank(Blank blank);

    void updateBlank(Blank blank);

}
