defmodule ClElixir.Follows do

  import Ecto.Query

  alias ClElixir.Follows.Follow
  alias ClElixir.Repo

  def get_follows(params) do
    user_id = params["user_id"]

    Follow.with_assocs()
    |> where(follow_id: ^user_id)
    |> Repo.all()
  end

  def get_followers(params) do
    user_id = params["user_id"]

    Follow.with_assocs()
    |> where(follower_id: ^user_id)
    |> Repo.all()
  end

  def follow_user(params) do
    params
    |> Follow.changeset()
    |> Repo.insert()
  end

  def unfollow_user(params) do
    id = params["id"]

    Follow
    |> Repo.get(id)
    |> Repo.delete()
  end
end
