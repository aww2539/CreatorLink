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

alias ClElixir.Follows.Follow
alias ClElixir.Posts.Post
alias ClElixir.Profiles.Profile
alias ClElixir.Profiles.ProfileLink
alias ClElixir.Repo
alias ClElixir.Users.User

user_one = %User{
  id: 1,
  email: "admin@admin.com",
  username: "admin",
  first_name: "Admin",
  last_name: "Administrator",
  password: "admin"
}

user_two = %User{
  id: 2,
  email: "alex@alex.com",
  username: "alex",
  first_name: "Alex",
  last_name: "Woodall",
  password: "alex"
}

post_one = %Post{
  body: "Admin Post",
  user_id: user_one.id,
  inserted_at: NaiveDateTime.truncate(NaiveDateTime.utc_now(), :second)
}

post_two = %Post{
  body: "Alex Post",
  user_id: user_two.id,
  inserted_at: NaiveDateTime.truncate(NaiveDateTime.utc_now(), :second)
}

profile_one = %Profile{
  id: 1,
  bio: "Admin Bio",
  views: 0,
  user_id: user_one.id
}

profile_two = %Profile{
  id: 2,
  bio: "Alex Bio",
  views: 0,
  user_id: user_two.id
}

profile_link = %ProfileLink{
  id: 1,
  name: "Google",
  url: "http://www.google.com",
  order: 1,
  clicks: 0,
  profile_id: profile_one.id,
  user_id: user_one.id
}

follow_one = %Follow{
  id: 1,
  follow_id: user_one.id,
  follower_id: user_two.id
}

follow_two = %Follow{
  id: 2,
  follow_id: user_two.id,
  follower_id: user_one.id
}

user_one
|> Repo.insert()

user_two
|> Repo.insert()

post_one
|> Repo.insert()

post_two
|> Repo.insert()

profile_one
|> Repo.insert()

profile_two
|> Repo.insert()

profile_link
|> Repo.insert()

follow_one
|> Repo.insert()

follow_two
|> Repo.insert()
