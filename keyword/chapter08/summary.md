- Swagger
    
    swagger-autogen: 
    
    - 기존 코드의 가독성을 유지하기 우해 swagger관련 설정을 별도의 파일로 관리
    - swagger에 모든 API를 등록하는 과정을 자동화
    - 중괄호 쌍이나 콤마가 맞지 않을 때, 에러를 바로 표시하는 json형식의 파일 사용
    
    swagger-ui-express: swagger-ui와 express를 연결하기 위해 사용
    
    src 디렉토리 하위로 swagger 디렉토리를 생성 후 이 디렉토리 하위에 swagger설정 파일을 저장한다.
    
    src 디렉토리 하위에서 아래의 명령을 입력한다.
    
    - 모든 API를 Swagger에 자동으로 등록하는 명령이다.
    - 명령을 수행할 때마다 swagger-output.json 파일을 초기화하므로, API가 추가될 때마다 실행하는 것이 아니라 최초 한번만 실행해야 한다.
    - 이후 추가된 API에 대한 설정은 swagger-output.json 파일에 직접 추가해주어야 한다.
    
    Swagger-autogen에 성공하면, swagger 디렉토리 하위로 swagger-output.json 파일이 생성된다.
    
    - **Swagger 페이지에 설명 추가하기**
        
        ### 1) API에 대한 설명 작성하기
        
        각 API에 대한 설명은 아래의 `...` 부분에 작성되어야 한다. (완성된 형식은 포스팅에 가장 마지막 부분에 작성해두었으니 참고하기 바란다.)
        
        ```
        "paths": {
            "/db": {
              "get": {
              	... → 이 부분에 작성
              }
            },
        ```
        
        ① tags
        
        - API를 구분하는 태그
        
        ```
        "tags": ["DB API"],
        ```
        
        
        ② summary
        
        - API 엔드포인트 옆에 표시되는 설명
        
        ```
        "summary": "Company DB 사원 테이블 모든 컬럼명 반환",
        ```
        
        
        ③ description
        
        - API를 클릭했을 때 나타나는 부가 설명
        
        ```
        "description": "Company DB 사원 테이블의 모든 컬럼명을 반환합니다.",
        ```
        
        
        ④ parameters
        
        - 입력 받아야하는 값이 Query Parameter인 경우
        
        ```
        "parameters": [
        {
        	"name": "columns", // Query Parameter의 이름
            "in": "query",
            "description": "조회할 컬럼들을 콤마로 구분 ex) EMAIL,NAME,ID,EXTENSIONNUM,PHONENUM,EMPLOYEENUM,DEPARTMENT_ID",
            "required": true, // 필수 입력
            "schema": {
            	"type": "string", // 입력 값의 타입을 설정 ex) integer, string, boolean
                "example": "EMAIL,NAME,ID,EXTENSIONNUM,PHONENUM,EMPLOYEENUM,DEPARTMENT_ID"
            }
        },
            ... // 추가적으로 입력 받을 Query Parameter 입력
        ],
        ```
        
        
        - 입력 받아야하는 값이 Path Variable인 경우
        
        ```
        "parameters": [
        	{
            	"name": "scheduleId", // Path Variable의 이름
                "in": "path",
                "required": true,
                "type": "integer",
                "description": "삭제할 스케줄의 ID"
            }
        ],
        ```
        
       
        ⑤ requestBody
        
        - 요청 본문을 통해 입력 값을 받아야 하는 경우
        
        ```
        "requestBody": {
        	"required": false,
            "content": {
            	"application/json": {
                	"schema": {
                    	"type": "object",
                        "properties": {
                          "host": {
                            "type": "string",
                            "example": "localhost"
                          },
                          "port": {
                            "type": "string",
                            "example": "1521"
                          },
                          "username": {
                            "type": "string",
                            "example": "hsbyun"
                          },
                          "password": {
                            "type": "string",
                            "example": "password"
                          },
                          "sid": {
                            "type": "string",
                            "example": "xe"
                          },
                          "connectString": {
                            "type": "string",
                            "example": "localhost:1521/xe"
                          }
                       }
                	}
            	}
        	}
        },
        ```
        
        
        ### 2) API Response 작성하기
        
        API Response 표기에 대한 설정은 아래의 `...` 부분에 작성되어야 한다.
        
        ```
        "paths": {
        	"/db": {
              "get": {
        
                "responses": {
                	... → 이 부분에 작성
                }
            }
        },
        }
        ```
        
        ① Status Code
        
        - Response의 Status Code에 따라 Response를 분류한다.
        
        ```
        "200": {
        	...
        },
        ```
        

        ② description
        
        - Status Code 별 설명
        - Status Code 하위에 작성
        
        ```
        "200": {
        	"description": "사원 정보 조회 성공",
            ...
        }
        ```
        
        
        
        ③ content
        
        - 응답 데이터의 형식을 정의
        - 마찬가지로, Status Code 하위에 작성
        - 응답 데이터를 ChatGPT에 넣는 방식으로 쉽게 생성 가능
        
        ```
        "200": 
        	...
        	"content": {
            	"application/json": {
                	"schema": {
                    	"type": "object",
                        "properties": {
                        	"status": {
                              "type": "integer",
                              "example": 200
                            },
                            "success": {
                              "type": "boolean",
                              "example": true
                            },
                            "message": {
                              "type": "array",
                              "items": {
                                "type": "object",
                                "properties": {
                                  "EMAIL": {
                                    "type": "string",
                                    "example": "hsbyun@daoudata.co.kr"
                                  },
                                  "NAME": {
                                    "type": "string",
                                    "example": "변현섭 인턴"
                                  },
                                  "ID": {
                                    "type": "integer",
                                    "example": 11
                                  },
                                  "EXTENSIONNUM": {
                                    "type": "integer",
                                    "example": 1
                                  },
                                  "PHONENUM": {
                                    "type": "string",
                                    "example": "010-1010-1010"
                                  },
                                  "EMPLOYEENUM": {
                                    "type": "integer",
                                    "example": 1
                                  },
                                  "DEPARTMENT_ID": {
                                    "type": "integer",
                                    "example": 13
                                  }
                               }
                            }
                         }
                     }
            	 }
        	 }
        }
        ```
        
  
        
    - 특징
        - Swagger(OpenAPI)는 OpenAPI Specification(OAS)에 기반하여 API문서화와 다른 도구들과의 통합을 지원한다.
        - 자동으로 API 엔드포인트를 탐색하여 문서를 생성하며, UI를 통해 API를 시험할 수 있다.
        - API의 구조, 요청/응답 형식, 상태코드, 오류메세지 등을 시각적으로 표시한다.
    - 장점:
        - 쉬운 세팅 및 사용
        - UI 제공
        - 실제 API  호출 기능 제공
        - OAS 를 따르므로 다양한 툴과의 호환성이 좋음
    - 단점:
        - 코드에 주석을 기반으로 하므로, 실제 코드와 문서화 사이에 불일치 발생 가능
        - 실제 코드와 동기화를 위해 추가작업 필요
    - 작동방식:
        - Swagger는 주로 코드나 주석에 기반하여 API 문서를 자동 생성한다.
