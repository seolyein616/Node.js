- 환경 변수
    
    시스템 자체에 설정한 전역변수
    
    - 필요한 이유: 프로세스가 어떠한 작업을 할 때 필요로 하는 정보를 손쉽게 접근/처리할 수 있도록 함
    - 환경변수 PATH
        - 운영체제가 어떤 프로세스를 실행시킬때, 그 경로를 찾는데 이용
    
    API key 와 같이 공개할 수 없는 정보가 코드에 포함된 경우 네트워크를 통해 API key가 공개될 수 있다. 이런 일을 방지하기 위해 API key를 코드가 아닌 PC에 저장하고 사용할 수 있다.
    
    (export 명령어를 사용하면 기록된 환경변수를 확인할 수 있다)

    
    명령어 echo와 함께 환경변수를 입력하면 환경변수 값을 확인할 수 있다
    
    - dotenv: 자바스크립트에서 환경변수 사용하기
        - npm 모듈 dotenv를 사용하여 자바스크립트에서 환경변수를 사용할 수 있다
        
        ```
        1. mkdir new_directory
        2. cd new_directory
        3. npm init
        4. npm i dotenv
        ```
        
        - 설치한 dotenv를 이용해 환경변수에 접근할 수 있다.
        - .env: Node.js에서 환경변수 영구 적용
        
        ```
        1. .env파일 생성, 사용하고자 하는 환경변수 입력 후 저장
        2. 모듈 dotenv이용해 .env에 저장한 환경변수 조회 가능
        ```
        
        환경변수를 이용해 API key, DB password와 같이 민감한 정보를 저장하고 관리할 수 있다. 그뿐만 아니라 서로 다른 PC 또는 여러 .env 파일에서, 같은 변수 이름에 다른 값을 할당할 수 있다.

- CORS
    
    Cross-Origin Resource Sharing. HTTP-header를 이용한 요청 허락 및 거절 메커니즘.
    
    - Cross-Origin: 프로토콜, 도메인, 포트번호 중 한가지라도 다른 경우를 말함
    - CORS가 필요한 이유: CORS없이 모든 곳에서 데이터를 요청할 수 있게 되면 기존 사이트를 베낀 다른 사이트가 악의적으로 정보 추출 및 입력 할 가능성이 있다. 이를 막아 브라우저를 보호하기 위해 필요하다.
    - 동작 방법:
        - Simple request인 경우:
            1. 서버로 요청
            2. 서버의 응답이 왔을 때 브라우저가 요청한 `Origin`과 응답한 헤더 `Access-Control-Request-Headers`의 값을 비교하여 유효한 요청이라면 리소스를 응답, 유효하지 않은 요청이면 브라우저에서 이를 막음(에러 발생)
        - preflight(simple request 이외의 모든 cross-origin요청) 요청일 경우
            1. `Origin`헤더에 현재 요청하는 origin과, `Access-Control-Request-Method`헤더에 요청하는 HTTP method와 `Access-Control-Request-Headers`요청 시 사용할 헤더를 `OPTIONS` 메서드로 서버로 요청. 이때 내용물은 없이 헤더만 전송
            2. 브라우저가 서버에서 응답한 헤더를 보고 유효한 요청인지 확인, 만약 유효하지 않은 요청이라면 요청은 중단되고 에러가 발생, 만약 유효한 요청이라면 원래 요청으로 보내려던 요청을 다시 요청하여 리소스를 응답

