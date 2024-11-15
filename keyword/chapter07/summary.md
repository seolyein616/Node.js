- 미들웨어
    - 분산 컴퓨팅 환경에서 서로 다른 기종 간 하드웨어나 프로토콜, 통신 환경 등을 연결해 운영체제와 응용 프로그램, 또는 서버와 클라이언트 사이에서 원만한 통신이 이루어지도록 다양한 서비스를 제공
    - 표준화된 인터페이스를 제공함으로서 시스템 간의 데이터 교환에 일관성 보장
    - 미들웨어 종류: DB, RPC, MOM, TP-MONitor, ORB, WAS 등
    

    
    - 특징
        - middleware는 request, response 사이클 안에서 routing handler 함수가 가지고 있는 request 객체, response 객체, next 함수에 대한 접근이 가능한 함수
        - 미들웨어는 어떠한 코드도 실행 가능
        - request, response 객체 수정이 가능하고 request response 사이클을 끝낼 수 있음
        - 다음 미들웨어를 호출할 수 있음
        - Client의 요청으로 Express 앱 내부에서 request response 사이클이 진행될 때마다 반드시 실행되어야 하는 코드들을 정의하기에 적합함
        - middleware는 global 단위(모든 PATH), PATH 단위로 유연하게 등록이 가능
        - 등록 순서에 따라 실행되기 때문에 주의(등록
        - 미들웨어의 유연성 덕분에 Express는 서드파티 미들웨어들이 매우 많음
    - Express
        
        자체적인 최소한의 기능을 갖춘 라우팅 및 미들웨어 웹 프레임워크.
        
    - 미들웨어 함수: 요청 오브젝트(req), 응답 오브젝트(res), 애플리케이션의 요청-응답 주기 중 그 다음의 미들웨어 함수에 대한 액세스 권한을 갖는 함수. 그 다음의 미들웨어 함수는 일반적으로 next라는 이름의 변수로 표시.
        - 모든 코드를 실행
        - 요청 및 응답 오브젝트에 대한 변경을 실행
        - 요청-응답 주기를 종료
        - 스택 내의 그 다음 미들웨어 함수를 호출
        
        현재의 미들웨어 함수가 요청-응답 주기를 종료하지 않는 경우에는 `next()`를 호출하여 그 다음 미들웨어 함수에 제어를 전달해야 함.
        
        - route handler
            - 라우팅 함수(get, post, put, delete 등)에 적용된 미들웨어
            - 일반적인 미들웨어와는 다르게 path parameter를 사용할 수 있음
        - 미들웨어 작성법
            - req, res, next를 매개변수로 가지는 함수를 작성
                - req는 HTTP 요청을 처리하는 객체
                - res는 HTTP 응답을 처리하는 객체
                - next는 다음 미들웨어를 실행하는 함수(실행되지 않을 시 미들웨어 사이클이 멈춤)
            - middleware 는 적용되는 위치에 따라서 어플리케이션 미들웨어, 라우터 미들웨어, 오류처리 미들웨어로 분류 가능
        
        ### 어플리케이션 미들웨어
        
        ```jsx
        app.use((req, res, next) => {
        	console.log(`Request ${req.path}`);
        	next();	//1
        });
        
        app.use(auth);	//2
        
        app.get('/', (req, res, next) => {
        	res.send('Hello Express');	//3
        });
        ```
        
        - use 나 http method 함수를 사용하여 미들웨어를 연결할 수 있음
        - 미들웨어를 모든 요청에 공통적으로 적용하기 위한 방법
        - HTTP 요청이 들어온 순간부터 적용된 순서대로 동작 함
        
        ### 라우터 미들웨어
        
        ```jsx
        router.use(auth);					//3
        
        router.get('/', (req, res, next) => {
        	res.send('Hello Router');		//4
        });
        
        app.use((req, res, next) => {
        	console.log(`Request ${req.path}`);
        	next();							//1
        });
        
        app.use('/admin', router);			//2
        ```
        
        - router 객체에 미들웨어가 적용되는 것 외에는 어플리케이션 미들웨어와 사용 방법은 동일
        - 특정 경로의 라우팅에만 미들웨어를 적용하기 위한 방법
        - app 객체에 라우터가 적용된 이후로 순서대로 동작함
        
        ### 미들웨어 서브 스택
        
        ```jsx
        app.use(middleware1, middlware2, ...);
        
        app.use('/admin', auth, adminRouter);
        
        app.get('/', logger, (req, res, next) => {
        	res.send('Hello Express');
        });
        ```
        
        - use 나 http method 함수에 여러 개의 미들웨어를 동시에 적용할 수 있음
        - 주로 한 개의 경로에 특정해서 미들웨어를 적용하기 위해 사용
        - 전달된 인자의 순서 순으로 동작
        
        ### 오류처리 미들웨어
        
        ```jsx
        app.use((req, res, next) => {
        	if (!isAdmin(req)) {
        		next(new Error('Not Authorized'));
        		return;
        	}
        	next();
        });
        
        app.get('/', (req, res, next) => {
        	res.send('Hello Express');
        });
        
        app.use((err, req, res, next) => {
        	res.send('Error Occurred');
        });
        ```
        
        - 오류처리 미들웨어는 일반적으로 가장 마지막에 위치하는 미들웨어
        - 다른 미들웨어들과는 달리 err, req, res, next 네 가지 인자를 가지며, 앞선 미들웨어에서 next 함수에 인자가 전달되면 실행됨
        - 이전에 적용된 미들웨어 중 next에 인자를 넘기는 경우 중간 미들웨어들은 뛰어넘고 오류처리 미들웨어가 바로 실행됨
        
        ### 함수형 미들웨어
        
        ```jsx
        const auth = (memberType) => {
        	return (req, res, next) => {
        		if (!checkMember(req, memberType)) {
        			next(new Error(`member not ${memberType}`));
        			return;
        		}
        		next();
        	}
        }
        
        app.use('/admin', auth('admin'), adminRouter);
        
        app.use('/users', auth('member'), userRouter);
        ```
        
        - auth 함수는 미들웨어 함수를 반환하는 함수
        - auth 함수 실행 시 미들웨어의 동작이 결정되는 방식으로 작성됨
        - 일반적으로 동일한 로직에 설정값만 다르게 미들웨어를 사용하고 싶을 경우에 활용됨
    
- HTTP 상태 코드
    
    특정 HTTP 요청이 성공적으로 완료되었는지 알려줌. 5개의 그룹(정보를 제공하는 응답, 성공적인 응답, 리디렉트, 클라이언트 에러, 서버 에러)으로 나누어짐.
    
    [상태코드](https://datatracker.ietf.org/doc/html/rfc2616#section-10)
    
    요청 성공
    
    `200 OK`: 요청 성공적으로 응답.
    
    `201 Created`: 요정이 성공적이었으며, 그 결과 새로운 리소스 생성됨(POST, PUT 이후 따라옴)
    
    `200 Accepted`: 요청 수신하였지만 행동할 수 없음. 
    
    에러 응답
    
    `400 Bad Reqest`: 잘못된 문법으로 서버가 요청을 이해할 수 없음
    
    `401 Unauthorized`: 클라이언트는 요청한 응답을 받기 위해서는 스스로를 인증해야 함
    
    `403 Forbidden`: 클라이언트가 접근할 권리를 가지고 있지 않음
    
    `404 Not Found` :서버가 요청받은 리소스를 찾을 수 없음.