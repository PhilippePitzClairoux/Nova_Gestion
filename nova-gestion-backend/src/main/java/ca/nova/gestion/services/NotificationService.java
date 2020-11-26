package ca.nova.gestion.services;

import ca.nova.gestion.errors.exceptions.InvalidRequest;
import ca.nova.gestion.mappers.NotificationMapper;
import ca.nova.gestion.model.Notification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

@Service
public class NotificationService {

    private final NotificationMapper notificationMapper;

    @Autowired
    public NotificationService(NotificationMapper notificationMapper) {
        this.notificationMapper = notificationMapper;
    }

    @Transactional
    public ArrayList<Notification> getNotifications() {
        return notificationMapper.getNotViewedNotifications();
    }

    @Transactional
    public void updateNotification(Integer idNotification) {

        if (idNotification == null)
            throw new InvalidRequest("No id passed");

        notificationMapper.updateToViewed(idNotification);
    }

}
