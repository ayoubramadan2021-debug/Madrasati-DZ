import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AppButton from "../AppButton";
import { themes } from "../../../../theme";

describe("AppButton", () => {
  it("يعرض النص داخل الزر", () => {
    render(
      <AppButton theme={themes.light}>
        حفظ
      </AppButton>
    );

    expect(screen.getByRole("button", { name: "حفظ" })).toBeInTheDocument();
  });

  it("ينفذ onClick عند الضغط", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(
      <AppButton theme={themes.light} onClick={handleClick}>
        اضغط هنا
      </AppButton>
    );

    await user.click(screen.getByRole("button", { name: "اضغط هنا" }));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
