1.홈 화면
Endpoint: GET /api/users/{userId}/home
Request body: 
```json
{
    "username" : "String",
    "email" : "dString",
    "phonenumber" : "String",
    "point" : 2500
}
```
Request Header: Authorization: Bearer token
query String:
Path variable: {userId}

2.마이페이지 리뷰 작성
Endpoint: POST /api/users/{userId}/missions/{missionId}/reviews
Request body: 
```json
{
  "rating": 5,
  "comment": "String"
}
```
Request Header: Authorization: Bearer token
query String:
Path variable: userId, missionId

3.미션 목록 조회(진행중, 진행완료)
Endpoint: GET /api/users/{userId}/missions
Request body: 
```json
{
\    "missions":[
        {
            "missionId": 101,
            "points": 500,
            "location" : "String",
            "description": "String",
            "status":"String"
        },
        {
            "missionId": 102,
            "points": 100,
            "location" : "String",
            "description": "String",
            "status":"String"  
        }
    ]
}
```
Request Header: Authorization: Bearer token
query String:
Path variable: userId
4.미션 성공 누르기
Endpoint: POST /api/users/{userId}missions/{missionId}/complete
Request body: 
```json
{
  "complet_request": true
}
```
Request Header: Authorization: Bearer token
query String:
Path variable: userId, missionid
5.회원가입하기(소셜 로그인 고려x)
Endpoint: POST /api/users/signUp
Request body: 
```json
{
  "name": "String",
  "gender": "String",
  "birthdate": "String",
  "address": "String",
  "address2": "String",
  "prefer": "String"
}
```
Request Header: Content-Type: application/json
query String: 
Path variable: