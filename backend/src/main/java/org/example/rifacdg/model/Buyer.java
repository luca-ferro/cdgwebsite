package org.example.rifacdg.model;

import jakarta.persistence.*;
import org.example.rifacdg.dto.BuyerDTO;

import java.util.ArrayList;
import java.util.List;


@Entity
@Table(name = "buyer")
public class Buyer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String phone;
    private String mail;
    private String seller;
    @OneToMany(mappedBy = "buyer", cascade = CascadeType.ALL)
    private List<Raffle> raffles;

    public Buyer() {
        raffles = new ArrayList<>();
    }
    public Buyer(BuyerDTO buyerDTO) {
        this();
        this.name = buyerDTO.name();
        this.phone = buyerDTO.phone();
        this.mail = buyerDTO.mail();
        this.seller = buyerDTO.seller();
        for(int i = 0; i < buyerDTO.quantity(); i++){
            Raffle raffle = new Raffle();
            raffle.setBuyer(this);
            raffles.add(raffle);
        }
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getPhone() {
        return phone;
    }

    public String getMail() {
        return mail;
    }

    public String getSeller() {
        return seller;
    }

    public List<Raffle> getRaffles() {
        return raffles;
    }
}
