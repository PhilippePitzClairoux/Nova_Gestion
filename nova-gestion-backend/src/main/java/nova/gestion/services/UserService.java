package nova.gestion.services;

import nova.gestion.errors.exceptions.InvalidRequest;
import nova.gestion.errors.exceptions.RessourceNotFound;
import nova.gestion.mappers.EmployeeMapper;
import nova.gestion.mappers.TypeUserMapper;
import nova.gestion.mappers.UserMapper;
import nova.gestion.model.Employee;
import nova.gestion.model.TypeUser;
import nova.gestion.model.User;
import nova.gestion.model.post.UserPost;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

@Service
public class UserService {

    private final UserMapper userMapper;
    private final TypeUserMapper typeUserMapper;
    private final EmployeeMapper employeeMapper;

    @Autowired
    public UserService(UserMapper userMapper, TypeUserMapper typeUserMapper, EmployeeMapper employeeMapper) {
        this.userMapper = userMapper;
        this.typeUserMapper = typeUserMapper;
        this.employeeMapper = employeeMapper;
    }

    @Transactional
    public ArrayList<User> getListOfAllUsers() {
        ArrayList<User> users = userMapper.getAllUsers();

        if (users == null)
            throw new RessourceNotFound("No users available");

        return users;
    }

    @Transactional
    public User getUser(Integer idUser) {

        User user = userMapper.getUser(idUser);

        if (user == null || idUser == 0)
            throw new RessourceNotFound("User does not exist");

        return user;
    }

    @Transactional
    public Integer createUser(Integer idUserType,
                           Integer idEmployee,
                           String email,
                           String password ) {

        if (idUserType == null || idEmployee == null || email == null || password == null)
            throw new InvalidRequest("Missing parameters");

        if (email.isEmpty() || password.isEmpty() || idUserType == 0 || idEmployee == 0)
            throw new InvalidRequest("Invalid parameters");

        TypeUser typeUser = typeUserMapper.getTypeUser(idUserType);
        Employee employee = employeeMapper.getEmployee(idEmployee);

        if (typeUser == null)
            throw new InvalidRequest("Invalid TypeUser");

        if (employee == null)
            throw new InvalidRequest("Invalid employee");

        User toInsert = new User(0, email, password, typeUser, employee);
        userMapper.insertUser(toInsert);

        return toInsert.getIdUser();
    }

    @Transactional
    public void updateUser(User user) {
        User verifiedUser = userMapper.getUser(user.getIdUser());

        if (user.getIdUser() == 0 || verifiedUser == null)
            throw new InvalidRequest("Missing parameters");

        if (user.getPassword() == null && user.getEmail() == null && user.getTypeUser() == null && user.getEmployee() == null)
            throw new InvalidRequest("Missing information");

        if (user.getEmail() != null || user.getPassword() != null || user.getTypeUser() != null)
            userMapper.updateUser(user);

        if (user.getEmployee() != null) {
            if (user.getEmployee().getName() != null)
                verifiedUser.getEmployee().setName(user.getEmployee().getName());

            if (user.getEmployee().getSurname() != null)
                verifiedUser.getEmployee().setSurname((user.getEmployee().getName()));

            employeeMapper.updateEmployee(verifiedUser.getEmployee());
        }
    }

    @Transactional
    public void deleteUser(UserPost user) {

        User loadUser = userMapper.getUser(user.getIdUser());

        if (loadUser == null)
            throw new RessourceNotFound("Invalid idUser");

        userMapper.deleteUser(loadUser);
    }

}
