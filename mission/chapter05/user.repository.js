import { pool } from '../db.config.js';

// user 데이터 삽입
export const addUser = async (data) => {
    const conn = await pool.getConnection();

    try {
        const [confirm] = await conn.query(
            `SELECT EXISTS(SELECT 1 FROM user WHERE email = ?) AS isExistEmail;`,
            [data.email]
        );

        if (confirm[0].isExistEmail) {
            return null;
        }

        const [result] = await conn.query(
            `INSERT INTO user (id, email, name, gender, age, address, address2) VALUES (?, ?, ?, ?, ?, ?, ?);`,
            [   
                data.id,
                data.email,
                data.name,
                data.gender,
                data.age,
                data.address,
                data.address2,
            ]
        );

        return result.insertId;
    } catch (err) {
        throw new Error(`오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`);
    } finally {
        conn.release();
    }
};

// 사용자 정보 열기
export const getUser = async (userId) => {
    const conn = await pool.getConnection();

    try {
        const [user] = await conn.query(`SELECT * FROM user WHERE id = ?;`, [userId]);

        if (user.length == 0) {
            return null;
        }

        return user;
    } catch (err) {
        throw new Error(`오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`);
    } finally {
        conn.release();
    }
};

// 음식 선호 카테고리 매핑
export const setPreference = async (userId, foodCategoryId) => {
    const conn = await pool.getConnection();

    try {
        await conn.query(
            `INSERT INTO member_prefer (category_id, member_id) VALUES (?, ?);`,
            [foodCategoryId, userId]
        );

        return;
    } catch (err) {
        throw new Error(`오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`);
    } finally {
        conn.release();
    }
};

// 사용자 선호 카테고리 반환
export const getUserPreferencesByUserId = async (userId) => {
    const conn = await pool.getConnection();

    try {
        const [preference] = await conn.query(
            "SELECT mp.id, mp.category_id, mp.member_id, fcl.name " +
            "FROM member_prefer AS mp JOIN food_category fcl on mp.category_id = fcl.id " +
            "WHERE mp.member_id = ? ORDER BY mp.category_id ASC;",
            [userId]
        );

        return preference;
    } catch (err) {
        throw new Error(`오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`);
    } finally {
        conn.release();
    }
};

// 가게 데이터 추가
export const addStore = async (data) => {
    const conn = await pool.getConnection();
    try {
        const [store] = await conn.query(
            `INSERT INTO store (id, region_id, name, address) VALUES (?,?,?,?);`,
            [
                data.id,
                data.region_id,
                data.name,
                data.address
            ]
        );

        return store.insertId;
    } catch (err) {
        throw new Error(`오류가 발생했습니다. 요청 파라미터를 확인해주세요. (${err})`);
    } finally {
        conn.release();
    }
};

// 리뷰 데이터 추가
export const addReview = async (data) => {
    const conn = await pool.getConnection();

    try {
        const [review] = await conn.query(
            `INSERT INTO review (id, store_id, name, text) VALUES (?, ?, ?, ?);`,
            [
                data.id,
                data.store_id,
                data.name,
                data.text
            ]
        );

        return review.insertId;
    } catch (err) {
        throw new Error(`오류가 발생했습니다. 요청 파라미터를 확인해주세요. (${err})`);
    } finally {
        conn.release();
    }
};

// 미션 데이터 추가
export const addMission = async (data) => {
    const conn = await pool.getConnection();

    try {
        const [mission] = await conn.query(
            `INSERT INTO mission (id, store_id, mission_text, reward) VALUES (?,?,?,?);`,
            [
                data.id,
                data.store_id,
                data.mission_text,
                data.reward
            ]
        );

        return mission.insertId;
    } catch (err) {
        throw new Error(`오류가 발생했습니다. 요청 파라미터를 확인해주세요. (${err})`);
    } finally {
        conn.release();
    }
};

// 미션 수락
export const acceptMission = async (data) => {
    const conn = await pool.getConnection();

    try {
        const [confirm] = await conn.query(
            `SELECT EXISTS(SELECT 1 FROM mission WHERE id = ?) as isExistMission;`,
            [data.mission_id]
        );

        if (!confirm[0].isExistMission) {
            return null;
        }

        const [accept] = await conn.query(
            `INSERT INTO member_mission (id,member_id, mission_id, status) VALUES (?,?, ?, ?);`,
            [data.id, data.member_id, data.mission_id, data.status]
        );

        return accept.insertId;
    } catch (err) {
        throw new Error(`오류가 발생했습니다. 요청 파라미터를 확인해주세요. (${err})`);
    } finally {
        conn.release();
    }
};
