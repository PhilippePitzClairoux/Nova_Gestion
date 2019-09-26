INSERT INTO type_coolant_hole (name)
VALUES ('Hélicoïdal');

INSERT INTO type_coolant_hole (name)
VALUES ('Droit');

INSERT INTO coolant_hole (id_type_coolant_hole, quantity, diameter)
VALUES (2, 2, 0.02);

INSERT INTO coolant_hole (id_type_coolant_hole, quantity, diameter)
VALUES (1, 4, 0.01);

INSERT INTO grade (description)
VALUES ('K05');

INSERT INTO grade (description)
VALUES ('K01');

INSERT INTO grade (description)
VALUES ('K15');

INSERT INTO grade (description)
VALUES ('K60');

INSERT INTO blank (code_grade, name, stock_quantity, minimum_quantity, diameter, length)
VALUES (2, '1/2 x 3 - K01', 30, 10, 0.5, 3);

INSERT INTO blank (code_grade, id_coolant_hole, name, stock_quantity, minimum_quantity, diameter, length)
VALUES (4, 1, '1/3 x 2 - K60', 7, 15, 0.33, 2);

INSERT INTO model (name, company)
VALUES ('Helitronic Essential', 'Walter');

INSERT INTO model (name, company)
VALUES ('Helitronic Basic', 'Walter');

INSERT INTO model (name, company)
VALUES ('Helitronic Mini Automation', 'Walter');

INSERT INTO model (name, company)
VALUES ('Helitronic Mini Power', 'Walter');

INSERT INTO model (name, company)
VALUES ('Helitronic Power', 'Walter');

INSERT INTO model (name, company)
VALUES ('Helitronic Power 400', 'Walter');

INSERT INTO model (name, company)
VALUES ('Helitronic Micro', 'Walter');

INSERT INTO model (name, company)
VALUES ('Helitronic Vision 400 L', 'Walter');

INSERT INTO model (name, company)
VALUES ('Helitronic Vision 700 L', 'Walter');

INSERT INTO machine (id_model, name, serial_number, acquisition_date)
VALUES (2, 'A', 'H54-5T4564-2J31', 2002-03-21);

INSERT INTO machine (id_model, name, serial_number, acquisition_date)
VALUES (1, 'B', 'W54-564A-2G23', 2012-10-07);

INSERT INTO machine (id_model, name, serial_number, acquisition_date)
VALUES (1, 'C', 'O72-5R411-8G43', 2017-07-11);

INSERT INTO maintenance (id_machine, description, date)
VALUES (1, 'Changement huile', 2010-01-10);

INSERT INTO maintenance (id_machine, description, date)
VALUES (1, 'Changement huile', 2010-06-02);

INSERT INTO maintenance (id_machine, description, date)
VALUES (1, 'Changement filtre', 2011-07-12);

INSERT INTO maintenance (id_machine, description, date)
VALUES (1, 'Changement filtre', 2011-07-12);

INSERT INTO maintenance (id_machine, description, date)
VALUES (3, 'Changement filtre', 2018-07-12);

INSERT INTO tool (name, stock_quantity, minimum_quantity)
VALUES ('Cobra Mill 1/4', 30, 10);

INSERT INTO tool (name, stock_quantity, minimum_quantity)
VALUES ('Cobra Mill 5/8', 41, 20);

INSERT INTO tool (name, stock_quantity, minimum_quantity)
VALUES ('Furtif3 3/8', 8, 15);

INSERT INTO tool (name, stock_quantity, minimum_quantity)
VALUES ('S6-MILL 1/4', 20, 10);

INSERT INTO client (name, phone_number)
VALUES ('A7-Integration', '4503056218')