USE ticket_booking_system
CREATE TABLE Customer (
  customer_id INTEGER IDENTITY(1,1) PRIMARY KEY,
  first_name VARCHAR(20) NOT NULL,
  middle_name VARCHAR(20),
  last_name VARCHAR(20) NOT NULL,
  phone_number VARCHAR(15),
  email_id VARCHAR(255) NOT NULL UNIQUE,
  date_of_birth DATE
  );
CREATE TABLE Movie (
  movie_id INTEGER IDENTITY(1,1) PRIMARY KEY,
  movie_name VARCHAR(100) NOT NULL,
  movie_genre VARCHAR(50),
  movie_language VARCHAR(50)
);
CREATE TABLE Theatre (
  theatre_id INTEGER IDENTITY(1,1) PRIMARY KEY,
  theatre_name VARCHAR(100) NOT NULL,
  theatre_city VARCHAR(50)
);
CREATE TABLE Screen (
  screen_id INTEGER IDENTITY(1,1) PRIMARY KEY,
  screen_number INTEGER NOT NULL,
  theatre_id INTEGER NOT NULL,
  FOREIGN KEY (theatre_id) REFERENCES Theatre(theatre_id),
  CONSTRAINT UQ_screen UNIQUE(theatre_id,screen_number)
);
CREATE TABLE Show (
  show_id INTEGER IDENTITY(1,1) PRIMARY KEY,
  screen_id INTEGER NOT NULL,
  movie_id INTEGER NOT NULL,
  show_time TIME,
  show_date DATE,
  FOREIGN KEY (screen_id) REFERENCES Screen(screen_id),
  FOREIGN KEY (movie_id) REFERENCES Movie(movie_id),
  CONSTRAINT UQ_show UNIQUE(screen_id,show_date,show_time)
);
CREATE TABLE Seat_Type (
  seat_type_id INTEGER IDENTITY(1,1) PRIMARY KEY,
  seat_type_name VARCHAR(20) UNIQUE,
  seat_type_price DECIMAL(10,2)
);
CREATE TABLE Seat (
  seat_id INTEGER IDENTITY(1,1) PRIMARY KEY,
  seat_type_id INTEGER NOT NULL,
  screen_id INTEGER NOT NULL,
  seat_row_number VARCHAR(10) NOT NULL,
  seat_col_number INTEGER NOT NULL,
  FOREIGN KEY (seat_type_id) REFERENCES Seat_Type(seat_type_id),
  FOREIGN KEY (screen_id) REFERENCES Screen(screen_id),
  
);
CREATE TABLE Ticket (
  ticket_id INTEGER IDENTITY(1,1) PRIMARY KEY,
  show_id INTEGER NOT NULL,
  customer_id INTEGER NOT NULL,
  FOREIGN KEY (show_id) REFERENCES Show(show_id),
  FOREIGN KEY (customer_id) REFERENCES Customer(customer_id)
);
CREATE TABLE Booked_Seat (
  show_id INTEGER NOT NULL,
  ticket_id INTEGER,
  seat_id INTEGER NOT NULL,
  booking_status VARCHAR(20) NOT NULL DEFAULT 'AVAILABLE',
  PRIMARY KEY (show_id,seat_id),
  FOREIGN KEY (ticket_id) REFERENCES Ticket(ticket_id),
  FOREIGN KEY (seat_id) REFERENCES Seat(seat_id),
  FOREIGN KEY (show_id) REFERENCES Show(show_id),
  CONSTRAINT CHK_booking_status CHECK (booking_status IN ('AVAILABLE','BOOKED','BLOCKED')),
);

CREATE TABLE Payment (
  payment_id INTEGER IDENTITY(1,1) PRIMARY KEY,
  ticket_id INTEGER,
  customer_id INTEGER NOT NULL,
  payment_amount DECIMAL(10,2),
  payment_method VARCHAR(100),
  payment_status VARCHAR(50) NOT NULL DEFAULT 'PENDING',
  FOREIGN KEY (ticket_id) REFERENCES Ticket(ticket_id),
  FOREIGN KEY (customer_id) REFERENCES Customer(customer_id),
  CONSTRAINT CHK_payment CHECK (payment_status IN ('PENDING','SUCCESS','IN PROGRESS','FAILED','REFUNDED')),
);
CREATE TABLE Complaint (
  complaint_id INTEGER IDENTITY(1,1),
  customer_id INTEGER NOT NULL,
  complaint TEXT,
  PRIMARY KEY(complaint_id,customer_id),
  FOREIGN KEY(customer_id) REFERENCES Customer(customer_id)
);

