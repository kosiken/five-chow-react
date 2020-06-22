import axios from "axios";

import {Food, Resturant} from '../constants'



function   goodResponse(resp) {
  console.log(resp)
  let val = resp.status === 200 || resp.status === 201
  return val
  }



class FiveChowError extends Error {
  constructor(resp) {
    super();
    this.data = resp.data;
    this.status = resp.status;
  }
}

const Axios = axios.create({
  baseURL: "https://fivechow.herokuapp.com/api/",
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
      console.log(user)
    let { username, password } = user;
    if (username && password) {

      let resp = await this.api.post("/login/", user);

      if (goodResponse(resp)) {
        return resp.data;
      } else {
        throw new FiveChowError(resp);
      }
    }
  }

  async signUp(user) {
    let { email, password, phone } = user;
    if (email && password) {
      let resp = await this.api.post("/register/", {
        email,
        phone_number: '+234'+ phone,
        password,
      });

      if (resp.status === 200 || resp.status === 201) {
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
      "/logout/",
      { data: "none" },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );


      return resp.data;
  
  }
  async createOrder(
    token,
   order
  ) {
    if (!token) {
      throw new Error("Token is required");
    }
    let resp = await this.api.post(
      "/orders/create/",
     order,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );

    if (goodResponse(resp)) {
      return resp.data;
    } else {
      throw new FiveChowError(resp);
    }
  }

  async foodItemsList() {
    let resp = await this.api.get("/fooditems/");
    if (goodResponse(resp)) {
      let {data} = resp;
      
      data = data.map((f, index)=> {
      
      
      return new Food(f.name,
      f.unit_price, null, f.id, f.vendor.public_id, index, f.vendor.name)})
      
      return data
    } else {
    console.log( resp, 'here2')
      throw new FiveChowError(resp);
    }
  }
  async vendorsList( ){


    let resp =await this.api.get("/vendors/");


    if (goodResponse(resp)) {
        let {data} = resp;
        
        data = data.map((r, index) => new Resturant(r.name, r.public_id, null, r.location, index))
        return data;
      } else {
        throw new FiveChowError(resp);
      }
  }
  
async getOrder(token, id) {
  let resp =await this.api.get("/orders/"+id, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  if (goodResponse(resp)) {
    return resp.data;
  } else {
    throw new FiveChowError(resp);
  }
}

async getOrders(token) {
  let resp =await this.api.get("/orderslist/", {
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  if (goodResponse(resp)) {
    return resp.data;
  } else {
    throw new FiveChowError(resp);
  }
}
}

export default new FiveWebApi(Axios);
