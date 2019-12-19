package nova.gestion.services;

import nova.gestion.errors.exceptions.InvalidRequest;
import nova.gestion.mappers.OrderHistoryMapper;
import nova.gestion.model.OrderHistory;
import nova.gestion.model.OrderHistoryData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.*;

@Service
public class OrderHistoryService {

    private final OrderHistoryMapper orderHistoryMapper;
    private final BlankService blankService;

    @Autowired
    public OrderHistoryService(OrderHistoryMapper orderHistoryMapper, BlankService blankService) {
        this.orderHistoryMapper = orderHistoryMapper;
        this.blankService = blankService;
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
        if (product.getIdBlank() == null || product.getTimestamp() == null)
            throw new InvalidRequest("Missing idBlank or Value");

        return orderHistoryMapper.selectFromTimestampOrderHistoryForProduct(product);
    }

    @Transactional
    @PreAuthorize("hasRole('Admin')")
    public Collection<OrderHistoryData> selectFromTimestampToTimestampOrderHistoryForProduct(Timestamp startTimestamp, Timestamp endTimestamp) {
        if (startTimestamp == null || endTimestamp == null)
            throw new InvalidRequest("Missing timestamp");

        ArrayList<OrderHistory> data = orderHistoryMapper.selectFromTimestampToTimestampOrderHistory(startTimestamp, endTimestamp);
        Map<Integer, OrderHistoryData> orderedData = new HashMap<Integer, OrderHistoryData>();

        for (OrderHistory orderHistory : data) {

            if (orderedData.containsKey(orderHistory.getIdBlank())) {
                OrderHistoryData orderHistoryData = orderedData.get(orderHistory.getIdBlank());
                Integer receivedQuantity = (orderHistory.getValue() > 0 ? orderHistory.getValue() : 0);
                Integer usedQuantity = (orderHistory.getValue() > 0 ? 0 : -orderHistory.getValue());

                orderedData.replace(orderHistory.getIdBlank(), new OrderHistoryData(orderHistory.getIdBlank(),
                        orderHistoryData.getBlank(),
                        receivedQuantity + orderHistoryData.getReceivedQuantity(),
                        usedQuantity + orderHistoryData.getUsedQuantity()));
            } else {
                Integer receivedQuantity = (orderHistory.getValue() > 0 ? orderHistory.getValue() : 0);
                Integer usedQuantity = (orderHistory.getValue() > 0 ? 0 : -orderHistory.getValue());

                orderedData.put(orderHistory.getIdBlank(), new OrderHistoryData(orderHistory.getIdBlank(),
                        blankService.getBlank(orderHistory.getIdBlank()),
                        receivedQuantity,
                        usedQuantity));
            }
        }

        return  orderedData.values();
    }

}
