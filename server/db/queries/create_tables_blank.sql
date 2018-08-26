USE to_do_list;

DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS progresses;
DROP TABLE IF EXISTS categories;

CREATE TABLE progresses(
progress_id SMALLINT(6) UNSIGNED NOT NULL AUTO_INCREMENT,
progress VARCHAR(24) NOT NULL,
PRIMARY KEY (progress_id)
);

CREATE TABLE categories(
category_id SMALLINT(6) UNSIGNED NOT NULL AUTO_INCREMENT,
category VARCHAR(24) NOT NULL,
PRIMARY KEY (category_id)
);

CREATE TABLE tasks(
task_id SMALLINT(6) UNSIGNED NOT NULL AUTO_INCREMENT,
task_name VARCHAR(255) NOT NULL,
task_desc TEXT NOT NULL,
priority SMALLINT(6) UNSIGNED DEFAULT 10,
progress_id SMALLINT(6) UNSIGNED NOT NULL,
category_id SMALLINT(6) UNSIGNED NOT NULL,
PRIMARY KEY (task_id),
FOREIGN KEY (progress_id) REFERENCES progresses(progress_id),
FOREIGN KEY (category_id) REFERENCES categories(category_id)
);





