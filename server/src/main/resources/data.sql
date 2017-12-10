-- Insert privileges
INSERT INTO privilege (name) VALUES ('CAN_READ_USER');
INSERT INTO privilege (name) VALUES ('CAN_WRITE_USER');
INSERT INTO privilege (name) VALUES ('CAN_READ_ROLE');
INSERT INTO privilege (name) VALUES ('CAN_WRITE_ROLE');
INSERT INTO privilege (name) VALUES ('CAN_READ_PRIVILEGE');
INSERT INTO privilege (name) VALUES ('CAN_WRITE_PRIVILEGE');
INSERT INTO privilege (name) VALUES ('CAN_READ_CHILD');
INSERT INTO privilege (name) VALUES ('CAN_WRITE_CHILD');
INSERT INTO privilege (name) VALUES ('CAN_READ_SESSION');
INSERT INTO privilege (name) VALUES ('CAN_WRITE_SESSION');
INSERT INTO privilege (name) VALUES ('CAN_WRITE_COURSE');
INSERT INTO privilege (name) VALUES ('CAN_WRITE_PROGRAM');
INSERT INTO privilege (name) VALUES ('CAN_READ_PERFORMANCE');
INSERT INTO privilege (name) VALUES ('CAN_WRITE_PERFORMANCE');
INSERT INTO privilege (name) VALUES ('CAN_READ_BILL');
INSERT INTO privilege (name) VALUES ('CAN_WRITE_BILL');
INSERT INTO privilege (name) VALUES ('CAN_READ_PROMOTION');
INSERT INTO privilege (name) VALUES ('CAN_WRITE_PROMOTION');

-- Insert roles
INSERT INTO role (name) VALUES ('ROLE_ADMIN');
INSERT INTO role (name) VALUES ('ROLE_TEACHER');
INSERT INTO role (name) VALUES ('ROLE_USER');

-- Join role - privilege
INSERT INTO role_privilege (role_id, privilege_id) VALUES
  ((SELECT id FROM role WHERE name = 'ROLE_ADMIN'), (SELECT id FROM privilege WHERE name = 'CAN_READ_USER')),
  ((SELECT id FROM role WHERE name = 'ROLE_ADMIN'), (SELECT id FROM privilege WHERE name = 'CAN_WRITE_USER')),
  ((SELECT id FROM role WHERE name = 'ROLE_ADMIN'), (SELECT id FROM privilege WHERE name = 'CAN_READ_ROLE')),
  ((SELECT id FROM role WHERE name = 'ROLE_ADMIN'), (SELECT id FROM privilege WHERE name = 'CAN_WRITE_ROLE')),
  ((SELECT id FROM role WHERE name = 'ROLE_ADMIN'), (SELECT id FROM privilege WHERE name = 'CAN_READ_PRIVILEGE')),
  ((SELECT id FROM role WHERE name = 'ROLE_ADMIN'), (SELECT id FROM privilege WHERE name = 'CAN_WRITE_PRIVILEGE')),
  ((SELECT id FROM role WHERE name = 'ROLE_ADMIN'), (SELECT id FROM privilege WHERE name = 'CAN_READ_CHILD')),
  ((SELECT id FROM role WHERE name = 'ROLE_ADMIN'), (SELECT id FROM privilege WHERE name = 'CAN_WRITE_CHILD')),
  ((SELECT id FROM role WHERE name = 'ROLE_ADMIN'), (SELECT id FROM privilege WHERE name = 'CAN_READ_SESSION')),
  ((SELECT id FROM role WHERE name = 'ROLE_ADMIN'), (SELECT id FROM privilege WHERE name = 'CAN_WRITE_SESSION')),
  ((SELECT id FROM role WHERE name = 'ROLE_ADMIN'), (SELECT id FROM privilege WHERE name = 'CAN_WRITE_COURSE')),
  ((SELECT id FROM role WHERE name = 'ROLE_ADMIN'), (SELECT id FROM privilege WHERE name = 'CAN_WRITE_PROGRAM')),
  ((SELECT id FROM role WHERE name = 'ROLE_ADMIN'), (SELECT id FROM privilege WHERE name = 'CAN_READ_PERFORMANCE')),
  ((SELECT id FROM role WHERE name = 'ROLE_ADMIN'), (SELECT id FROM privilege WHERE name = 'CAN_WRITE_PERFORMANCE')),
  ((SELECT id FROM role WHERE name = 'ROLE_ADMIN'), (SELECT id FROM privilege WHERE name = 'CAN_READ_BILL')),
  ((SELECT id FROM role WHERE name = 'ROLE_ADMIN'), (SELECT id FROM privilege WHERE name = 'CAN_WRITE_BILL')),
  ((SELECT id FROM role WHERE name = 'ROLE_ADMIN'), (SELECT id FROM privilege WHERE name = 'CAN_READ_PROMOTION')),
  ((SELECT id FROM role WHERE name = 'ROLE_ADMIN'), (SELECT id FROM privilege WHERE name = 'CAN_WRITE_PROMOTION'));

