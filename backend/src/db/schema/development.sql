
-- Insert sample data into the Users table for development environment
INSERT INTO USERS (FIRSTNAME, LASTNAME, EMAIL, PASSWORD, ROLE) VALUES
('John', 'Doe', 'tenant1@example.com', 'hashedpassword1', 'TENANT'),
('Alice', 'Smith', 'landlord1@example.com', 'hashedpassword2', 'LANDLORD'),
('Michael', 'Brown', 'tenant2@example.com', 'hashedpassword3', 'TENANT'),
('Emily', 'Davis', 'landlord2@example.com', 'hashedpassword4', 'LANDLORD'),
('Chris', 'Wilson', 'tenant3@example.com', 'hashedpassword5', 'TENANT');



INSERT INTO PROFILES (USER_ID, FIRSTNAME, LASTNAME, PHONE_NUMBER, OCCUPATION, PROFILE_PICTURE_URL, VERIFICATION_STATUS)
VALUES
(1, 'John', 'Doe', '1234567890', 'STUDENT', 'profile1.jpg', TRUE),
(2, 'Alice', 'Smith', '9876543210', 'EMPLOYED', 'profile2.jpg', TRUE),
(3, 'Michael', 'Brown', '5678901234', 'STUDENT', 'profile3.jpg', FALSE),
(4, 'Rachel', 'Green', '2345678901', 'EMPLOYED', 'profile4.jpg', TRUE),
(5, 'Chris', 'White', '7654321098', 'STUDENT', 'profile5.jpg', FALSE);



INSERT INTO PROPERTIES (USER_ID, TITLE, DESCRIPTION, LOCATION, PRICE, PHOTOS, AVAILABLE_FROM, PROPERTY_TYPE, BEDROOM_COUNT) 
VALUES 
(6, 'Modern Condo', '2-bedroom modern condo downtown.', 'City Center', 1200.00, '["photo1.jpg", "photo2.jpg"]', '2024-01-01', 'condo', 2),
(7, 'Luxury Studio', 'Spacious studio apartment with a view.', 'Midtown', 900.00, '["photo3.jpg"]', '2024-02-01', 'studio', 0),
(8, 'Family House', '3-bedroom family home with a garden.', 'Suburbs', 1500.00, '["photo4.jpg"]', '2024-03-01', 'house', 3),
(9, 'City Loft', '1-bedroom loft close to transit.', 'Uptown', 1100.00, '["photo5.jpg"]', '2024-04-01', 'apartment', 1),
(10, 'Cozy Apartment', 'Affordable 1-bedroom apartment.', 'Old Town', 800.00, '["photo6.jpg"]', '2024-05-01', 'apartment', 1);

INSERT INTO ROOMMATEPREFERENCES (USER_ID, GENDER_PREF, MAX_BUDGET, LIFESTYLE_DETAILS) 
VALUES 
(1, 'Any', 1000.00, 'Non-smoker, pet-friendly.'),
(3, 'Female', 800.00, 'Quiet, student-friendly environment.'),
(5, 'Male', 900.00, 'Pet-friendly, open to parties.'),
(1, 'Any', 950.00, 'Close to university, quiet hours preferred.'),
(3, 'Female', 850.00, 'Must allow cats.');


INSERT INTO APPLICATIONS (TENANT_ID, PROPERTY_ID, APPLICATION_DATE, SCREENING_STATUS) 
VALUES 

(6, 1, CURRENT_TIMESTAMP, TRUE),
(3, 2, CURRENT_TIMESTAMP, FALSE),
(8, 3, CURRENT_TIMESTAMP, TRUE),
(1, 4, CURRENT_TIMESTAMP, FALSE),
(3, 5, CURRENT_TIMESTAMP, FALSE);


INSERT INTO MESSAGES (SENDER_ID, RECEIVER_ID, CONTENT, TIMESTAMP, READ_STATUS) 
VALUES 

(1, 2, 'Is the condo still available?', CURRENT_TIMESTAMP, FALSE),
(2, 1, 'Yes, would you like a tour?', CURRENT_TIMESTAMP, FALSE),
(3, 4, 'Can I schedule a visit?', CURRENT_TIMESTAMP, TRUE),
(5, 2, 'Are pets allowed in the house?', CURRENT_TIMESTAMP, FALSE),
(4, 3, 'Let’s arrange a showing.', CURRENT_TIMESTAMP, TRUE);
