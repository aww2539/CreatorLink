defmodule ClElixirWeb.ProfileController do
  use ClElixirWeb, :controller

  alias ClElixir.Profiles

  def index(conn, params) do
    params
    |> Profiles.index()
    |> json_as_camel_case(conn)
  end

  def update(conn, params) do
    params
    |> Profiles.update()
    |> json_as_camel_case(conn)
  end

  def list(conn, _params) do
    Profiles.list()
    |> json_as_camel_case(conn)
  end
end
