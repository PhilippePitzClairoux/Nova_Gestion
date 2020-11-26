package ca.nova.gestion.mappers;

import ca.nova.gestion.model.Model;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;


@Mapper
@Repository
public interface ModelMapper {
    Model getModel(int idModel);

    ArrayList<Model> getAllModels();

    void insertModel(Model model);

    void updateModel(Model model);



}
