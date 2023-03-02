defmodule ClElixir.Profiles.Profile do

  use Ecto.Schema

  import Ecto.Changeset
  import Ecto.Query

  alias ClElixir.Users.User
  alias ClElixir.Profiles.ProfileLink

  schema "profiles" do
    field :bio, :string
    field :views, :integer
    belongs_to :user, User
    has_many :profile_links, ProfileLink
  end

  def with_assocs(query \\ __MODULE__) do
    query
    |> preload([:user, profile_links: ^from(pl in ProfileLink, order_by: [asc: pl.order])])
    |> select_merge([user: [:first_name, :last_name, :email, :username, :id]])
  end

  def changeset(data \\ %__MODULE__{}, params) do
    data
    |> cast(params, __schema__(:fields))
  end

  def add_view(data, views) do
    data
    |> change(views: views)
  end
end
