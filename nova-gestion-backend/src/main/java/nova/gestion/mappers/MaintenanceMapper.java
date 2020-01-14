package nova.gestion.mappers;

import com.sun.tools.javac.Main;
import nova.gestion.model.Machine;
import nova.gestion.model.Maintenance;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;


@Mapper
@Repository
public interface MaintenanceMapper {
    Maintenance getMaintenance(int idMaintenance);

    ArrayList<Maintenance> getMaintenancesByMachine(Machine machine);

    void insertMaintenance(Maintenance maintenance);

    void updateMaintenance(Maintenance maintenance);

    void deleteMaintenance(int idMaintenance);
}
