/**
 * @vitest-environment happy-dom
 */

import { describe, it, expect } from "vitest";
import PageTitle from "./index.vue";
import { mount } from "@vue/test-utils";

const testValues = {
  title: "Title",
  isBreadcrumbs: true,
  listBreadCrumbs: [{ name: "Foo" }, { name: "Bar" }],
};

describe("reusable page title component", () => {
  const wrapper = mount(PageTitle, {
    props: {
      title: testValues.title,
    },
  });

  it("should render properly", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toContain(testValues.title);
  });
  it("should have breadcrumbs", async () => {
    await wrapper.setProps({ isBreadcrumbs: testValues.isBreadcrumbs });
    await wrapper.setProps({ listBreadCrumbs: testValues.listBreadCrumbs });

    const kbread = wrapper.find("k-breadcrumbs");

    expect(kbread.attributes()).toHaveProperty("list");
  });
});