- DB Connection, DB Connection Pool
    
    DB Connection이란 애플리케이션과 데이터베이스 서버가 통신할 수 있도록 하는 기능 매번 커낵션을 맺고 끊는 것이 아닌 미리 커넥션을 맺어놓고 그것을 가져다 쓰는 방식. 커넥션 풀은 커넥션을 담아두는 공간의 개념임.
    
    코드 작성 시 커넥션 풀 형태로 코드를 작성하고 DB Server와의 통신을 구현하면 서버에 걸리는 부하를 최소화할 수 있다.
    
    이때 커넥션 풀에서 중요한 것은 DB Server가 커넥션 풀 안에 몇 개의 커넥션을 담을 수 있는지이다. 
    
    ```jsx
    const mysql = require('mysql')
    const pool = mysql.createPool({
    	host: 'localhost',
    	user: 'DB 계정명',
    	passward: 'passward',
    	database: 'name',
    	connectionLimit: 5 //커넥션 풀이 몇 개의 커넥션을 가질 것ㅇㄴ가
    })
    
    pool.connection((error,connection)=>{
    	connection.query(`SELECT * FROM user', (error, result, friends)=>{
    		if(!error) { //result
    			consol.log(result)
    			connection.release() //커넥션 풀에 커넥션 반환
    		}else {
    			throw error
    		}
    	})
    })
    ```
    
- 비동기 (async, await)
    
    async는 asynchronous(비동기)라는 의미이다. async가 붙은 함수는 프로미스를 반환한다.
    
    await는 성공또는 실패로 promis 객체의 실행이 완료되기를 기다린다. 
    
    따라서 await의 뒤에는 promis가 오게 된다. await는 async 키워드를 사용한 함수 안에서만 사용할 수 있다.
    
- try/catch/finally
    
    다음은 예외처리 방식으로, 프로그램 실행 중 발생하는 오류를 예외라 하고, 문법적 오류는 에러라고 한다.
    
    예외는 기본 예외 처리와 고급 예외 처리 두 가지 방법으로 처리한다.
    
    - throw: 자바스크립트는 런타임 에러가 일어날 때마다 예외를 발생시킴. 또한 프로그램에서 throw문을 사용하여 명시적으로 예외를 발생시키기도 함. 따라서 throw는 예외를 강제로 발생시키는 경우임을 확인할 수 있음.
        
        ```jsx
        function factorial(x) {
        	// 만약 전달인자가 유효하지 않으면 예외를 발생시킨다!!!
        	if (x < 0) {
        		throw new Error('x는 음수가 아니어야 합니다.')
        	}
        	// 유효하다면 값을 계산하여 정상적으로 반환환다.
        	for (var f = 1; x > 1; f *= x, x--) /* 비어 있음 */
        	return f;
        }
        ```
        
    - try/catch/finally: 예외를 잡아내는 데 사용함.
        
        예외가 발생하면 자바스크립트 인터프리터는 프로그램 실행을 즉시 중단하고 가장 가까운 예외 처리기로 넘어감.
        
        예외 처리기는 `catch`절을 사용하여 작성함.
        
        예외를 발생시켰던 코드 불록이 catch절과 연결되어있지 않으면 인터프리터는 바로 상위 단계를 감싸고 있는 코드 블록에 연결되어있는지 확인함. 이는 처리기를 찾을 때까지 반복됨.
         `try` 절은 처리할 예외가 발생할지도 모를 코드 블록을 정의하는 역할.
        
        try 블록 다음에는 `catch` 절이 이어짐. catch 절은 try 블록 내부에서 예외가 발생할 경우 호출되는 문장 블록임.
        
        catch 절 다음에는 finally 블록이 이어짐. 여기에는 항상 실행이 보장되는 코드가 포함됨.
        
        catch나 finally 블록은 생략 가능. 하지만 try 블록은 catch나 finally중 적어도 하나 이상의 블록과 함께 사용되어야 함.

        ```jsx
        try {
        /**
        * 정상이라면 이 코드는 아무런 문제없이 블록의 시작부터 끝까지 실행된다.
        * 하지만 경우에 따라 예외가 발생할 수 있다.
        * 예외는 throw 문에 의해 직접적으로 발생할 수도 있고,
        * 또는 예외를 발생시키는 메서드의 호출에 의해 발생할 수도 있다.
        */
        } catch (e) {
            /**
            * 이 블록 내부의 문장들은 오직 try 블록에서 예외가 발생할 경우에만 실행된다.
            * 이 문장들에선 지역 변수 e를 사용하여 Error 객체 또는 앞에서 던진 다른 값을 참조할 수 있다.
            * 이 블록에서는 어떻게든 그 예외를 처리할 수도 있고,
            * 그냥 아무것도 하지 않고 예외를 무시할 수도 있고,
            * 아니면 throw 를 사용해서 예외를 다시 발생시킬 수도 있다.
            */
        } finally {
        /**
        * 이 블록에는 try 블록에서 일어난 일에 관계없이 무조건 실행될 코드가 위치한다.
        * 이 코드는 try 블록이 어떻게든 종료되면 실행된다.
        * try 블록이 종료되는 상황은 다음과 같다.
        *   1) 정상적으로 블록의 끝에 도달했을 때
        *   2) break, continue 또는 return 문에 의해서
        *   3) 예외가 발생했지만 catch 절에서 처리했을 때
        *   4) 예외가 발생했고 그것이 잡히지 않은 채 퍼져나갈 때
        */
        }
        ```