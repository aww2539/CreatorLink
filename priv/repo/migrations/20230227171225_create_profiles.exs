defmodule ClElixir.Repo.Migrations.CreateProfiles do
  use Ecto.Migration

  def change do
    create table(:profiles) do
      add :bio, :string
      add :views, :integer
      add :user_id, references(:users)
    end

    create table(:profile_links) do
      add :name, :string
      add :url, :string
      add :order, :integer
      add :clicks, :integer
      add :user_id, references(:users)
      add :profile_id, references(:profiles)
    end

    create index(:profiles, [:user_id], unique: true)
  end
end
