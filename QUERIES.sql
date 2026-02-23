SELECT * FROM Customer;
SELECT * FROM Movie;
SELECT DISTINCT movie_name FROM Movie;
SELECT DISTINCT show_time FROM show;
SELECT DISTINCT show_date FROM show;


--1)on which date the tickets are booked--
SELECT Booked_Seat.ticket_id,Show.show_date 
FROM Show 
INNER JOIN Booked_Seat ON Show.show_id = Booked_Seat.show_id
WHERE Booked_Seat.booking_status = 'Booked';


--2)to a particular showtime how many tickets booked--
SELECT t.theatre_name,sh.show_date,sh.show_time,sc.screen_number,COUNT(Booked_Seat.ticket_id) AS Total_Tickets_Booked
FROM Booked_Seat 
INNER JOIN Seat s ON Booked_Seat.seat_id = s.seat_id
INNER JOIN Screen sc ON s.screen_id = sc.screen_id
INNER JOIN Show sh ON sh.screen_id = sc.screen_id
INNER JOIN Theatre t ON sc.theatre_id = t.theatre_id
WHERE sh.show_date = '2025-01-03' AND sh.show_time = '09:00:00'
AND Booked_Seat.booking_status = 'Booked'
GROUP BY t.theatre_name,sh.show_date,sh.show_time,sc.screen_number
ORDER BY sc.screen_number;


--3)MOST BOOKED MOVIE THIS MONTH--
SELECT TOP 1 Movie.movie_name,COUNT(bs.ticket_id) AS Total_bookings
FROM Movie 
INNER JOIN Show sh ON Movie.movie_id = sh.movie_id
INNER JOIN Booked_Seat bs ON sh.show_id = bs.show_id
WHERE bs.booking_status = 'Booked'
AND MONTH(sh.show_date) = 01
AND YEAR(sh.show_date) = 2025
GROUP BY Movie.movie_name
ORDER BY Total_bookings DESC;


--4)LIST ALL MOVIES  SHOWING ON 24/3/2025--
SELECT th.theatre_name,sh.show_date,sh.show_time,sc.screen_number,m.movie_name,m.movie_genre,m.movie_language
FROM show sh
INNER JOIN Movie m ON sh.movie_id = m.movie_id
INNER JOIN Screen sc ON sh.screen_id = sc.screen_id
INNER JOIN Theatre th ON sc.theatre_id = th.theatre_id
WHERE sh.show_date = '2025-03-24'
ORDER BY th.theatre_name, sh.show_time;

--5)Revenue generated per theatre--
SELECT th.theatre_name,th.theatre_city,SUM(p.payment_amount) AS Total_Amount
FROM Theatre th 
INNER JOIN Screen sc ON th.theatre_id = sc.theatre_id
INNER JOIN Seat s ON s.screen_id = sc.screen_id
INNER JOIN Booked_Seat bs ON s.seat_id = bs.seat_id AND bs.booking_status = 'BOOKED'
INNER JOIN Ticket t ON bs.ticket_id = t.ticket_id
INNER JOIN Payment p ON t.ticket_id = p.ticket_id
GROUP BY th.theatre_name,th.theatre_city
ORDER BY Total_Amount DESC;


--6) Customer who booked the most tickets --
SELECT c.first_name,c.middle_name,c.last_name,COUNT(p.ticket_id) AS Total_Tickets,SUM(p.payment_amount) AS Total
FROM Customer c
INNER JOIN Payment p ON c.customer_id = p.customer_id
WHERE p.payment_status = 'SUCCESS'
GROUP BY c.customer_id,c.first_name,c.middle_name,c.last_name
ORDER BY Total DESC;


-- 7)Count Total Seats in Each Screen--
SELECT theatre_name,theatre_city,screen_number,row_count * col_count AS Total_Seats
FROM ( SELECT th.theatre_name,th.theatre_city,sc.screen_number,COUNT(DISTINCT s.seat_row_number) AS Row_Count,
COUNT(DISTINCT s.seat_col_number) AS Col_Count
FROM Theatre th
INNER JOIN Screen sc ON th.theatre_id = sc.theatre_id
INNER JOIN Seat s    ON sc.screen_id  = s.screen_id
GROUP BY th.theatre_name, th.theatre_city, sc.screen_number) AS SeatSummaryTheatre
ORDER BY Total_Seats;


--8)See all available shows for INOX Delhi
SELECT t.theatre_name,sc.screen_number,sh.show_id,sh.show_date,sh.show_time
FROM Show sh
JOIN Screen sc ON sh.screen_id = sc.screen_id
JOIN Theatre t ON sc.theatre_id = t.theatre_id
WHERE t.theatre_name = 'INOX Delhi'
ORDER BY sc.screen_number, sh.show_date, sh.show_time;


--9)Get All Bookings Made by a Specific Customer--
SELECT DISTINCT c.first_name,c.last_name,th.theatre_name,m.movie_name,sh.show_date,sh.show_time,st.seat_type_name,bs.booking_status
FROM Customer c
INNER JOIN Ticket t ON c.customer_id = t.customer_id
INNER JOIN Booked_Seat bs ON t.ticket_id = bs.ticket_id AND bs.booking_status = 'BOOKED'
INNER JOIN Seat s ON bs.seat_id = s.seat_id
INNER JOIN Seat_Type st ON st.seat_type_id = s.seat_type_id
INNER JOIN Screen sc ON s.screen_id = sc.screen_id
INNER JOIN Show sh ON sc.screen_id = sh.screen_id
INNER JOIN Movie m ON sh.movie_id = m.movie_id
INNER JOIN Theatre th ON th.theatre_id = sc.theatre_id
WHERE c.first_name = 'Ravi'
ORDER BY sh.show_date DESC,sh.show_time;
 

--10)to know whether the particular seat is booked or not--
SELECT t.theatre_name,sc.screen_number,sh.show_date,sh.show_time,Seat.seat_row_number,Seat.seat_col_number,
CASE 
  WHEN bs.booking_status = 'Booked'    THEN 'Booked'
  WHEN bs.booking_status = 'Blocked'   THEN 'Blocked'
  WHEN bs.booking_status = 'AVAILABLE' OR bs.booking_status IS NULL   THEN 'Available'
  ELSE bs.booking_status
END AS Seat_Status
FROM Seat
INNER JOIN Screen sc  ON Seat.screen_id  = sc.screen_id
INNER JOIN Theatre t  ON sc.theatre_id   = t.theatre_id
LEFT JOIN Show sh ON sh.screen_id = sc.screen_id   
AND sh.show_date = '2025-02-24' AND sh.show_time = '12:00:00' 
LEFT JOIN Booked_Seat bs ON bs.seat_id  = Seat.seat_id AND bs.show_id  = sh.show_id 
WHERE t.theatre_name     = 'INOX Delhi'
AND sc.screen_number     = '1'
AND Seat.seat_row_number = 'A'
AND Seat.seat_col_number = 10;