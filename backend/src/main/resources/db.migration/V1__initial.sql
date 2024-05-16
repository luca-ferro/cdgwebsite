-- Table for Buyer
CREATE TABLE buyer (
                       id INT AUTO_INCREMENT PRIMARY KEY,
                       name VARCHAR(255),
                       phone VARCHAR(255),
                       mail VARCHAR(255),
                       seller VARCHAR(255)
);

-- Table for Raffle
CREATE TABLE raffle (
                        id INT AUTO_INCREMENT PRIMARY KEY,
                        buyer_id INT,
                        CONSTRAINT fk_buyer FOREIGN KEY (buyer_id) REFERENCES buyer(id)
);
