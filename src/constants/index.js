import defaultAvatar from "../assets/avatar.png";
import { v4 as uuid } from "uuid";
import res0 from "../assets/res0.jpg";
import res1 from "../assets/res1.jpg";
import res2 from "../assets/res2.jpg";
import res3 from "../assets/res3.jpg";
import res4 from "../assets/res4.jpg";
import res5 from "../assets/res5.jpg";
import res6 from "../assets/res6.jpg";
import res7 from "../assets/res7.jpg";
import res8 from "../assets/res8.jpg";
import hamburger from "../assets/hamburger.jpg";
import bread from "../assets/bread.jpg";
import meat from "../assets/meat.jpg";
const pics = {
  foods: {hamburger, bread, meat},
  resturants: [res0, res1, res2, res3, res4, res5, res6, res7, res8],
};

export class Food {
  constructor(name,price, picture, id, resturant_id) {
    this.name = name;
    this.price = price
    this.picture = picture
    this.id = id;
    this.resturant_id = resturant_id;
  }

  toString() {
    return (
      "name: " +
      this.name +
      " id: " +
      this.id +
      " resturant_id: " +
      this.resturant_id
    );
  }
}

export class Resturant {
  constructor(name, id, picture) {
    this.name = name;
    this.id = id;
    this.picture = picture;
    this.foods = [new Food("Hamburger",700,  pics.foods.hamburger, uuid()+ 1, this.id),

    new Food("Bread",300, pics.foods.bread, uuid()+ 12, this.id),

    new Food("Meat",700, pics.foods.meat, uuid()+ 14, this.id)
]
  }

  toString() {
    return "name: " + this.name + " id: " + this.id;
  }
}

export class User {
  constructor(username, id, avatar, email, phoneNumber) {
    this.username = username;

    this.id = id;

    this.avatar = avatar;
    this.email = email || "noemail";
    this.phoneNumber = phoneNumber || "nophone";
  }

  toString() {
    return JSON.stringify(this);
  }

  static defaultUser() {
    return new User(
      'John Snow',
      uuid(),
      defaultAvatar,
      "john@snow.com",
      "08007079504"
    );
  }
}




export function removeDuplicates(array) {
if(!array.length) return [];

let newArray  = []
let isThere = {}
for (let item of array) {
if(!isThere[item.id]) {
isThere[item.id] = true;

newArray.push(item)
}

}
return newArray
}


export function getTotal(array){
return array.reduce((count, value)=> {

return count+ value.price
}, 0)

}



export function makeDefaultResturants() {
  const resturants = [
    "Ntachi Osa",
    "Dolphin Restaurant",
    "Sochis Kitchen And Bridals",
    "Auntie May's kitchen",
    "Octopus",
    "Discovery kitchen",
    "Sahara Restaurant Labanese",
    "Roots Restaurant & Cafe",
    "Crunchies Fried Chicken",
    "Emily Restaurant",
    "The Native Pot",
    "Feel at home restaurant",
    "De-Trendy Restaurant",
    "Livingbrook Restaurant",
  ];

  return resturants.map((resturant, i) => {
    return new Resturant(
      resturant,
      uuid(),
      pics.resturants[i % pics.resturants.length]
    );
  });
}
