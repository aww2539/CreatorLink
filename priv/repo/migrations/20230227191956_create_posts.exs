defmodule ClElixir.Repo.Migrations.CreatePosts do
  use Ecto.Migration

  def change do
    create table(:posts) do
      add :body, :string
      add :user_id, references(:users)
      add :inserted_at, :naive_datetime
      add :updated_at, :naive_datetime, null: true
    end
  end
end
