/**
 * @vitest-environment happy-dom
 */

import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import Table from "./index.vue";

const testValues = {
  headers: [
    { label: "foo", value: "id", width: "70px", align: "center" },
    { label: "bar", value: "name" },
  ],
  items: [
    {
      id: 1,
      name: "Lorem ipsum dolor sit amet",
    },
    {
      id: 1,
      name: "Lorem ipsum dolor sit amet",
    },
  ],
};

describe("reusable page table component", () => {
  const wrapper = mount(Table);

  it("should render properly without props", () => {
    expect(wrapper).toBeTruthy();
  });
  it("should render header list", async () => {
    const list = testValues.headers;
    await wrapper.setProps({ headers: list });

    list.forEach((l) => {
      expect(wrapper.html()).toContain(l.label);
    });
  });
  it("should render item list", async () => {
    const list = testValues.items;
    await wrapper.setProps({ items: list });

    list.forEach((l) => {
      expect(wrapper.html()).toContain(l.id);
      expect(wrapper.html()).toContain(l.name);
    });
  });
});
