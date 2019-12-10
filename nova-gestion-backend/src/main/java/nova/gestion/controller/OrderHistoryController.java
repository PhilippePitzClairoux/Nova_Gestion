package nova.gestion.controller;

import nova.gestion.services.OrderHistoryService;
import nova.gestion.model.OrderHistory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.ArrayList;

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
     * @return ArrayList {@link nova.gestion.model.OrderHistory}
     */
    @GetMapping("/v1/orderhistory/{timestamp}")
    public ArrayList<OrderHistory> getAllOrderHistory(@PathVariable Timestamp startDate) {
        return orderHistoryService.selectFromTimestampOrderHistory(startDate);
    }

    /**
     * GET /v1/orderhistory/idBlank/timestamp -> retourne la liste des orderHistory pour le blank specefique
     *
     * @return ArrayList {@link nova.gestion.model.OrderHistory}
     */
    @GetMapping("/v1/orderhistory/{idBlank}/{timestamp}")
    public ArrayList<OrderHistory> getAllOrderHistoryForBlank(@PathVariable Integer idBlank, @PathVariable Timestamp timestamp) {
        return orderHistoryService.selectFromTimestampOrderHistoryForProduct(new OrderHistory(null, idBlank,
                timestamp, null));
    }

}
