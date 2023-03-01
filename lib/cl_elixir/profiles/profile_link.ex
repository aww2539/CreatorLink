defmodule ClElixir.Profiles.ProfileLink do

  use Ecto.Schema

  import Ecto.Changeset
  import Ecto.Query

  alias ClElixir.Users.User
  alias ClElixir.Profiles.Profile

  schema "profile_links" do
    field :name, :string
    field :url, :string
    field :order, :integer
    field :clicks, :integer
    belongs_to :user, User
    belongs_to :profile, Profile
  end

  def with_assocs(query \\ __MODULE__) do
    query
    |> preload([:profile, :user])
    |> select_merge([user: [:first_name, :last_name, :email, :username, :id]])
  end

  def changeset(data \\ %__MODULE__{}, params) do
    data
    |> cast(params, __schema__(:fields))
  end

  def change_order(data, order) do
    data
    |> change(order: order)
  end

  def add_click(data, clicks) do
    data
    |> change(clicks: clicks)
  end
end
