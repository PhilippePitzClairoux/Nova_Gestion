package nova.gestion.mappers;

import nova.gestion.model.Notification;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Mapper
@Repository
public interface NotificationMapper {

    ArrayList<Notification> getNotViewedNotifications();

    void updateToViewed(Integer idNotification);
}
