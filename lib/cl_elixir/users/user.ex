defmodule ClElixir.Users.User do

  use Ecto.Schema

  import Ecto.Changeset

  schema "users" do
    field :username, :string
    field :email, :string
    field :first_name, :string
    field :last_name, :string
  end

  def changeset(data \\ %__MODULE__{}, params) do
    data
    |> cast(params, __schema__(:fields))
  end
end
