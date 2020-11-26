package ca.nova.gestion.controller;

import ca.nova.gestion.model.OrderHistory;
import ca.nova.gestion.model.OrderHistoryData;
import ca.nova.gestion.services.OrderHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Collection;

@RestController
@RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE)
public class OrderHistoryController {

    private final OrderHistoryService orderHistoryService;

    @Autowired
    public OrderHistoryController(OrderHistoryService orderHistoryService) {
        this.orderHistoryService = orderHistoryService;
    }

    /**
     * GET /v1/orderhistory/timestamp -> retourne la liste des orderHistory
     *
     * @return ArrayList {@link OrderHistory}
     */
    @GetMapping("/v1/orderhistory/{timestamp}")
    public ArrayList<OrderHistory> getAllOrderHistory(@PathVariable Timestamp timestamp) {
        return orderHistoryService.selectFromTimestampOrderHistory(timestamp);
    }

    /**
     * GET /v1/orderhistory/idBlank/timestamp -> retourne la liste des orderHistory pour le blank specefique
     *
     * @return ArrayList {@link OrderHistory}
     */
    @GetMapping("/v1/orderhistory/{startTimestamp}/{endTimestamp}/{idBlank}")
    public Collection<OrderHistoryData> getAllOrderHistoryForBlankFromTimestamp(@PathVariable Timestamp startTimestamp,
                                                                                @PathVariable Timestamp endTimestamp,
                                                                                @PathVariable Integer idBlank) {
        return orderHistoryService.selectFromTimestampToTimestampOrderHistoryForProduct(startTimestamp, endTimestamp, idBlank);
    }
}
