defmodule ClElixir.ProfileLinks do

  alias ClElixir.Profiles.ProfileLink
  alias ClElixir.Repo
  alias Ecto.Multi

  def index(params) do
    id = params["id"]

    ProfileLink.with_assocs()
    |> Repo.get(id)
  end

  def list_by_profile(params) do
    profile_id = params["profile_id"]

    ProfileLink.with_assocs()
    |> Repo.get_by(profile_id: profile_id)
  end

  def update(params) do
    id = params["id"]

    ProfileLink
    |> Repo.get(id)
    |> ProfileLink.changeset(params)
    |> Repo.update()
  end

  def create_link(params) do
    params
    |> ProfileLink.changeset()
    |> Repo.insert()
  end

  def delete_link(params) do
    id = params["id"]
    link = ProfileLink |> Repo.get!(id)

    Repo.delete(link)
  end

  def add_click(params) do
    id = params["id"]
    link = ProfileLink |> Repo.get!(id)
    click_number = link.clicks + 1

    Multi.new()
    |> Multi.update(:add_link_click, ProfileLink.add_click(link, click_number))
    |> Repo.transaction(to_result?: true)
    |> case do
      {:ok, _} -> {:ok, :success}
      error -> error
    end
  end

  def reorder(params) do
    direction = params["direction"]

    link = ProfileLink |> Repo.get(params["id"])

    link_above =
      ProfileLink
      |> Repo.get_by([profile_id: link.profile_id, order: link.order - 1])

    link_below =
      ProfileLink
      |> Repo.get_by([profile_id: link.profile_id, order: link.order + 1])

    case direction do
      "up" ->
        Multi.new()
        |> Multi.update(:move_desired_link, ProfileLink.change_order(link, link_above.order))
        |> Multi.update(:move_affected_link, ProfileLink.change_order(link_above, link.order))

      "down" ->
        Multi.new()
        |> Multi.update(:move_desired_link, ProfileLink.change_order(link, link_below.order))
        |> Multi.update(:move_affected_link, ProfileLink.change_order(link_below, link.order))
    end
    |> Repo.transaction(to_result?: true)
    |> case do
      {:ok, _} -> {:ok, nil}
      error -> error
    end
  end

end
