defmodule ClElixir.Users.User do

  use Ecto.Schema

  import Ecto.Changeset

  alias ClElixir.Posts.Post
  alias ClElixir.Profiles.Profile

  schema "users" do
    field :email, :string
    field :username, :string
    field :first_name, :string
    field :last_name, :string
    field :password, :string

    has_many :posts, Post, foreign_key: :user_id
    has_one :profile, Profile, foreign_key: :user_id
  end

  def changeset(data \\ %__MODULE__{}, params) do
    data
    |> cast(params, __schema__(:fields))
  end
end
