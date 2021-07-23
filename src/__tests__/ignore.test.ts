import supertest from "supertest";
import { Digipet, setDigipet } from "../digipet/model";
import app from "../server";

/**
 * This file has integration tests for feeding a digipet.
 *
 * It is intended to test two behaviours:
 *  1. feeding a digipet leads to increasing nutrition
 *  2. feeding a digipet leads to decreasing discipline
 */

describe ("When a user ignores a digipet repeatedly, its discipline decreases by 10 each time until it eventually floors out at 0", () => {
  beforeAll(() => {
    // setup: give an initial digipet
    const startingDigipet: Digipet = {
      happiness: 50,
      nutrition: 50,
      discipline: 50,
    };
    setDigipet(startingDigipet);
  });

  test("GET /digipet informs them that they have a digipet with expected stats", async () => {
    const response = await supertest(app).get("/digipet");
    expect(response.body.message).toMatch(/your digipet/i);
    expect(response.body.digipet).toHaveProperty("discipline", 50);
  });

  test("1st GET /digipet/feed informs them about the feed and shows decreased discipline for digipet", async () => {
    const response = await supertest(app).get("/digipet/ignore");
    expect(response.body.digipet).toHaveProperty("discipline", 40);
    expect(response.body.digipet).toHaveProperty("happiness", 40);
    expect(response.body.digipet).toHaveProperty("nutrition", 40);
  });

  test("2nd GET /digipet/feed shows continued stats change", async () => {
    const response = await supertest(app).get("/digipet/ignore");
    expect(response.body.digipet).toHaveProperty("discipline", 30);
  });

  test("3rd GET /digipet/feed shows discipline hitting a floor of 0", async () => {
    const response = await supertest(app).get("/digipet/ignore");
    expect(response.body.digipet).toHaveProperty("discipline", 20);
  });

  test("4th GET /digipet/feed shows no further decrease in discipline", async () => {
    const response = await supertest(app).get("/digipet/ignore");
    expect(response.body.digipet).toHaveProperty("discipline", 10);
  });
});
