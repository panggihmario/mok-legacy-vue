/**
 * @vitest-environment happy-dom
 */

import { describe, it, expect } from "vitest";
import Pagination from "./index.vue";
import { mount } from "@vue/test-utils";

const testValues = {
  page: 1,
  maxLength: 10,
};

describe("reusable pagination component", () => {
  const wrapper = mount(Pagination);

  it("should render properly", () => {
    expect(wrapper).toBeTruthy();
  });
  it("should have props", async () => {
    await wrapper.setProps({ page: testValues.page });
    await wrapper.setProps({ maxLength: testValues.maxLength });
    expect(wrapper.html()).toContain(testValues.page);
    expect(wrapper.html()).toContain(testValues.maxLength);
  });
});
