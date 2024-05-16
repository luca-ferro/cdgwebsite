package org.example.rifacdg.controller;

import org.example.rifacdg.dto.BuyerDTO;
import org.example.rifacdg.model.Buyer;
import org.example.rifacdg.model.Raffle;
import org.example.rifacdg.service.BuyerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class BuyerController {
    private final BuyerService buyerService;

    @Autowired
    public BuyerController(BuyerService buyerService) {
        this.buyerService = buyerService;
    }

    @PostMapping("/buyers")
    public ResponseEntity<List<Integer>> post(@RequestBody BuyerDTO buyerDTO){
        Buyer buyer = new Buyer(buyerDTO);
        Buyer response = buyerService.save(buyer);
        List<Integer> raffles = response.getRaffles().stream().map(Raffle::getId).toList();
        return ResponseEntity.ok(raffles);
    }
}
