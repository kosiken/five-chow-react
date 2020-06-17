import React from "react";
import { render, cleanup } from "@testing-library/react";
import Food from "./Food";
import store from "../store";
import { Provider } from "react-redux";
const FoodProps = {
  food: {
    name: "Bread",
    price: 500,
    picture: "image.jpg",
    id: "2344",
    resturant_id: "123",
    resturantName: "Emily Restaurant",
  },
};

const MyComp = () => (
  <Provider store={store}>
    <Food food={FoodProps.food} />
  </Provider>
);

describe("Food", () => {
  afterEach(cleanup);
  it("displays food names", () => {
    const { getAllByText } = render(<MyComp />);
    const element = getAllByText("Bread");
    expect(element.length).toBe(2);
  });
  it("displays food price", () => {
    const { getAllByText } = render(<MyComp />);
    const element = getAllByText("N500");
    expect(element.length).toBe(2);
  });

  it("displays resturnat name", () => {
    const { getByText } = render(<MyComp />);
    const element = getByText("Emily Restaurant");
    expect(element).toBeInTheDocument();
  });
});
