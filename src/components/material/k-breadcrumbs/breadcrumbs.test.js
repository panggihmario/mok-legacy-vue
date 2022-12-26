/**
 * @vitest-environment happy-dom
 */

import { describe, it, expect } from "vitest";
import Breadcrumbs from "./index.vue";
import { mount } from "@vue/test-utils";

const testValues = {
  list: [{ name: "foo" }],
};

describe("reusable breadcrumbs component", () => {
  const wrapper = mount(Breadcrumbs);

  it("should render properly", () => {
    expect(wrapper).toBeTruthy();
  });
  it("should have props", async () => {
    await wrapper.setProps({ list: testValues.list });
    testValues.list.map((li) => {
      expect(wrapper.html()).toContain(li.name);
    });
  });
});
