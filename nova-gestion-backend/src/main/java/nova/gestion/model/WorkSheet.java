package nova.gestion.model;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.sql.Date;
import java.util.ArrayList;

@Data
@AllArgsConstructor
public class WorkSheet {
    private int idWorkSheet;
    private Status status;
    private int quantity;
    private Date dateCreation;
    private Date dueDate;
    private String orderNumber;
    private ArrayList<Task> tasks;

    public WorkSheet(int idWorkSheet, int quantity, Date dateCreation, Date dueDate, String orderNumber)
    {
        this.idWorkSheet = idWorkSheet;
        this.quantity = quantity;
        this.dateCreation = dateCreation;
        this.dueDate = dueDate;
        this.orderNumber = orderNumber;
    }
}
