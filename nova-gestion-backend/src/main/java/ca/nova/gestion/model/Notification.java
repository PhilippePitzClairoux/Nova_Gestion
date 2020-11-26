package ca.nova.gestion.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
public class Notification {
    private Integer idNotification;
    private Boolean viewed;
    private Blank blank;

    public Notification(Integer idNotification, Boolean viewed) {
        this.idNotification = idNotification;
        this.viewed = viewed;
    }

    @JsonCreator
    public Notification(Integer idNotification, Boolean viewed, Blank blank) {
        this.idNotification = idNotification;
        this.viewed = viewed;
        this.blank = blank;
    }
}
