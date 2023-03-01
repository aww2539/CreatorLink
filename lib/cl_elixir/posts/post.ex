defmodule ClElixir.Posts.Post do
  use Ecto.Schema

  import Ecto.Changeset
  import Ecto.Query

  alias ClElixir.Users.User

  schema "posts" do
    field :body, :string
    field :inserted_at, :naive_datetime
    field :updated_at, :naive_datetime, default: nil
    belongs_to :user, User
  end

  def with_assocs(query \\ __MODULE__) do
    from(p in query,
      left_join: u in assoc(p, :user),
      select: %{
        id: p.id,
        body: p.body,
        inserted_at: p.inserted_at,
        updated_at: p.updated_at,
        user_id: p.user_id,
        user: %{
          id: u.id,
          username: u.username,
          email: u.email,
          first_name: u.first_name,
          last_name: u.last_name,
        }
      }
    )
  end

  def changeset(data \\ %__MODULE__{}, params) do
    data
    |> cast(params, __schema__(:fields))
  end
end
