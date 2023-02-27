defmodule ClElixirWeb.UserController do
  use ClElixirWeb, :controller

  alias ClElixir.Users

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

end
