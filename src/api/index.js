import axios, { AxiosInstance } from "axios";

class FiveChowError extends Error {
  constructor(resp) {
    super();
    this.data = resp.data;
    this.status = resp.status;
  }
}

const Axios = axios.create({
  baseURL: "https://c19325736df1.ngrok.io/api",
  headers: { "Content-Type": "application/json" },
});

class FiveWebApi {
  /**
   *
   * @param {AxiosInstance} api
   */
  constructor(api) {
    this.api = api;
  }

  /**
   *
   * @param {{username: string, password: string}} user
   */

  async logIn(user) {
    let { username, password } = user;
    if (username && password) {
      let resp = await this.api.post("/login", user);

      if (resp.status == 200) {
        return resp.data;
      } else {
        throw new FiveChowError(resp);
      }
    }
  }

  async signUp(user) {
    let { email, password, phone } = user;
    if (email && password) {
      let resp = await this.api.post("/register", {
        email,
        phone_number: phone,
        password,
      });

      if (resp.status == 200) {
        return resp.data;
      } else {
        throw new FiveChowError(resp);
      }
    }
  }

  async logOut(token) {
    if (!token) {
      throw new Error("Token is required");
    }
    let resp = this.api.post(
      "/logout",
      { data: "none" },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    if (resp.status == 200) {
      return resp.data;
    } else {
      throw new FiveChowError(resp);
    }
  }
  async createOrder(
    token,
    delivery_address,
    zip_code,
    delivery_phone_number,
    items
  ) {
    if (!token) {
      throw new Error("Token is required");
    }
    let resp = this.api.post(
      "/orders/create/",
      {
        delivery_address,
        zip_code,
        delivery_phone_number,
        order_items: items,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    if (resp.status == 200) {
      return resp.data;
    } else {
      throw new FiveChowError(resp);
    }
  }

  async foodItemsList(token) {
    let resp = this.api.get("/fooditems", {
      headers: {
        Authorization: token,
      },
    });
    if (resp.status == 200) {
      return resp.data;
    } else {
      throw new FiveChowError(resp);
    }
  }
  async vendorsList(token){


    let resp = this.api.get("/vendors", {
        headers: {
          Authorization: token,
        },
      });


    if (resp.status == 200) {
        return resp.data;
      } else {
        throw new FiveChowError(resp);
      }
  }
}

export default new FiveWebApi(Axios);