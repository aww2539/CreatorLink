defmodule ClElixirWeb.Router do
  use ClElixirWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
    plug ClElixirWeb.Plugs.SnakeCaseParams
  end

  scope "/api", ClElixirWeb do
    pipe_through :api

    scope "/users" do
      post("/create_user", UserController, :create_user)
      get("/:id", UserController, :index)
    end
  end
end
