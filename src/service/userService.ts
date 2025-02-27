export const userService = {
  async getUsers() {
    // 실제로는 API 호출을 하겠지만, 예시를 위해 목업 데이터 사용
    return new Promise(resolve =>
      setTimeout(() => resolve([
        { id: 1, name: "Kim", email: "kim@example.com" },
        { id: 2, name: "Lee", email: "lee@example.com" },
        { id: 3, name: "Park", email: "park@example.com" },
      ]), 500)
    );
  },

  async getUser(id) {
    return new Promise(resolve =>
      setTimeout(() => resolve(
        { id: Number(id), name: id === "1" ? "Kim" : "Lee", email: id === "1" ? "kim@example.com" : "lee@example.com" }
      ), 300)
    );
  },

  async createUser(userData) {
    return new Promise(resolve =>
      setTimeout(() => resolve(
        { id: Math.floor(Math.random() * 1000), ...userData }
      ), 300)
    );
  }
};
