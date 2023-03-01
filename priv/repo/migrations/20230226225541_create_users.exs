defmodule ClElixir.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :email, :string
      add :username, :string
      add :password, :string
      add :first_name, :string
      add :last_name, :string
    end

    create index(:users, [:username], unique: true)
    create index(:users, [:email], unique: true)
  end
end
