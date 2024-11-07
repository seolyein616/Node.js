- ORM
    
    Object Relational Mapping
    
    - 객체와 관계형 데이터베이스의 데이터를 자동으로 매핑해주는 것을 말한다.
        - 관계형 DB는 테이블, OOP는 클래스를 사용
        - 객체모델과 관계형 모델간 불일치 존재
        - ORM을 통해 객체 간 관계를 바탕으로 SQL을 자동 생성하여 불일치를 해결
    - 장점
        - 직관적, 비즈니스 로직에 집중 가능
        - 선언문, 할당, 종료 같은 부수적인 코드가 줄어듬
        - 코드 가독성 높임(객체에 대한 코드 각각 별도작성)
        - 재사용 및 유지보수 편리
        - DBMS 종속성 줄어듬
    - 단점
        - ORM으로만 서비스 구현 어려움
        - 복잡성이 증가하면 난이도도 올라감
        - 잘못구현하면 속도저하 및 일관성 무너지는 문제점 발생 가능
    
    자바스크립트에서 주로 사용되는 ORM 라이브러리
    
    - Knex, Sequelize, TypeORM, Prisma 등이 있음

- Prisma 문서 살펴보기
    - [Prisma](https://velog.io/@iamhayoung/prisma-schema)
        - Node.js, TypeScript용 ORM
        - DB는 MySQL, PostgreSQL등을 지원
    - [ex. Prisma의 Connection Pool 관리 방법](https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/databases-connections/connection-pool)
        
        query engine이 데이테베이스가 연결된 connection pool을 관리한다.
        
        풀은 prisma clien가 데이터베이스에 대한 첫번쨰 연결을 열 때 생성되며 
        
        - 명시적 호출 $connect()
        - $connect() 후드 아래를 호출하는 첫번째 쿼리를 실행
        
        다음 두가지 방법으로 발생할 수 있다.
        
        관계형 데이터베이스 커넥터는 Prisma ORM의 연결 풀을 사용한다.
        
         연결 풀에는 연결 URL 매개변수로 제어되는 연결 제한 과 풀 시간 초과가 있다.
        
    - ex. Prisma의 Migration 관리 방법
        - 마이그레이션 장점
            - DB 스키마 쉽게 공유 가능
            - migration이력이 남아 버전관리를 할 수 있음
        - prisma구성요소
            - prisma client: prisma에서 작성한 model이 실제 DB에 table로 반영되었을 때, Node.js환경에서 데이터베이스의 데이터에 접근하고 제어, 조작할 수 있도록 하는 것.
                - [CRUD](https://www.prisma.io/docs/orm/prisma-client/queries/crud) 작업 가능(create, read, update, delete)
            - prisma migrate: sql을 작성하지 않고 DB를 조작할 수 있고, DB조작기록을 관리할 수 있음(DB schema를 변경할 수 있는 tool)
                - 동작원리
                    - schema.prisma 생성
                    - draft migration file 생성
                    - draft migraion file을 DB schema에 적용
            - prisma studio: DB 조회 및 조작 가능

- ORM(Prisma)을 사용하여 좋은 점과 나쁜 점
    - 장점
        - 쿼리 빌더와 스키마 마이그레이션: DB 관리 용이
        - 형식 안전성 및 자동 완성 기능 제공
        - 간결하고 직관적인 API: 학습 및 사용이 편리하다
    - 단점
        - 데이터베이스 지원이 제한적임
        - 유연성의 제한

- 다양한 ORM 라이브러리 살펴보기
    
    Prisma ORM은 스키마를 사용하여 선언적 방식으로 애플리케이션 모델을 정의한다. 이후 Prisma Migrate를 사용하여 SQL 마이그레이션을 생성하고 데이터베이스를 실행할 수 있다. CRUD 쿼리는 Prisma Client에서 제공한다.
    
    - ex. [Sequelize](https://www.prisma.io/docs/orm/more/comparisons/prisma-and-sequelize)
        
        Sequelize는 테이블을 모델 클래스에 매핑하는 전통적인 ORM이다. 이후 모델 클래스의 인스턴스는 런타임에 애플리케이션에 대한 CRUD쿼리를 위한 인터페이스를 제공한다.
        
    - ex. [TypeORM](https://www.prisma.io/docs/orm/more/comparisons/prisma-and-typeorm)
        
        **TypeORM 은** *테이블을 모델 클래스* 에 매핑하는 전통적인 ORM이다. 이러한 모델 클래스는 SQL 마이그레이션을 생성하는 데 사용할 수 있다. 이후 모델 클래스의 인스턴스는 런타임에 애플리케이션에 대한 CRUD 쿼리에 대한 인터페이스를 제공한다.

- 페이지네이션을 사용햐는 다른 API 찾아보기
    - ex. https://docs.github.com/en/rest/using-the-rest-api/using-pagination-in-the-rest-api?apiVersion=2022-11-28
    - ex. https://developers.notion.com/reference/intro#pagination