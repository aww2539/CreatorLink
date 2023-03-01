defmodule ClElixirWeb.PostController do
  use ClElixirWeb, :controller

  import Ecto.Query

  alias ClElixir.Repo
  alias ClElixir.Posts

  def index(conn, params) do
    params
    |> Posts.index()
    |> json_as_camel_case(conn)
  end

  def list(conn, _params) do
    Posts.list()
    |> json_as_camel_case(conn)
  end

  def create_post(conn, params) do
    params
    |> Posts.create_post()
    |> json_as_camel_case(conn)
  end

  def delete_post(conn, params) do
    params
    |> Posts.delete_post()
    |> json_as_camel_case(conn)
  end

  def update_post(conn, params) do
    IO.inspect(params)

    params
    |> Posts.update_post()
    |> json_as_camel_case(conn)
  end
end
