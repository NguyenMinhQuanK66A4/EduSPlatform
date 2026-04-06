import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders EduS landing page headline", () => {
    render(<App />);
    const heading = screen.getByRole("heading", {
        name: /quản lý học tập, thi cử và phân tích/i,
    });
    expect(heading).toBeInTheDocument();
});