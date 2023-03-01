defmodule ClElixir.Follows.Follow do

  use Ecto.Schema

  import Ecto.Changeset
  import Ecto.Query

  alias ClElixir.Users.User

  schema "follows" do
    belongs_to :follow, User
    belongs_to :follower, User
  end

  def with_assocs(query \\ __MODULE__) do
    query
    |> preload([:follow, :follower])
    |> select_merge([
      follow: [:id, :first_name, :last_name, :username],
      follower: [:id, :first_name, :last_name, :username]
      ])
  end

  def changeset(data \\ %__MODULE__{}, params) do
    data
    |> cast(params, __schema__(:fields))
  end
end
