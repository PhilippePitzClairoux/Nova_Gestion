package nova.gestion.mappers;

import nova.gestion.model.Machine;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;


@Mapper
@Repository
public interface MachineMapper {

    Machine getMachine(int idMachine);

    ArrayList<Machine> getAllMachines();

    void insertMachine(Machine machine);

    void updateMachine(Machine machine);

    void deleteMachine(int idMachine);
}
