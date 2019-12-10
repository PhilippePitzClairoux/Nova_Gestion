package nova.gestion.mappers;

import nova.gestion.model.OrderHistory;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.ArrayList;

@Mapper
@Repository
public interface OrderHistoryMapper {
    OrderHistory selectOrderHistory(Integer idOrderHistory);

    ArrayList<OrderHistory> selectFromTimestampOrderHistory(Timestamp startDate);

    ArrayList<OrderHistory> selectFromTimestampOrderHistoryForProduct(OrderHistory product);

    void insertOrderHistory(OrderHistory order);
}
