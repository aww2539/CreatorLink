defmodule ClElixirTest do
  use ExUnit.Case
  doctest ClElixir

  test "greets the world" do
    assert ClElixir.hello() == :world
  end
end
