BULK INSERT Customer
FROM "C:\Users\Keerthi\Downloads\01_Customer (2).csv"
WITH (
    FIELDTERMINATOR = ',',
    ROWTERMINATOR = '\n',
    FIRSTROW = 2,
    DATAFILETYPE = 'char',
    FORMAT = 'CSV'
);
BULK INSERT Movie
FROM "C:\Users\Keerthi\Downloads\02_Movie.csv"
WITH (
    FIELDTERMINATOR = ',',
    ROWTERMINATOR = '\n',
    FIRSTROW = 2,
    DATAFILETYPE = 'char',
    FORMAT = 'CSV'
);
BULK INSERT Seat
FROM "C:\Users\Keerthi\Downloads\07_Seat.csv"
WITH (
    FIELDTERMINATOR = ',',
    ROWTERMINATOR = '\n',
    FIRSTROW = 2,
    DATAFILETYPE = 'char',
    FORMAT = 'CSV'
);
BULK INSERT Seat_Type
FROM "C:\Users\Keerthi\Downloads\06_Seat_Type.csv"
WITH (
    FIELDTERMINATOR = ',',
    ROWTERMINATOR = '\n',
    FIRSTROW = 2,
    DATAFILETYPE = 'char',
    FORMAT = 'CSV'
);
BULK INSERT Show
FROM "C:\Users\Keerthi\Downloads\05_Show (1).csv"
WITH (
    FIELDTERMINATOR = ',',
    ROWTERMINATOR = '\n',
    FIRSTROW = 2,
    DATAFILETYPE = 'char',
    FORMAT = 'CSV'
);
BULK INSERT Theatre
FROM "C:\Users\Keerthi\Downloads\03_Theatre.csv"
WITH (
    FIELDTERMINATOR = ',',
    ROWTERMINATOR = '\n',
    FIRSTROW = 2,
    DATAFILETYPE = 'char',
    FORMAT = 'CSV'
);
BULK INSERT Ticket
FROM "C:\Users\Keerthi\Downloads\08_Ticket.csv"
WITH (
    FIELDTERMINATOR = ',',
    ROWTERMINATOR = '\n',
    FIRSTROW = 2,
    DATAFILETYPE = 'char',
    FORMAT = 'CSV'
);
BULK INSERT Screen
FROM "C:\Users\Keerthi\Downloads\04_Screen.csv"
WITH (
    FIELDTERMINATOR = ',',
    ROWTERMINATOR = '\n',
    FIRSTROW = 2,
    DATAFILETYPE = 'char',
    FORMAT = 'CSV'
);
BULK INSERT Payment
FROM "C:\Users\Keerthi\Downloads\10_Payment.csv"
WITH (
    FIELDTERMINATOR = ',',
    ROWTERMINATOR = '\n',
    FIRSTROW = 2,
    DATAFILETYPE = 'char',
    FORMAT = 'CSV'
);
BULK INSERT Booked_Seat
FROM "C:\Users\Keerthi\Downloads\09_Booked_Seat.csv"
WITH (
    FIELDTERMINATOR = ',',
    ROWTERMINATOR = '\n',
    FIRSTROW = 2,
    DATAFILETYPE = 'char',
    FORMAT = 'CSV'
);
BULK INSERT Complaint
FROM "C:\Users\Keerthi\Downloads\11_Complaint.csv"
WITH (
    FIELDTERMINATOR = ',',
    ROWTERMINATOR = '\n',
    FIRSTROW = 2,
    DATAFILETYPE = 'char',
    FORMAT = 'CSV'
);