--진행중, 진행 완료한 미션 모아서 보는 쿼리(페이징 포함)
select ma.id, m.name, m.reward, m.description, r.name, ma.created_at, ma.complete_date,
case
    when ma.complete_date is null then '진행중'
    else '진행 완료'
end as mission_status
from mission_assignment as ma
join mission as m on ma.mission_id = m.id
join restaurant as r on r.mission_code = m.id
join user as u on ma.user_id = u.id
order by ma.created_at desc 
limit 3 offset 0;

--리뷰 작성하는 쿼리
insert into review(user_id,point,description,created_at,updated_at,restaurant_id)
values ('user_id','point','description',now(),now(),'restaurant_id');

--홈 화면 쿼리(현재 선택 된 지역에서 도전이 가능한 미션 목록, 페이징 포함)
select m.id, m.name, m.description, m.reward, r.name, a.name, m.end_date
from mission as m
join restaurant as r on r.mission_code = m.id
join area as a on r.area_id= a.id
order by m.end_date asc 
limit 3 offset 0;

--마이페이지 화면 쿼리
select u.id, u.name, u.email, 
case
    when u.phone_num is null then '미인증'
    else u.phone_num
end as phone_num_status, u.point
from user as u