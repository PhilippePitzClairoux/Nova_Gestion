package nova.gestion.mappers;

import nova.gestion.model.Notification;

import java.util.ArrayList;

public interface NotificationMapper {

    ArrayList<Notification> getNotViewedNotifications();

    void updateToViewed(Integer idNotification);
}
