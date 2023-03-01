defmodule ClElixirWeb.FollowController do
  use ClElixirWeb, :controller

  alias ClElixir.Follows
  alias ClElixir.Follows.Follow
  alias ClElixir.Repo

  def get_follows(conn, params) do
    params
    |> Follows.get_follows()
    |> json_as_camel_case(conn)
  end

  def get_followers(conn, params) do
    params
    |> Follows.get_followers()
    |> json_as_camel_case(conn)
  end

  def follow_user(conn, params) do
    params
    |> Follows.follow_user()
    |> json_as_camel_case(conn)
  end

  def unfollow_user(conn, params) do
    params
    |> Follows.unfollow_user()
    |> json_as_camel_case(conn)
  end

  def follow_check(conn, params) do
    follower_id = params["profile_id"]

    Follow
    |> Repo.get_by(follower_id: follower_id)
    |> json_as_camel_case(conn)
  end

end
