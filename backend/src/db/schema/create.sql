-- Users Table
CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('tenant', 'landlord')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



-- Profiles Table
CREATE TABLE IF NOT EXISTS Profiles (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(15),
    occupation VARCHAR(50) NOT NULL CHECK (occupation IN ('Student', 'Employed')),
    profile_picture_url VARCHAR(255),
    verification_status BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);




-- Properties Table
CREATE TABLE IF NOT EXISTS Properties (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    location VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    photos JSON,
    available_from DATE NOT NULL,
    property_type VARCHAR(50) NOT NULL CHECK (property_type IN ('condo', 'apartment', 'house', 'studio')),
    bedroom_count INTEGER NOT NULL CHECK (bedroom_count >= 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);


-- Roommate Preferences Table
CREATE TABLE IF NOT EXISTS RoommatePreferences (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    gender_pref VARCHAR(50),
    max_budget DECIMAL(10, 2),
    lifestyle_details TEXT,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);


-- Applications Table
CREATE TABLE IF NOT EXISTS Applications (
    id SERIAL PRIMARY KEY,
    tenant_id INTEGER NOT NULL,
    property_id INTEGER NOT NULL,
    application_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    screening_status BOOLEAN DEFAULT FALSE, -- False means not screened
    FOREIGN KEY (tenant_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (property_id) REFERENCES Properties(id) ON DELETE CASCADE
);



-- Messages Table
CREATE TABLE IF NOT EXISTS Messages (
    id SERIAL PRIMARY KEY,
    sender_id INTEGER NOT NULL,
    receiver_id INTEGER NOT NULL,
    content TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    read_status BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (sender_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES Users(id) ON DELETE CASCADE
);


