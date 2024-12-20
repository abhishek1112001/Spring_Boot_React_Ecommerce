import axios from "axios";

class UserService {
  static BASE_URL = "http://localhost:1010";

  static async login(email, password) {
    try {
      const response = await axios.post(`${UserService.BASE_URL}/auth/login`, {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async register(userData, token) {
    try {
      const response = await axios.post(
        `${UserService.BASE_URL}/auth/register`,
        userData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getAllUsers(token) {
    try {
      const response = await axios.get(
        `${UserService.BASE_URL}/admin/get-all-users`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response;
    } catch (error) {
      console.error("Error fetching users:", error.response || error.message);
      throw error;
    }
  }

  static async getYourProfile(token) {
    try {
      const response = await axios.get(
        `${UserService.BASE_URL}/adminuser/get-profile`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async getUserById(userId, token) {
    try {
      const response = await axios.get(
        `${UserService.BASE_URL}/admin/get-users/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async deleteUser(userId, token) {
    try {
      const response = await axios.delete(
        `${UserService.BASE_URL}/admin/delete/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async updateUser(userId, userData, token) {
    try {
      const response = await axios.put(
        `${UserService.BASE_URL}/admin/update/${userId}`,
        userData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async addImage(userData, token) {
    try {
      const response = await axios.post(
        `${UserService.BASE_URL}/admin/uploadBookImage`,
        userData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async addBook(userData, token) {
    try {
      const response = await axios.post(
        `${UserService.BASE_URL}/admin/book/addBook`,
        userData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getAllBooks(token) {
    try {
      const response = await axios.get(
        `${UserService.BASE_URL}/adminuser/get-books`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  static async getBookById(bookId, token) {
    try {
      const response = await axios.get(
        `${UserService.BASE_URL}/adminuser/get-book/${bookId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async updateBook(bookId, bookData, token) {
    try {
      const response = await axios.put(
        `${UserService.BASE_URL}/admin/book/updateBook/${bookId}`,
        bookData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async deleteBook(bookId, token) {
    try {
      const response = await axios.delete(
        `${UserService.BASE_URL}/admin/book/deleteBook/${bookId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async addCart(cartData, token) {
    try {
      const response = await axios.post(
        `${UserService.BASE_URL}/user/add-to-cart`,
        cartData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getCartItemsUserById(userId, token) {
    try {
      const response = await axios.get(
        `${UserService.BASE_URL}/user/getCart/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async userRegister(userData) {
    try {
      const response = await axios.post(
        `${UserService.BASE_URL}/auth/register-self`,
        userData
      );
      return response.data; // Returning the response data
    } catch (error) {
      console.error("Error registering user:", error);
      throw error; // Rethrow error to be handled in the component
    }
  }

  static async updateUserProfile(userId, userData, token) {
    try {
      const response = await axios.put(
        `${UserService.BASE_URL}/adminuser/update/${userId}`,
        userData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async getUsersByIdForProfile(userId, token) {
    try {
      const response = await axios.get(
        `${UserService.BASE_URL}/adminuser/getUser/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async deleteCartItem(cartId, token) {
    try {
      const response = await axios.delete(
        `${UserService.BASE_URL}/user/deleteCart/${cartId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  /**AUTHENTICATION CHECKER */
  static logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  }

  static isAuthenticated() {
    const token = localStorage.getItem("token");
    return !!token;
  }

  static isAdmin() {
    const role = localStorage.getItem("role");
    return role === "ADMIN";
  }

  static isUser() {
    const role = localStorage.getItem("role");
    return role === "USER";
  }

  static adminOnly() {
    return this.isAuthenticated() && this.isAdmin();
  }
}

export default UserService;
