import { StatusCodes } from "http-status-codes";
import { 
    bodyToUser,
    bodyToStore, 
    bodyToReview, 
    bodyToMission
} from "../dtos/user.dto.js";
import { 
    userSignUp,
    storeToArea,
    reviewToStore,
    missionToStore,
    missionAccept
} from "../services/user.service.js";

export const handleUserSignUp = async (req, res, next) => {
    /*
    #swagger.summary = '회원 가입 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              email: { type: "string" },
              name: { type: "string" },
              gender: { type: "string" },
              birth: { type: "string", format: "date" },
              address: { type: "string" },
              detailAddress: { type: "string" },
              phoneNumber: { type: "string" },
              preferences: { type: "array", items: { type: "number" } }
            }
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: "회원 가입 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  email: { type: "string" },
                  name: { type: "string" },
                  preferCategory: { type: "array", items: { type: "string" } }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "회원 가입 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "U001" },
                  reason: { type: "string" },
                  data: { type: "object" }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
  */
    console.log("회원가입을 요청했습니다");
    console.log("body:", req.body);//값이 잘 들어오나 확인 용도
    
    const user = await userSignUp(bodyToUser(req.body));
    
    res.status(StatusCodes.OK).success(user);
};

export const handleStoreAdd = async (req, res, next) => {
    /*
    #swagger.summary = '상점 추가 API';
    #swagger.requestBody = {
        required: true,
        content: {
        "application/json": {
            schema: {
                type: "object",
                properties: {
                id: {type: "string"},
                region_id: {type: "string"},
                name: {type: "string"},
                address: {type: "string"},
                }
            }
        }
        }    
    };
    #swagger.responses[200] = {
        description: "상점 추가 성공 응답",
        content: {
        "application/json": {
            schema: {
                type: "object",
                properties: {
                    resultType: {type: "string", example: "SUCCESS"},
                    error: {type: "object", nullable: true, example: null},
                    success: {
                        type: "object",
                        description: "성공 데이터",
                        properties: {
                            region_id: {type: "string"},
                            name: {type: "string"}
                        }
                    }
                }
            }
            }
        }
    };

    #swagger.responses[404] = {
        description: "지역 정보를 찾을 수 없음으로 인한 에러",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        resultType: { type: "string", description: "결과 유형", example: "ERROR" },
                        error: {
                            type: "object",
                            description: "에러 상세 정보",
                            properties: {
                                errorCode: { type: "string", description: "에러 코드", example: "S001" },
                                message: { type: "string", description: "에러 메시지", example: "Region not found" },
                                data: { 
                                    type: "object", 
                                    description: "요청 데이터",
                                    example: { 
                                        id: "string", 
                                        region_id: "invalid-region", 
                                        name: "string", 
                                        address: "string"
                                    }
                                }
                            }
                        },
                        success: { type: "null", description: "성공 데이터는 없음", example: null }
                    }
                }
            }
        }
    };
    */
try{
    console.log("가게추가를 요청했습니다");
    console.log("controller body: ", req.body);

    const newStore = await storeToArea(bodyToStore(req.body));

    res.status(StatusCodes.OK).success(newStore);
}
catch (error) {
    next(error);
}
};

export const handleReviewAdd = async (req, res, next) => {
  /* 
    #swagger.summary = '가게 리뷰 추가 API';
    #swagger.requestBody = { 
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              id: { type: "string", description: "리뷰 ID"},
              store_id: { type: "string", description: "상점 ID"},
              name: { type: "string", description: "리뷰 작성자 이름"},
              text: { type: "string", description: "리뷰 내용"}
            }
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: "리뷰 추가 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              name: { type: "string"},
              text: { type: "string"}
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "리뷰 추가 실패 응답 - 잘못된 요청",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "R001" },
                  reason: { type: "string", example: "존재하는 상점이 아닙니다." },
                  data: { type: "object", nullable: true }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
    #swagger.responses[500] = {
      description: "리뷰 추가 실패 응답 - 서버 오류",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "E500" },
                  reason: { type: "string", example: "서버 오류가 발생했습니다." },
                  data: { type: "object", nullable: true }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
*/

    console.log("가게 리뷰 추가하기를 요청했습니다.");
    console.log("body: ", req.body);

    const newReview = await reviewToStore(bodyToReview(req.body));

    res.status(StatusCodes.OK).success(newReview);
};

export const handleNewMission = async (req, res, next) => {
    console.log("미션추가를 요청했습니다");
    console.log("body: ", req.body);

    const newMission = await missionToStore(bodyToMission(req.body));

    res.status(StatusCodes.OK).success(newMission);
};

export const handleMissionAccept = async (req, res, next) => {
    console.log("미션수락을 요청했습니다.");
    console.log("body: ", req.body);

    const missionAcception = await missionAccept(req.body);
  
    res.status(StatusCodes.OK).success(missionAcception);
};