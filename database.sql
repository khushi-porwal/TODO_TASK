
create table Todo(
id INT UNIQUE auto_increment,
title VARCHAR(50) NOT NULL,
status VARCHAR(30) NOT NULL,
created_at timestamp default current_timestamp
);

INSERT INTO Todo(title,status)
VALUES('Learn React', 'Processing');

ALTER TABLE Todo 
MODIFY status ENUM('todo', 'in-progress', 'done') NOT NULL;

update Todo 
set status="in-progress"
where id=2;

select * from Todo;

