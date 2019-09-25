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
    code VARCHAR(63) NOT NULL PRIMARY KEY,
    description VARCHAR(255)
);

CREATE TABLE blank(
    id_blank BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    code_grade VARCHAR(63) NOT NULL,
    id_coolant_hole BIGINT,
    name VARCHAR(255),
    stock_quality INTEGER,
    minimum_quality INTEGER,
    diameter DECIMAL,
    length DECIMAL,
    CONSTRAINT FOREIGN KEY(code_grade) REFERENCES grade(code),
    CONSTRAINT FOREIGN KEY(id_coolant_hole) REFERENCES coolant_hole(id_coolant_hole)
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
    serial_number INTEGER,
    acquisition_date DATE,
    CONSTRAINT FOREIGN KEY(id_model) REFERENCES model(id_model)
);

CREATE TABLE maintenance(
    id_maintenance BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_machine BIGINT NOT NULL,
    description VARCHAR(255),
    date DATE,
    CONSTRAINT FOREIGN KEY(id_machine) REFERENCES machine(id_machine)
);

CREATE TABLE tool(
    id_tool BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    stock_quantity INTEGER,
    minimum_quantity INTEGER
);

CREATE TABLE client(
    id_client BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    phone_number INTEGER
);

CREATE TABLE program(
    id_program BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_machine BIGINT NOT NULL,
    id_tool BIGINT,
    name INTEGER,
    file VARCHAR(255),
    CONSTRAINT FOREIGN KEY(id_machine) REFERENCES machine(id_machine),
    CONSTRAINT FOREIGN KEY(id_tool) REFERENCES tool(id_tool)
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
    id_employe BIGINT,
    email VARCHAR(255),
    password VARCHAR(255),
    CONSTRAINT FOREIGN KEY(id_user_type) REFERENCES type_user(id_type_user),
    CONSTRAINT FOREIGN KEY(id_employe) REFERENCES employee(id_employee)
);

CREATE TABLE work_sheet(
    id_work_sheet BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_status BIGINT NOT NULL,
    quantity INTEGER,
    date_creation DATE,
    due_date DATE,
    order_number VARCHAR(255),
    CONSTRAINT FOREIGN KEY(id_status) REFERENCES status(id_status)
);

CREATE TABLE task(
    id_task BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_task_type BIGINT NOT NULL,
    id_work_sheet BIGINT NOT NULL,
    start_time DATE,
    end_time DATE,
    CONSTRAINT FOREIGN KEY(id_task_type) REFERENCES task_type(id_task_type),
    CONSTRAINT FOREIGN KEY(id_work_sheet) REFERENCES work_sheet(id_work_sheet)
);

CREATE TABLE ta_work_sheet_client_program(
    id_ta_work_sheet_client_program BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_program BIGINT NOT NULL,
    id_work_sheet BIGINT NOT NULL,
    id_client BIGINT NOT NULL,
    CONSTRAINT FOREIGN KEY(id_program) REFERENCES program(id_program),
    CONSTRAINT FOREIGN KEY(id_work_sheet) REFERENCES work_sheet(id_work_sheet),
    CONSTRAINT FOREIGN KEY(id_client) REFERENCES client(id_client)
);
