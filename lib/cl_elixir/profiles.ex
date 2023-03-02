defmodule ClElixir.Profiles do

  import Ecto.Query

  alias ClElixir.Profiles.Profile
  alias ClElixir.Repo
  alias Ecto.Multi

  def index(params) do
    id = params["id"]

    Profile.with_assocs()
    |> Repo.get(id)
  end

  def update(params) do
    id = params["id"]

    Profile
    |> Repo.get(id)
    |> Profile.changeset(params)
    |> Repo.update()
  end

  def list do
    Profile.with_assocs()
    |> Repo.all()
  end

  def add_view(params) do
    IO.inspect(params)
    id = params["id"]
    profile = Profile |> Repo.get!(id)
    view_number = profile.views + 1

    Multi.new()
    |> Multi.update(:add_profile_view, Profile.add_view(profile, view_number))
    |> Repo.transaction(to_result?: true)
    |> case do
      {:ok, _} -> {:ok, :success}
      error -> error
    end
  end

end
