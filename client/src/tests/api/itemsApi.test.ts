import { itemsApi } from "../../api";
import { $host } from "../../api";

jest.mock("../../api", () => ({
  $host: {
    post: jest.fn(),
    get: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
}));

describe("Items API", () => {
  const mockItem = {
    id: 1,
    name: "Test Item",
    description: "Test Description",
    location: "Test Location",
    type: "Авто",
    brand: "Toyota",
    model: "Camry",
    year: 2022,
  };

  const signal = new AbortController().signal;

  it("should create an item", async () => {
    ($host.post as jest.Mock).mockResolvedValue({ data: mockItem });

    const response = await itemsApi.createItem(mockItem, signal);
    expect(response).toEqual(mockItem);
    expect($host.post).toHaveBeenCalledWith("/items", mockItem, { signal });
  });

  it("should handle error on createItem", async () => {
    ($host.post as jest.Mock).mockRejectedValue(new Error("Network Error"));
    await expect(itemsApi.createItem(mockItem, signal)).rejects.toThrow(
      "Network Error"
    );
  });

  it("should fetch all items", async () => {
    ($host.get as jest.Mock).mockResolvedValue({ data: [mockItem] });

    const response = await itemsApi.getAllItems(signal);
    expect(response).toEqual([mockItem]);
    expect($host.get).toHaveBeenCalledWith("/items", { signal });
  });

  it("should fetch an item by id", async () => {
    ($host.get as jest.Mock).mockResolvedValue({ data: mockItem });

    const response = await itemsApi.getItem(1, signal);
    expect(response).toEqual(mockItem);
    expect($host.get).toHaveBeenCalledWith("/items/1", { signal });
  });

  it("should update an item", async () => {
    ($host.put as jest.Mock).mockResolvedValue({ data: mockItem });

    const response = await itemsApi.updateItem(
      1,
      { name: "Updated Name" },
      signal
    );
    expect(response).toEqual(mockItem);
    expect($host.put).toHaveBeenCalledWith(
      "/items/1",
      { name: "Updated Name" },
      { signal }
    );
  });

  it("should delete an item", async () => {
    ($host.delete as jest.Mock).mockResolvedValue({ data: undefined });

    const response = await itemsApi.deleteItem(1, signal);
    expect(response).toBeUndefined();
    expect($host.delete).toHaveBeenCalledWith("/items/1", { signal });
  });
});
