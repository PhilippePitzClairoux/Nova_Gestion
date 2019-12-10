package nova.gestion.services;

import nova.gestion.errors.exceptions.InvalidRequest;
import nova.gestion.mappers.OrderHistoryMapper;
import nova.gestion.model.OrderHistory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.ArrayList;

@Service
public class OrderHistoryService {

    private final OrderHistoryMapper orderHistoryMapper;

    @Autowired
    public OrderHistoryService(OrderHistoryMapper orderHistoryMapper) {
        this.orderHistoryMapper = orderHistoryMapper;
    }

    @Transactional
    @PreAuthorize("hasRole('Admin')")
    void updateHistory(OrderHistory orderHistory) {
        orderHistoryMapper.insertOrderHistory(orderHistory);
    }

    @Transactional
    @PreAuthorize("hasRole('Admin')")
    public ArrayList<OrderHistory> selectFromTimestampOrderHistory(Timestamp startDate) {
        if (startDate == null)
            throw new InvalidRequest("No Date provided");

        return orderHistoryMapper.selectFromTimestampOrderHistory(startDate);
    }

    @Transactional
    @PreAuthorize("hasRole('Admin')")
    public ArrayList<OrderHistory> selectFromTimestampOrderHistoryForProduct(OrderHistory product) {
        if (product.getIdBlank() == null || product.getValue() == null)
            throw new InvalidRequest("Missing idBlank or Value");

        return orderHistoryMapper.selectFromTimestampOrderHistoryForProduct(product);
    }
}
