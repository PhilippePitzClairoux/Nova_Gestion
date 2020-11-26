package ca.nova.gestion.mappers;

import ca.nova.gestion.model.OrderHistory;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Map;


@Mapper
@Repository
public interface OrderHistoryMapper {
    OrderHistory selectOrderHistory(Integer idOrderHistory);

    ArrayList<OrderHistory> selectFromTimestampOrderHistory(Timestamp startDate);

    ArrayList<OrderHistory> selectFromTimestampOrderHistoryForProduct(OrderHistory product);

    ArrayList<OrderHistory> selectFromTimestampToTimestampOrderHistory(Map<String, Object> map);

    void insertOrderHistory(OrderHistory order);
}
