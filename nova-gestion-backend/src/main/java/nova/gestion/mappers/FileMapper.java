package nova.gestion.mappers;

import nova.gestion.model.File;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface FileMapper {

    File selectFile(String fileName);

    void insertFile(File file);
}
