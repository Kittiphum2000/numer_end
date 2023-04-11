ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY '412006';

CREATE DATABASE data;
USE data;

CREATE TABLE multi(
  id int not null,
  fx varchar(45),
  xl int,
  xr int,
  primary key (id)
);

INSERT INTO multi(id, fx, xl, xr)
VALUES (0,'sdd',0,0),(1,'(A^4)-13',0,2),(2,'sin(D)',1,10),(3,'(1/2)(25/c+c)',1,3),(4,'x^5',1,10),(5,'2Z^3-2Z',1,10);
