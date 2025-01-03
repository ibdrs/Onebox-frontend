class AuthService {
  login(user) {
    return new Promise((resolve, reject) => {

      const mockUsers = [
        { username: "ivan", password: "test123", customerID: 1 },
        { username: "admin", password: "adminpass", customerID: 2 }
      ];


      const foundUser = mockUsers.find(
        (mockUser) => mockUser.username === user.username && mockUser.password === user.password
      );

      if (foundUser) {

        const tokenPayload = {
          username: foundUser.username,
          customerID: foundUser.customerID
        };
        const mockAccessToken = btoa(JSON.stringify(tokenPayload)); // Base64-encoded mock token

        const responseData = {
          accessToken: mockAccessToken,
          data: tokenPayload
        };


        localStorage.setItem("user", JSON.stringify(responseData));
        resolve(responseData);
      } else {

        reject(new Error("Invalid username or password"));
      }
    });
  }

  logout() {
    localStorage.removeItem("user");
  }
}

export default new AuthService();
