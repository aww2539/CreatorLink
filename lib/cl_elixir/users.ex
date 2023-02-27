defmodule ClElixir.Users do

  alias ClElixir.Users.User
  alias ClElixir.Repo

  def index(params) do
    id = params["id"]
    User
    |> Repo.get(id)
  end

  def create_user(params) do
    params
    |> User.changeset()
    |> Repo.insert()
  end

end
