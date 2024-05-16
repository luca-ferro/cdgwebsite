package org.example.rifacdg.service;

import org.example.rifacdg.model.Buyer;
import org.example.rifacdg.repository.BuyerRepository;
import org.springframework.stereotype.Service;

@Service
public class BuyerService {
    private final BuyerRepository buyerRepository;

    public BuyerService(BuyerRepository buyerRepository) {
        this.buyerRepository = buyerRepository;
    }

    public Buyer save(Buyer buyer){
        return buyerRepository.save(buyer);
    }
}
