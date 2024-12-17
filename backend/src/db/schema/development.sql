
INSERT INTO Users (username, email, password_hash, role) VALUES
('tenant_user1', 'tenant1@example.com', 'hashedpassword1', 'tenant'),
('landlord_user1', 'landlord1@example.com', 'hashedpassword2', 'landlord'),
('tenant_user2', 'tenant2@example.com', 'hashedpassword3', 'tenant'),
('landlord_user2', 'landlord2@example.com', 'hashedpassword4', 'landlord'),
('tenant_user3', 'tenant3@example.com', 'hashedpassword5', 'tenant');


INSERT INTO Profiles (user_id, first_name, last_name, phone_number, occupation, profile_picture_url, verification_status) VALUES
(1, 'John', 'Doe', '1234567890', 'Student', 'profile1.jpg', TRUE),
(2, 'Alice', 'Smith', '9876543210', 'Employed', 'profile2.jpg', TRUE),
(3, 'Michael', 'Brown', '5678901234', 'Student', 'profile3.jpg', FALSE),
(4, 'Rachel', 'Green', '2345678901', 'Employed', 'profile4.jpg', TRUE),
(5, 'Chris', 'White', '7654321098', 'Student', 'profile5.jpg', FALSE);



INSERT INTO Properties (user_id, title, description, location, price, photos, available_from, property_type, bedroom_count) VALUES
(2, 'Modern Condo', '2-bedroom modern condo downtown.', 'City Center', 1200.00, '["photo1.jpg", "photo2.jpg"]', '2024-01-01', 'condo', 2),
(4, 'Luxury Studio', 'Spacious studio apartment with a view.', 'Midtown', 900.00, '["photo3.jpg"]', '2024-02-01', 'studio', 0),
(2, 'Family House', '3-bedroom family home with a garden.', 'Suburbs', 1500.00, '["photo4.jpg"]', '2024-03-01', 'house', 3),
(4, 'City Loft', '1-bedroom loft close to transit.', 'Uptown', 1100.00, '["photo5.jpg"]', '2024-04-01', 'apartment', 1),
(2, 'Cozy Apartment', 'Affordable 1-bedroom apartment.', 'Old Town', 800.00, '["photo6.jpg"]', '2024-05-01', 'apartment', 1);


INSERT INTO RoommatePreferences (user_id, gender_pref, max_budget, lifestyle_details) VALUES
(1, 'Any', 1000.00, 'Non-smoker, pet-friendly.'),
(3, 'Female', 800.00, 'Quiet, student-friendly environment.'),
(5, 'Male', 900.00, 'Pet-friendly, open to parties.'),
(1, 'Any', 950.00, 'Close to university, quiet hours preferred.'),
(3, 'Female', 850.00, 'Must allow cats.');



INSERT INTO Applications (tenant_id, property_id, application_date, screening_status) VALUES
(1, 1, CURRENT_TIMESTAMP, TRUE),
(3, 2, CURRENT_TIMESTAMP, FALSE),
(5, 3, CURRENT_TIMESTAMP, TRUE),
(1, 4, CURRENT_TIMESTAMP, FALSE),
(3, 5, CURRENT_TIMESTAMP, FALSE);


INSERT INTO Messages (sender_id, receiver_id, content, timestamp, read_status) VALUES
(1, 2, 'Is the condo still available?', CURRENT_TIMESTAMP, FALSE),
(2, 1, 'Yes, would you like a tour?', CURRENT_TIMESTAMP, FALSE),
(3, 4, 'Can I schedule a visit?', CURRENT_TIMESTAMP, TRUE),
(5, 2, 'Are pets allowed in the house?', CURRENT_TIMESTAMP, FALSE),
(4, 3, 'Let’s arrange a showing.', CURRENT_TIMESTAMP, TRUE);
