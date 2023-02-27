defmodule ClElixir.Repo do
  use Ecto.Repo,
    otp_app: :cl_elixir,
    adapter: Ecto.Adapters.Postgres
end
