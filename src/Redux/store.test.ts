// import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import appointmentReducer from "./appointmentslice";
import { store } from "./store";


beforeAll(() => {
  Storage.prototype.getItem = jest.fn(() => "test_patient");
});

jest.mock("redux-persist", () => ({
  ...jest.requireActual("redux-persist"),
  persistReducer: jest.fn((config, reducer) => reducer),
  persistStore: jest.fn(),
}));

describe("Redux Store", () => {
  it("should initialize the store correctly", () => {
    const state = store.getState();
    expect(state).toHaveProperty("appointment");
  });

  it("should apply persist configuration correctly", () => {
    expect(persistReducer).toHaveBeenCalledWith(
      expect.objectContaining({ key: expect.stringMatching(/appointments_.+/), storage }),
      appointmentReducer
    );
  });

  it("should dispatch an action and update state", () => {
    store.dispatch({ type: "appointment/add", payload: { id: 1, name: "Checkup" } });
  });
});
