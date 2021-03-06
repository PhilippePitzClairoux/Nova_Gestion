CREATE DATABASE nova_gestion;
USE nova_gestion;

CREATE TABLE type_coolant_hole(
  id_type_coolant_hole BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255)
);

CREATE TABLE coolant_hole(
    id_coolant_hole BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_type_coolant_hole BIGINT,
    quantity INT,
    diameter DECIMAL,
    CONSTRAINT FOREIGN KEY(id_type_coolant_hole) REFERENCES type_coolant_hole(id_type_coolant_hole)
);

CREATE TABLE grade(
    code BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    description VARCHAR(255)
);

CREATE TABLE blank(
    id_blank BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    code_grade BIGINT NOT NULL,
    name VARCHAR(255),
    stock_quantity INTEGER,
    minimum_quantity INTEGER,
    diameter VARCHAR(10),
	code VARCHAR(20),
    length VARCHAR(10),
	coolant_hole boolean,
	activated BOOLEAN NOT NULL DEFAULT TRUE,
    CONSTRAINT FOREIGN KEY(code_grade) REFERENCES grade(code)
);

CREATE TABLE order_history(
    id_order_history BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_blank BIGINT NOT NULL,
    timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    value INT NOT NULL,
    CONSTRAINT FOREIGN KEY(id_blank) REFERENCES blank(id_blank)
);

CREATE TABLE notification(
    id_notification BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_blank BIGINT NOT NULL,
    viewed BOOLEAN DEFAULT FALSE,
    CONSTRAINT FOREIGN KEY(id_blank) REFERENCES blank(id_blank)
);

CREATE TABLE model(
    id_model BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    company VARCHAR(255)
);

CREATE TABLE machine(
    id_machine BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_model BIGINT NOT NULL,
    name VARCHAR(255),
    serial_number VARCHAR(255),
    acquisition_date DATETIME,
    activated BOOLEAN NOT NULL DEFAULT TRUE,
    CONSTRAINT FOREIGN KEY(id_model) REFERENCES model(id_model)
);

CREATE TABLE maintenance(
    id_maintenance BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_machine BIGINT NOT NULL,
    description VARCHAR(255),
    date DATETIME,
    CONSTRAINT FOREIGN KEY(id_machine) REFERENCES machine(id_machine)
);

CREATE TABLE client(
    id_client BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    phone_number VARCHAR(25),
    activated BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE tool(
    id_tool BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    stock_quantity INTEGER,
    minimum_quantity INTEGER,
	id_client BIGINT NOT NULL,
	activated BOOLEAN DEFAULT TRUE,
    CONSTRAINT FOREIGN KEY(id_client) REFERENCES client(id_client)

);


CREATE TABLE program(
    id_program BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_machine BIGINT NOT NULL,
    id_tool BIGINT,
	id_blank BIGINT,
    name VARCHAR(255),
	activated boolean default TRUE,
    CONSTRAINT FOREIGN KEY(id_machine) REFERENCES machine(id_machine),
    CONSTRAINT FOREIGN KEY(id_tool) REFERENCES tool(id_tool),
    CONSTRAINT FOREIGN KEY(id_blank) REFERENCES blank(id_blank)

);

CREATE TABLE file
(
    file_name VARCHAR(255) NOT NULL PRIMARY KEY
);

CREATE TABLE ta_file_program
(
    id_ta_file_program BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_file VARCHAR(255) NOT NULL,
    id_program BIGINT NOT NULL,
    CONSTRAINT FOREIGN KEY (id_file) REFERENCES file(file_name),
    CONSTRAINT FOREIGN KEY (id_program) REFERENCES program(id_program)
);

CREATE TABLE task_type(
    id_task_type BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    description VARCHAR(255)
);

CREATE TABLE employee(
    id_employee BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    surname VARCHAR(255)
);

CREATE TABLE status(
    id_status BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255)
);

CREATE TABLE permission(
    id_permission BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    description VARCHAR(255)
);

CREATE TABLE type_user(
    id_type_user BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255)
);

CREATE TABLE ta_user_type_permission(
    id_ta_user_type_permission BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_user_type BIGINT NOT NULL,
    id_permission BIGINT NOT NULL,
    CONSTRAINT FOREIGN KEY(id_user_type) REFERENCES type_user(id_type_user),
    CONSTRAINT FOREIGN KEY (id_permission) REFERENCES permission(id_permission)
);

CREATE TABLE user(
    id_user BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_user_type BIGINT NOT NULL,
    id_employee BIGINT,
    email VARCHAR(255),
    password VARCHAR(255),
    activated BOOLEAN NOT NULL DEFAULT TRUE,
    CONSTRAINT FOREIGN KEY(id_user_type) REFERENCES type_user(id_type_user),
    CONSTRAINT FOREIGN KEY(id_employee) REFERENCES employee(id_employee)
);

CREATE TABLE work_sheet(
    id_work_sheet BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_status BIGINT NOT NULL,
    quantity INTEGER,
    date_creation DATETIME,
    due_date DATETIME,
    order_number VARCHAR(255),
    activated BOOLEAN NOT NULL DEFAULT TRUE,
    CONSTRAINT FOREIGN KEY(id_status) REFERENCES status(id_status)
);

CREATE TABLE task(
    id_task BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_task_type BIGINT NOT NULL,
    id_work_sheet BIGINT NOT NULL,
    start_time DATETIME,
    end_time DATETIME,
    CONSTRAINT FOREIGN KEY(id_task_type) REFERENCES task_type(id_task_type),
    CONSTRAINT FOREIGN KEY(id_work_sheet) REFERENCES work_sheet(id_work_sheet)
);

CREATE TABLE ta_work_sheet_client_program(
    id_ta_work_sheet_client_program BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_program BIGINT,
    id_work_sheet BIGINT,
    id_client BIGINT,
    CONSTRAINT FOREIGN KEY(id_program) REFERENCES program(id_program),
    CONSTRAINT FOREIGN KEY(id_work_sheet) REFERENCES work_sheet(id_work_sheet),
    CONSTRAINT FOREIGN KEY(id_client) REFERENCES client(id_client)
);
