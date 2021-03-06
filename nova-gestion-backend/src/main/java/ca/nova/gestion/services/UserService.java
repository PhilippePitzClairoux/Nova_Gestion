package ca.nova.gestion.services;

import ca.nova.gestion.errors.exceptions.InvalidRequest;
import ca.nova.gestion.errors.exceptions.RessourceNotFound;
import ca.nova.gestion.mappers.EmployeeMapper;
import ca.nova.gestion.mappers.TypeUserMapper;
import ca.nova.gestion.model.Employee;
import ca.nova.gestion.model.User;
import ca.nova.gestion.mappers.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCrypt;
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
    @PreAuthorize("hasRole('Admin')")
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
    @PreAuthorize("hasRole('Admin')")
    public Integer createUser(User user) {

        if (user == null)
            throw new InvalidRequest("Missing parameters");

        if (user.getEmployee() == null)
            throw new InvalidRequest("Missing Employee");

        if (user.getTypeUser() == null)
            throw new InvalidRequest("Missing TypeUser");

        if (user.getPassword() == null || user.getEmail() == null)
            throw new InvalidRequest("Missing User parameters");

        if (user.getEmployee().getSurname() == null || user.getEmployee().getName() == null)
            throw new InvalidRequest("Missing Employee parameters");

        if (user.getTypeUser().getIdTypeUser() == 0)
            throw new InvalidRequest("Missing idTypeUser");

        //hash new password
        user.setPassword(BCrypt.hashpw(user.getPassword(), BCrypt.gensalt()));

        employeeMapper.insertEmployee(user.getEmployee());
        userMapper.insertUser(user);

        return user.getIdUser();
    }

    @Transactional
    @PreAuthorize("hasRole('Admin')")
    public void updateUser(User user) {
        User verifiedUser = userMapper.getUser(user.getIdUser());

        if (user.getIdUser() == 0 || verifiedUser == null)
            throw new InvalidRequest("Missing parameters");

        if (user.getPassword() == null && user.getEmail() == null && user.getTypeUser() == null && user.getEmployee() == null)
            throw new InvalidRequest("Missing information");

        //hash new password
        if (user.getPassword() != null)
            user.setPassword(BCrypt.hashpw(user.getPassword(), BCrypt.gensalt()));

        if (user.getEmail() != null || user.getPassword() != null || user.getTypeUser() != null)
            userMapper.updateUser(user);

        if (user.getEmployee() != null) {
            if (user.getEmployee().getName() != null)
                verifiedUser.getEmployee().setName(user.getEmployee().getName());

            if (user.getEmployee().getSurname() != null)
                verifiedUser.getEmployee().setSurname((user.getEmployee().getSurname()));

            employeeMapper.updateEmployee(verifiedUser.getEmployee());
        }
    }

    @Transactional
    @PreAuthorize("hasRole('Admin')")
    public void deleteUser(Integer idUser) {

        User loadUser = userMapper.getUser(idUser);

        if (loadUser == null)
            throw new RessourceNotFound("Invalid idUser");

        userMapper.deleteUser(idUser);
    }

    @Transactional
    public User getUserByEmail(String email) {
        return userMapper.getUserByEmail(email);
    }

    @Transactional
    public Employee getEmployeeInformation(String email) {
        return getUserByEmail(email).getEmployee();
    }

}
