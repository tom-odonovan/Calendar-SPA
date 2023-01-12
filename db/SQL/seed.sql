-- Deletes table contents but not the table itself
TRUNCATE TABLE users;
TRUNCATE TABLE calendars;
TRUNCATE TABLE events;

-- INSERT INTO users (id, name, email, password_hash)
--     VALUES (1, 'Tom', 'tom@example.com');



INSERT INTO calendars (user_id, name, description) 
    VALUES (12, 'Calendar 1', 'Example calendar');


-- Add some test events into database 

INSERT INTO events 
    VALUES (1, 12, 4, 'Dinner Party', '1/25/2023', '19:00', '21:00', 'Harry''s');

INSERT INTO events 
    VALUES (2, 12, 4, 'Physio Appointment', '1/18/2023', '12:00', '12:45', '2/2 Wattle Rd, Brookvale NSW 2100', 'Check in with Steph at the Recentre');

INSERT INTO events 
    VALUES (3, 12, 4, 'Project 3 Presentaions', '1/14/2023', '12:00', '17:00', 'Online', 'Deadline for Project 3. Meeting link: https://generalassembly.zoom.us/j/93240625082?pwd=MGFraDZKSzFFRnpxakt4emZrQ3VyQT09');
