USE to_do_list;

SET SQL_SAFE_UPDATES = 0;
DELETE FROM tasks WHERE task_id IS NOT NULL;
SET SQL_SAFE_UPDATES = 1;

INSERT INTO tasks (
task_name, 
task_desc, 
progress_id, 
category_id
) 
VALUES 
('buy eggs', 'but 6 free range eggs', 1, 3),
('buy milk', 'but 4 pints of blue milk', 1, 3),
('email wayne', 'email wayne from work ref eating my eggs and drinking my milk on compnay time', 2, 1),
('sack diane', 'she\'s a threat and must be elininated!', 3, 1),
('sell stolen passports', 'sell stolen passports to dodgy dave', 2, 2),
('birthday card for granny', 'something inappropriate to cause maximum offence', 4, 4);


