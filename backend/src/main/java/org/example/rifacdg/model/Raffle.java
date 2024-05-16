package org.example.rifacdg.model;

import jakarta.persistence.*;

@Entity
@Table(name = "Raffle")
public class Raffle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @ManyToOne
    @JoinColumn(name = "buyer_id", referencedColumnName = "id")
    private Buyer buyer;

    public Raffle() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Buyer getBuyer() {
        return buyer;
    }

    public void setBuyer(Buyer buyer) {
        this.buyer = buyer;
    }
}
