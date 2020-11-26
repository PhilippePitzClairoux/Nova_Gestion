package ca.nova.gestion.mappers;

import ca.nova.gestion.model.Notification;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Mapper
@Repository
public interface NotificationMapper {

    ArrayList<Notification> getNotViewedNotifications();

    void updateToViewed(Integer idNotification);
}
