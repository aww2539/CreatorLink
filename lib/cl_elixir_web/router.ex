defmodule ClElixirWeb.Router do
  use ClElixirWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
    plug ClElixirWeb.Plugs.SnakeCaseParams
  end

  scope "/api", ClElixirWeb do
    pipe_through :api

    scope "/users" do
      post("/login", UserController, :login)
      post("/create_user", UserController, :create_user)
      get("/:id", UserController, :index)
    end

    scope "/posts" do
      get("/", PostController, :list)
      get("/:id", PostController, :index)
      post("/", PostController, :create_post)
      delete("/delete/:id", PostController, :delete_post)
      put("/update/:id", PostController, :update_post)
    end

    scope "/profiles" do
      get("/:id", ProfileController, :index)
      get("/", ProfileController, :list)
      put("/update/:id", ProfileController, :update)
    end

    scope "/profile_links" do
      get("/:id", ProfileLinkController, :index)
      put("/update/:id", ProfileLinkController, :update)
      post("/", ProfileLinkController, :create_link)
      delete("/:id", ProfileLinkController, :delete_link)
      get("/profile/:profile_id", ProfileLinkController, :get_links_by_profile)
      put("/:id/move/:direction", ProfileLinkController, :reorder_link)
      put("/:id/add_click", ProfileLinkController, :add_click)
    end

    scope "/follows" do
      get("/user_follows/:user_id", FollowController, :get_follows)
      get("/user_followers/:user_id", FollowController, :get_followers)
      post("/follow", FollowController, :follow_user)
      delete("/delete/:id", FollowController, :unfollow_user)
      get("/follow_check/:profile_id", FollowController, :follow_check)
    end

  end
end
