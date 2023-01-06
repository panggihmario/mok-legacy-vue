/**
 * @vitest-environment happy-dom
 */

import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import Table from "./index.vue";

const testValues = {
  headerList: [
    { label: "foo", width: "70px", align: "center" },
    { label: "bar" },
  ],
  itemList: [
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

describe("reusable page title component", () => {
  const wrapper = mount(Table);

  it("should render properly without props", () => {
    expect(wrapper).toBeTruthy();
  });
  it("should render header list", async () => {
    const list = testValues.headerList;
    await wrapper.setProps({ headerList: list });

    list.forEach((l) => {
      expect(wrapper.html()).toContain(l.label);
    });
  });
  it("should render item list", async () => {
    const list = testValues.itemList;
    await wrapper.setProps({ itemList: list });

    list.forEach((l) => {
      expect(wrapper.html()).toContain(l.id);
      expect(wrapper.html()).toContain(l.name);
    });
  });
});
