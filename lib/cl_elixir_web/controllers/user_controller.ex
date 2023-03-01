defmodule ClElixirWeb.UserController do
  use ClElixirWeb, :controller

  import Ecto.Query

  alias ClElixir.Repo
  alias ClElixir.Users
  alias ClElixir.Users.User

  def index(conn, params) do
    params
    |> Users.index()
    |> json_as_camel_case(conn)
  end

  def create_user(conn, params) do
    params
    |> Users.create_user()
    |> json_as_camel_case(conn)
  end

  def login(conn, params) do
    email = params["email"]
    password = params["password"]

    User
    |> where([u], u.email == ^email)
    |> where([u], u.password == ^password)
    |> Repo.one()
    |> json_as_camel_case(conn)
  end

end
