package nova.gestion.mappers;

import nova.gestion.model.Employee;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface EmployeeMapper {

    Employee getEmployee(int idEmployee);

}
