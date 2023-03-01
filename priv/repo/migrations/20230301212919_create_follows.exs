defmodule ClElixir.Repo.Migrations.CreateFollows do
  use Ecto.Migration

  def change do
    create table(:follows) do
      add :follow_id, references(:users)
      add :follower_id, references(:users)
    end
  end
end
