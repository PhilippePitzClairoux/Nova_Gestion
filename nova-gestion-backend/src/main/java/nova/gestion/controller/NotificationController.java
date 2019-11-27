package nova.gestion.controller;

import nova.gestion.model.Notification;
import nova.gestion.services.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE)
public class NotificationController {

    private final NotificationService notificationService;

    @Autowired
    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping("/v1/notifications")
    ArrayList<Notification> getNotifications() {
        return notificationService.getNotifications();
    }

    @PutMapping("/v1/notification")
    void updateNotification(@RequestBody Notification notification) {
        notificationService.updateNotification(notification.getIdNotification());
    }

}
