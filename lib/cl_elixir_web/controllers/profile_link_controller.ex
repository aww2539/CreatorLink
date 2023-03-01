defmodule ClElixirWeb.ProfileLinkController do
  use ClElixirWeb, :controller

  alias ClElixir.Profiles.ProfileLink
  alias ClElixir.ProfileLinks

  def index(conn, params) do
    params
    |> ProfileLinks.index()
    |> json_as_camel_case(conn)
  end

  def update(conn, params) do
    params
    |> ProfileLinks.update()
    |> json_as_camel_case(conn)
  end

  def get_links_by_profile(conn, params) do
    params
    |> ProfileLinks.list_by_profile()
    |> json_as_camel_case(conn)
  end

  def create_link(conn, params) do
    params
    |> ProfileLinks.create_link()
    |> json_as_camel_case(conn)
  end

  def delete_link(conn, params) do
    params
    |> ProfileLinks.delete_link()
    |> json_as_camel_case(conn)
  end

  def reorder_link(conn, params) do
    params
    |> ProfileLinks.reorder()
    |> json_as_camel_case(conn)
  end

  def add_click(conn, params) do
    params
    |> ProfileLinks.add_click()
    |> json_as_camel_case(conn)
  end

end
