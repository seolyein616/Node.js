use umc_mission04;
create table member (
id bigint primary key,
name varchar(20),
gender varchar(10),
age int,
address varchar(40),
address2 varchar(40),
stat varchar(15),
inactive_date datetime(6),
social_type varchar(10),
created_at datetime(6),
updated_at datetime(6),
email varchar(50),
point int);

create table region (
id bigint primary key,
name varchar(20),
created_at datetime(6),
updated_at datetime(6));

create table store (
id bigint primary key,
region_id bigint,
name varchar(50),
address varchar(50),
created_at datetime(6),
updated_at datetime(6),
foreign key (region_id) references region(id));

create table mission (
id bigint primary key,
store_id bigint,
reward int,
deadline datetime,
mission_text text,
created_at datetime(6),
updated_at datetime(6),
foreign key (store_id) references store (id)
);

create table if member_mission(
id bigint primary key,
member_id bigint,
mission_id bigint,
status varchar(15),
created_at datetime(6),
updated_at datetime(6),
foreign key (member_id) references member(id),
foreign key (mission_id) references mission(id)
);

CREATE TABLE terms (
    id BIGINT PRIMARY KEY,
    title VARCHAR(20),
    body TEXT,
    optional BOOLEAN,
    created_at DATETIME(6),
    updated_at DATETIME(6)
);

create table if not exists member_agree (
id bigint primary key,
member_id bigint,
terms_id bigint,
created_at datetime(6),
updated_at datetime(6),
foreign key (member_id) references member(id),
foreign key (terms_id) references terms(id));

CREATE TABLE food_category (
    id BIGINT PRIMARY KEY,
    name VARCHAR(15),
    created_at DATETIME(6),
    updated_at DATETIME(6)
);

create table member_prefer (
id bigint primary key,
member_id bigint,
category_id bigint,
created_at datetime(6),
updated_at datetime(6),
foreign key (member_id) references member(id),
foreign key (category_id) references food_category(id));

CREATE TABLE review (
    id BIGINT PRIMARY KEY,
    member_id BIGINT,
    store_id BIGINT,
    body TEXT,
    score FLOAT,
    created_at DATETIME(6),
    updated_at DATETIME(6),
    FOREIGN KEY (member_id) REFERENCES member(id),
    FOREIGN KEY (store_id) REFERENCES store(id)
);

CREATE TABLE review_image (
    id BIGINT PRIMARY KEY,
    review_id BIGINT,
    image_url TEXT,
    created_at DATETIME(6),
    updated_at DATETIME(6),
    FOREIGN KEY (review_id) REFERENCES review(id)
);
