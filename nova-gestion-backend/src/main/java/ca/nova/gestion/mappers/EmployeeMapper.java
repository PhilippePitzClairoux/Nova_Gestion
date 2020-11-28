package ca.nova.gestion.mappers;

import ca.nova.gestion.model.Employee;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface EmployeeMapper {

    Employee getEmployee(int idEmployee);

    void updateEmployee(Employee employee);

    void insertEmployee(Employee employee);
}
