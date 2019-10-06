package nova.gestion.model;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.sql.Date;

@Data
@AllArgsConstructor
public class WorkSheet {
    private int idWorkSheet;
    private int idStatus;
    private int quantity;
    private Date dateCreation;
    private Date dueDate;
    private String orderNumber;
}
