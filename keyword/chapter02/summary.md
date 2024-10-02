- join 연산
    
    join은 다수 테이블을 연결해서 데이터를 뽑아내는 연산을 의미
    
    (기본적으로 join은 정규화된 테이블을 사용)
    
    1. natural join
        
        두 테이블에서 같은 속성이름을 기준으로 테이블을 합쳐서 새로운 테이블을 만드는 것
        
        ```sql
        select *
        from student_info natural join students_department
        ```
        
        (주의: 사용자가 지정하지 않고 연산 과정에서 동일한 속성의 이름을 찾아  join하기 때문에 이름만 같고 정보가 같은 테이블이 합쳐지면 정보가 회손될 수 있음)
        
    2. inner join
        
        on 연산을 사용하여 테이블을 합칠 조건을 직접 명시해 줄 수 있음.
        
        ```sql
        select * 
        from students_info join students_department
        on students_info.student_id=students_department.student_id
        ```
        
        만약, 두 테이블에 값이 일치하지 않는 튜플들이 있다면 삭제되고 합쳐진 테이블에는 완벽하게 일치하는 튜플들만 남음
        
    3. outer join
        
        위의 두 join과는 다르게 짝을 찾지 못한 속성값들도 결과 테이블에 유지. 해당 속성의 값은 NULL로 초기화됨
        
    4. left outer join
        
        join연산 수행시 왼쪽에 위치했던 테이블의 튜플은 모두 남기고, 오른쪽에 위치시켰던 테이블의 값은 일치하는 튜플만 남김
        
        (right outer join은 반대)
        
        (full outer join은 양쪽 정보 모두 유지)