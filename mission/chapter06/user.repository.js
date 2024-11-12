import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
// user 데이터 삽입
export const addUser = async (data) => {
    try {
        const existingUser = await prisma.user.findUnique({
            where: { email: data.email }
        });

        if (existingUser) {
            return null; // 이미 존재하는 이메일
        }

        const newUser = await prisma.user.create({
            data: {
                id: data.id,
                email: data.email,
                name: data.name,
                gender: data.gender,
                age: data.age,
                address: data.address,
                address2: data.address2,
                created_at: new Date(),
                updated_at: new Date(),
            }
        });

        return newUser.id;
    } catch (err) {
        throw new Error(`오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`);
    }
};



// 사용자 정보 열기
export const getUser = async (userId) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId }
        });

        if (!user) {
            return null;
        }

        return user;
    } catch (err) {
        throw new Error(`오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`);
    }
};


// 음식 선호 카테고리 매핑
export const setPreference = async (userId, foodCategoryId) => {
    try {
        await prisma.memberPrefer.create({
            data: {
                member_id: userId,
                category_id: foodCategoryId,
                created_at: new Date(),
                updated_at: new Date(),
            }
        });
    } catch (err) {
        throw new Error(`오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`);
    }
};


// 사용자 선호 카테고리 반환
export const getUserPreferencesByUserId = async (userId) => {
    try {
        const preferences = await prisma.memberPrefer.findMany({
            where: { member_id: userId },
            include: {
                FoodCategory: true, // 외래 키로 연결된 food_category 데이터 포함
            },
            orderBy: { category_id: 'asc' },
        });

        return preferences;
    } catch (err) {
        throw new Error(`오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`);
    }
};


// 가게 데이터 추가
export const addStore = async (data) => {
    try {
        const newStore = await prisma.store.create({
            data: {
                id: data.id,
                region_id: data.region_id,
                name: data.name,
                address: data.address,
                created_at: new Date(),
                updated_at: new Date(),
            }
        });

        return newStore.id;
    } catch (err) {
        throw new Error(`오류가 발생했습니다. 요청 파라미터를 확인해주세요. (${err})`);
    }
};


// 리뷰 데이터 추가
export const addReview = async (data) => {
    try {
        const newReview = await prisma.review.create({
            data: {
                id: data.id,
                store_id: data.store_id,
                name: data.name,
                text: data.text,
                created_at: new Date(),
                updated_at: new Date(),
            }
        });

        return newReview.id;
    } catch (err) {
        throw new Error(`오류가 발생했습니다. 요청 파라미터를 확인해주세요. (${err})`);
    }
};


// 미션 데이터 추가
export const addMission = async (data) => {
    try {
        const newMission = await prisma.mission.create({
            data: {
                id: data.id,
                store_id: data.store_id,
                mission_text: data.mission_text,
                reward: data.reward,
                created_at: new Date(),
                updated_at: new Date(),
            }
        });

        return newMission.id;
    } catch (err) {
        throw new Error(`오류가 발생했습니다. 요청 파라미터를 확인해주세요. (${err})`);
    }
};


// 미션 수락
export const acceptMission = async (data) => {
    try {
        const existingMission = await prisma.mission.findUnique({
            where: { id: data.mission_id }
        });

        if (!existingMission) {
            return null;
        }

        const newMemberMission = await prisma.memberMission.create({
            data: {
                id: data.id,
                member_id: data.member_id,
                mission_id: data.mission_id,
                status: data.status,
                created_at: new Date(),
                updated_at: new Date(),
            }
        });

        return newMemberMission.id;
    } catch (err) {
        throw new Error(`오류가 발생했습니다. 요청 파라미터를 확인해주세요. (${err})`);
    }
};

