USE to_do_list;

/* 
Can only delete rows from tables referenced with foreign keys (progresses * categories) 
if child table (tasks) doesn't have records referencing those keys.
*/
/* 
SET SQL_SAFE_UPDATES = 0;
DELETE FROM tasks WHERE task_id IS NOT NULL;
DELETE FROM progresses WHERE progress_id IS NOT NULL;
DELETE FROM categories WHERE category_id IS NOT NULL;
SET SQL_SAFE_UPDATES = 1;
*/

INSERT INTO progresses (progress) VALUES 
('not started'),
('in progress'),
('completed'),
('deleted');

INSERT INTO categories (category) 
VALUES 
('work'), 
('personal admin'), 
('food shopping'), 
('birthdays');



