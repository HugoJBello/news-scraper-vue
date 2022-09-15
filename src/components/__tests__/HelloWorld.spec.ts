import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import SourceMenu from "../../components/SourceMenu.vue";

describe("HelloWorld", () => {
  it("renders properly", () => {
    const wrapper = mount(SourceMenu, { props: { msg: "Hello Vitest" } });
    expect(wrapper.text()).toContain("Hello Vitest");
  });
});
