import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "./App";

const mockedData = [
  {
    name: "grinning face",
    category: "smileys and people",
    group: "face positive",
    htmlCode: ["\u0026#128512;"],
    unicode: ["U+1F600"],
  },
  {
    name: "monkey face",
    category: "animals and nature",
    group: "animal mammal",
    htmlCode: ["\u0026#128053;"],
    unicode: ["U+1F435"],
  },
  {
    name: "grapes",
    category: "food and drink",
    group: "food fruit",
    htmlCode: ["\u0026#127815;"],
    unicode: ["U+1F347"],
  },
  {
    name: "earth globe europe-africa ≊ globe showing europe-africa",
    category: "travel and places",
    group: "travel and places",
    htmlCode: ["\u0026#127757;"],
    unicode: ["U+1F30D"],
  },
  {
    name: "jack-o-lantern",
    category: "activities",
    group: "activities",
    htmlCode: ["\u0026#127875;"],
    unicode: ["U+1F383"],
  },
  {
    name: "speaker with cancellation stroke ≊ speaker off",
    category: "objects",
    group: "objects",
    htmlCode: ["\u0026#128263;"],
    unicode: ["U+1F507"],
  },
  {
    name: "automated teller machine ≊ atm sign",
    category: "symbols",
    group: "symbols",
    htmlCode: ["\u0026#127975;"],
    unicode: ["U+1F3E7"],
  },
  {
    name: "chequered flag",
    category: "flags",
    group: "flags",
    htmlCode: ["\u0026#127937;"],
    unicode: ["U+1F3C1"],
  },
];

beforeEach(() => {
  // Mock the fetch function with the desired response
  global.fetch = jest.fn().mockResolvedValue({
    json: () => Promise.resolve(mockedData),
  }) as jest.Mock;
});

test("renders the app", () => {
  render(<App />);
  const headerElement = screen.getByText(/Emoji Browser/);
  expect(headerElement).toBeInTheDocument();
  const dropdownElement = screen.getByText(/Filter by Category/);
  expect(dropdownElement).toBeInTheDocument();
});

describe("Test category filter dropdown : checks if selected filter matches the data in card", () => {
  it("test for smilyes-and-people", async () => {
    render(<App />);
    const categoryFilter = screen.getByLabelText("Filter by Category:");
    fireEvent.change(categoryFilter, {
      target: { value: "smileys-and-people" },
    });

    await waitFor(() => {
      expect(screen.getByText("grinning face")).toBeInTheDocument();
    });

    const cardName = screen.getByTestId("name-0");
    expect(cardName.textContent).toContain("grinning face");

    const categoryName = screen.getByTestId("category-0");
    expect(categoryName.textContent).toContain("Category : smileys and people");

    const groupName = screen.getByTestId("group-0");
    expect(groupName.textContent).toContain("Group : face positive");
  });

  it("test for animals-and-nature", async () => {
    render(<App />);
    const categoryFilter = screen.getByLabelText("Filter by Category:");
    fireEvent.change(categoryFilter, {
      target: { value: "animals-and-nature" },
    });

    await waitFor(() => {
      expect(screen.getByText("monkey face")).toBeInTheDocument();
    });

    const cardName = screen.getByTestId("name-1");
    expect(cardName.textContent).toContain("monkey face");

    const categoryName = screen.getByTestId("category-1");
    expect(categoryName.textContent).toContain("Category : animals and nature");

    const groupName = screen.getByTestId("group-1");
    expect(groupName.textContent).toContain("Group : animal mammal");
  });

  it("test for food-and-drink", async () => {
    render(<App />);
    const categoryFilter = screen.getByLabelText("Filter by Category:");
    fireEvent.change(categoryFilter, {
      target: { value: "food-and-drink" },
    });

    await waitFor(() => {
      expect(screen.getByText("grapes")).toBeInTheDocument();
    });

    const cardName = screen.getByTestId("name-2");
    expect(cardName.textContent).toContain("grapes");

    const categoryName = screen.getByTestId("category-2");
    expect(categoryName.textContent).toContain("Category : food and drink");

    const groupName = screen.getByTestId("group-2");
    expect(groupName.textContent).toContain("Group : food fruit");
  });

  it("test for travel-and-places", async () => {
    render(<App />);
    const categoryFilter = screen.getByLabelText("Filter by Category:");
    fireEvent.change(categoryFilter, {
      target: { value: "travel-and-places" },
    });

    await waitFor(() => {
      expect(
        screen.getByText(
          "earth globe europe-africa ≊ globe showing europe-africa"
        )
      ).toBeInTheDocument();
    });

    const cardName = screen.getByTestId("name-3");
    expect(cardName.textContent).toContain(
      "earth globe europe-africa ≊ globe showing europe-africa"
    );

    const categoryName = screen.getByTestId("category-3");
    expect(categoryName.textContent).toContain("Category : travel and places");

    const groupName = screen.getByTestId("group-3");
    expect(groupName.textContent).toContain("Group : travel and places");
  });

  it("test for activities", async () => {
    render(<App />);
    const categoryFilter = screen.getByLabelText("Filter by Category:");
    fireEvent.change(categoryFilter, {
      target: { value: "activities" },
    });

    await waitFor(() => {
      expect(screen.getByText("jack-o-lantern")).toBeInTheDocument();
    });

    const cardName = screen.getByTestId("name-4");
    expect(cardName.textContent).toContain("jack-o-lantern");

    const categoryName = screen.getByTestId("category-4");
    expect(categoryName.textContent).toContain("Category : activities");

    const groupName = screen.getByTestId("group-4");
    expect(groupName.textContent).toContain("Group : activities");
  });

  it("test for objects", async () => {
    render(<App />);
    const categoryFilter = screen.getByLabelText("Filter by Category:");
    fireEvent.change(categoryFilter, {
      target: { value: "objects" },
    });

    await waitFor(() => {
      expect(
        screen.getByText("speaker with cancellation stroke ≊ speaker off")
      ).toBeInTheDocument();
    });

    const cardName = screen.getByTestId("name-5");
    expect(cardName.textContent).toContain(
      "speaker with cancellation stroke ≊ speaker off"
    );

    const categoryName = screen.getByTestId("category-5");
    expect(categoryName.textContent).toContain("Category : objects");

    const groupName = screen.getByTestId("group-5");
    expect(groupName.textContent).toContain("Group : objects");
  });

  it("test for symbols", async () => {
    render(<App />);
    const categoryFilter = screen.getByLabelText("Filter by Category:");
    fireEvent.change(categoryFilter, {
      target: { value: "symbols" },
    });

    await waitFor(() => {
      expect(
        screen.getByText("automated teller machine ≊ atm sign")
      ).toBeInTheDocument();
    });

    const cardName = screen.getByTestId("name-6");
    expect(cardName.textContent).toContain(
      "automated teller machine ≊ atm sign"
    );

    const categoryName = screen.getByTestId("category-6");
    expect(categoryName.textContent).toContain("Category : symbols");

    const groupName = screen.getByTestId("group-6");
    expect(groupName.textContent).toContain("Group : symbols");
  });
});
