USE to_do_list;

SELECT tasks.task_id, tasks.task_name, tasks.task_desc, tasks.priority, progresses.progress, categories.category
FROM tasks 
INNER JOIN categories
ON tasks.category_id = categories.category_id
INNER JOIN progresses
ON tasks.progress_id = progresses.progress_id;



