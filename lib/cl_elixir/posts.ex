defmodule ClElixir.Posts do

  import Ecto.Query

  alias ClElixir.Repo
  alias ClElixir.Posts.Post
  alias ClElixir.Users.User

  def index(params) do
    id = params["id"]

    Post.with_assocs()
    |> Repo.get(id)
  end

  def list do
    Post.with_assocs()
    |> order_by(desc: :inserted_at)
    |> Repo.all()
  end

  def create_post(params) do
    params = Map.put(params, "inserted_at", NaiveDateTime.truncate(NaiveDateTime.utc_now(), :second))

    params
    |> Post.changeset()
    |> Repo.insert()
  end

  def delete_post(params) do
    id = params["id"]
    post =
      Post
      |> Repo.get!(id)

    Repo.delete(post)
  end


  def update_post(params) do
    params = Map.put(params, "updated_at", NaiveDateTime.truncate(NaiveDateTime.utc_now(), :second))
    id = params["id"]

    Post
    |> Repo.get(id)
    |> Post.changeset(params)
    |> Repo.update()
  end
end
