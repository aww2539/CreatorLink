defmodule ClElixir.Profiles do

  import Ecto.Query

  alias ClElixir.Profiles.Profile
  alias ClElixir.Repo

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

end