- OpenAPI
    
    `OpenAPI`또는 `OpenAPI Specification(OAS)`라고 부르는데, 이는 **RESTful API**를 기 정의된 규칙에 맞게 API spec을 `json`이나 `yaml`로 표현하는 방식을 의미
    직접 소스코드나 문서를 보지 않고 서비스를 이해할 수 있음
    <OpenAPI와 swagger>
    
    - `OpenAPI` : 이전에 Swagger Specification으로 알려진 Specification 자체 (**RESTful API 디자인에 대한 정의(Specification)**)
    - `Swagger` : OpenAPI를 Implement하기 위한 도구 (SmartBear사의 tool)
- OpenAPI 버전 별 특징 및 주요 차이점
    
    OAS의 주요 버전과 각 버전 간의 주요 차이점 위주로 정리함.
    
    `"swagger": "2.0"`
    
    1. JSON 및 YAML 지원: OpenAPI 2.0에서는 API 정의가 JSON 및 YAML 형식 모두로 작성되도록 허용
    2. 엔드포인트, 매개변수, 요청 본문, 응답 및 보안 체계를 포함하여 REST API의 구조
    3. 경로 기반 구조: 사양은 경로(/users, /items/{id} 등)별로 작업을 구성하는 데 중점을 두어 사용 가능한 엔드포인트와 각 경로에 대해 HTTP 메서드(GET, POST, PUT 등)가 지원
    4. 제한된 재사용성: '정의'라는 개념이 있었지만 최신 버전에 비해 재사용성이 다소 제한되어 엔드포인트 전체에서 유사한 구성 요소가 많이 사용
    
    `"openapi": "3.0.0"`
    
    1. 구성요소 분리:  '스키마', '응답', '매개변수', '예제', '헤더' 및 '보안 구성표'를 재사용하여 모듈성을 촉진하고 중복성을 줄임
    2. OpenAPI 3.0에서는 '매개변수'와 'requestBody'를 명확하게 구분
    3. 콜백: '콜백'의 도입으로 API 디자이너는 비동기 작업을 지정하여 이벤트 중심 워크플로에 대한 더 나은 지원을 제공
    4. content 속성을 도입하여 여러 미디어 유형(예: JSON 및 XML)과 각 유형에 대한 스키마를 명확하게 설명
    5. examples 키워드를 사용하면 요청 본문과 응답에 대한 여러 예제를 정의할 수 있어 개발자에게 보다 포괄적인 문서를 제공할 수 있음
    6. 서버 개체: OpenAPI 3.0에서는 API의 기본 URL을 정의하기 위해 서버 개념을 도입
        
        
        OpenAPI 2.0: RESTful API 문서에 구조와 형식화를 도입했지만 유연성과 재사용성이 제한
        OpenAPI 3.0: 재사용 가능한 구성 요소 분리, 명시적 요청 본문, 향상된 콘텐츠 관리, 비동기 콜백 지원과 같은 중요한 개선 사항이 도입
        OpenAPI 3.1: JSON 스키마 표준과의 호환성 개선, 재사용성 및 유연성 향상, 최신 API 사용 사례에 대한 더 나은 검증 및 문서화에 중점을 두어 개선
        
- OpenAPI Component
    
    OpenAPI 3.1은 API 명세를 작성하는 데 사용되는 표준
    
    주요 구성요소는
    
    첫째, Paths는 API의 엔드포인트를 정의
    
    둘째, Components는 재사용 가능한 스키마, 응답, 요청 본문 등을 정의
    
    셋째, Security는 API의 보안 설정을 정의
    
    OpenAPI 3.1의 가장 큰 장점 중 하나는 컴포넌트를 재사용할 수 있다는 점
    
    ⇒ 이를 통해 코드의 중복을 줄이고, 유지보수성을 높일 수 있음
    
    컴포넌트를 분할하는 첫 번째 단계는 공통된 요소를 식별하는 것
    
    다음 단계는 식별된 공통 요소를 컴포넌트로 분리하는 것(이를 위해 OpenAPI 3.1의 Components 섹션을 사용_Components 섹션에는 스키마, 응답, 요청 본문, 보안 설정 등을 정의할 수 있음)
    
    즉, 컴포넌트를 분할하고 배치하는 것을 통해 코드의 중복을 줄이고 유지보수성을 높일 수 있으며 API의 변경 사항을 쉽게 반영할 수 있어 API명세를 체계적으로 관리하는 데 기여함.