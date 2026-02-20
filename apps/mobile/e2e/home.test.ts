import { by, device, element, expect } from "detox";

describe("Home Screen", () => {
  beforeAll(async () => {
    await device.launchApp({ newInstance: true });
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it("should display the app title", async () => {
    await expect(element(by.text("Pet Tracker"))).toBeVisible();
  });

  it("should display the subtitle", async () => {
    await expect(element(by.text("Track symptoms and changes in your pet's health"))).toBeVisible();
  });
});