INSERT INTO role_privilege (role_id, privilege_id) VALUES
  ((SELECT id FROM role WHERE name = 'ROLE_TEACHER'), (SELECT id FROM privilege WHERE name = 'CAN_READ_SESSION'));

INSERT INTO role_privilege (role_id, privilege_id) VALUES
  ((SELECT id FROM role WHERE name = 'ROLE_USER'), (SELECT id FROM privilege WHERE name = 'CAN_READ_SESSION'));

-- Insert users
INSERT INTO user (address_line1, city, state, zip_code, enabled, first_name, last_password_reset_date, last_name, password, phone_number, registration_date, username)
VALUES ('Please change to your own address',
        'Please change to your own city',
        26,
        'Please change to your own zip code',
        true,
        'Admin_FN',
        NOW(),
        'Admin_LN',
        '$2a$10$a5Kl3RLVIlSGI5xAYfYe.uZO38fc5agxqLPk0koVHp9.bA6ZVMfqa',
        '(123)489-789',
        NOW(),
        'admin@dragon.com');

INSERT INTO user (address_line1, city, state, zip_code, enabled, first_name, last_password_reset_date, last_name, password, phone_number, registration_date, username)
VALUES ('Please change to your own address',
        'Please change to your own city',
        26,
        'Please change to your own zip code',
        true,
        'Teacher_FN',
        NOW(),
        'Teacher_LN',
        '$2a$10$wreB7/4.5F88Ar2.KdXr..utR5zF2262ippaiJ80p74uPl6EeKPde',
        '(123)489-789',
        NOW(),
        'teacher@dragon.com');

INSERT INTO user (address_line1, city, state, zip_code, enabled, first_name, last_password_reset_date, last_name, password, phone_number, registration_date, username)
VALUES ('Please change to your own address',
        'Please change to your own city',
        26,
        'Please change to your own zip code',
        true,
        'User_FN',
        NOW(),
        'User_LN',
        '$2a$10$AAXGOmjMYXJ739WawWI73O657c6F56HfaiwHPbcgk5J0zBduFzWGC',
        '(123)489-789',
        NOW(),
        'user@dragon.com');

-- Join user - role
INSERT INTO user_role (user_id, role_id) VALUES
  ((SELECT id FROM user WHERE username = 'admin@dragon.com'), (SELECT id FROM role WHERE name = 'ROLE_ADMIN'));

INSERT INTO user_role (user_id, role_id) VALUES
  ((SELECT id FROM user WHERE username = 'teacher@dragon.com'), (SELECT id FROM role WHERE name = 'ROLE_TEACHER'));

INSERT INTO user_role (user_id, role_id) VALUES
  ((SELECT id FROM user WHERE username = 'user@dragon.com'), (SELECT id FROM role WHERE name = 'ROLE_USER'));
