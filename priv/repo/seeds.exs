# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Phoenixcra.Repo.insert!(%Phoenixcra.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias ClElixir.Posts.Post
alias ClElixir.Profiles.Profile
alias ClElixir.Profiles.ProfileLink
alias ClElixir.Repo
alias ClElixir.Users.User

user = %User{
  id: 1,
  email: "admin@admin.com",
  username: "admin",
  first_name: "Admin",
  last_name: "Administrator",
  password: "admin"
}

post = %Post{
  body: "Admin Post",
  user_id: user.id,
  inserted_at: NaiveDateTime.truncate(NaiveDateTime.utc_now(), :second)
}

profile = %Profile{
  id: 1,
  bio: "Admin Bio",
  views: 0,
  user_id: user.id
}

profile_link = %ProfileLink{
  id: 1,
  name: "Google",
  url: "http://www.google.com",
  order: 1,
  clicks: 0,
  profile_id: profile.id,
  user_id: user.id
}

user
|> Repo.insert()

post
|> Repo.insert()

profile
|> Repo.insert()

profile_link
|> Repo.insert()
