package ca.nova.gestion.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.sql.Date;
import java.util.ArrayList;

@Data
public class WorkSheet {
    private int idWorkSheet;
    private int quantity;
    private Date dateCreation;
    private Date dueDate;
    private String orderNumber;
    private Status status;
    private ArrayList<Task> tasks;
    private Client client;
    private Program program;

    public WorkSheet(int idWorkSheet, int quantity, Date dateCreation, Date dueDate, String orderNumber)
    {
        this.idWorkSheet = idWorkSheet;
        this.quantity = quantity;
        this.dateCreation = dateCreation;
        this.dueDate = dueDate;
        this.orderNumber = orderNumber;
    }

    @JsonCreator
    public WorkSheet(int idWorkSheet, int quantity, Date dateCreation, Date dueDate, String orderNumber, Status status, ArrayList<Task> tasks, Client client,Program program ) {
        this.idWorkSheet = idWorkSheet;
        this.quantity = quantity;
        this.dateCreation = dateCreation;
        this.dueDate = dueDate;
        this.orderNumber = orderNumber;
        this.status = status;
        this.tasks = tasks;
        this.client = client;
        this.program = program;
    }
}
