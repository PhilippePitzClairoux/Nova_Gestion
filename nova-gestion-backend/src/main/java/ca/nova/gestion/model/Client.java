package ca.nova.gestion.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
public class Client {
    private int idClient;
    private String name;
    private String phoneNumber;

    @JsonCreator
    public Client(int idClient, String name, String phoneNumber) {
        this.idClient = idClient;
        this.name = name;
        this.phoneNumber = phoneNumber;
    }
}
